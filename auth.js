// Cheakstar — website accounts (Supabase Auth) shared module.
// Uses ONLY the public publishable key; the secret service key is never
// used on this website. Everything is failure-isolated: if the sign-in
// service or its library cannot be reached, the website keeps working
// normally and CSAuth simply reports the service as unavailable.
(function () {
  "use strict";
  if (window.CSAuth) return; // load once, even if requested twice

  var SUPABASE_URL = "https://otubxsildmovyopebxvg.supabase.co";
  var SUPABASE_KEY = "sb_publishable_MWBG3vuN6lN196eihsPlAQ_7nhldag_";
  var CDN_URL = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js";
  var FAV_KEY = "csFavs";
  var RECENT_KEY = "csRecent";
  var RECENT_MAX = 8;

  /* ---------------- small storage helpers ---------------- */
  function lsGet(k) { try { return window.localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { window.localStorage.setItem(k, v); } catch (e) {} }
  function readJSON(key, fallback) {
    try {
      var raw = lsGet(key);
      if (!raw) return fallback;
      var v = JSON.parse(raw);
      return v == null ? fallback : v;
    } catch (e) { return fallback; }
  }

  /* ---------------- friendly error messages ---------------- */
  function friendly(err) {
    var raw = "";
    if (err) raw = String(err.message || err.error_description || err || "");
    var low = raw.toLowerCase();
    if (!raw || low.indexOf("fetch") >= 0 || low.indexOf("network") >= 0 || low.indexOf("failed to load") >= 0) {
      return "Could not reach the sign-in service. Please check your connection and try again.";
    }
    if (low.indexOf("invalid login credentials") >= 0) {
      return "The email or password is not correct. Please check both and try again.";
    }
    if (low.indexOf("email not confirmed") >= 0) {
      return "Please confirm your email first: open the confirmation link in your inbox, then sign in.";
    }
    if (low.indexOf("already registered") >= 0 || low.indexOf("already exists") >= 0) {
      return "An account with this email already exists. Try signing in instead.";
    }
    if (low.indexOf("password should be at least") >= 0) {
      return "Please choose a password of at least 8 characters.";
    }
    if (low.indexOf("invalid email") >= 0 || low.indexOf("unable to validate email") >= 0) {
      return "That email address does not look valid. Please check it and try again.";
    }
    if (low.indexOf("rate limit") >= 0 || low.indexOf("too many") >= 0) {
      return "Too many attempts in a short time. Please wait a minute and try again.";
    }
    if (low.indexOf("same password") >= 0) {
      return "The new password must be different from your current password.";
    }
    if (low.indexOf("totp") >= 0 || low.indexOf("authenticator") >= 0) {
      return "That code is not correct. Check your authenticator app and try again.";
    }
    return raw;
  }

  /* ---------------- favourites + recent (local, for everyone) ---------------- */
  function getFavorites() {
    var favs = readJSON(FAV_KEY, []);
    if (!Array.isArray(favs)) return [];
    return favs.filter(function (s) { return typeof s === "string" && s; }).slice();
  }
  function saveFavorites(favs) { lsSet(FAV_KEY, JSON.stringify(favs)); }

  function getRecent() {
    var items = readJSON(RECENT_KEY, []);
    if (!Array.isArray(items)) return [];
    return items.filter(function (it) { return it && typeof it.slug === "string" && it.slug; })
      .map(function (it) { return { slug: it.slug, title: String(it.title || it.slug) }; })
      .slice(0, RECENT_MAX);
  }
  function saveRecent(items) { lsSet(RECENT_KEY, JSON.stringify(items.slice(0, RECENT_MAX))); }

  /* ---------------- auth state ---------------- */
  var client = null;
  var available = false;
  var currentUser = null;
  var recovery = false;
  var listeners = [];
  var resolveReady = null;
  var ready = new Promise(function (res) { resolveReady = res; });
  var readyDone = false;

  function siteBase() {
    var p = window.location.pathname || "/";
    var dir = p.slice(0, p.lastIndexOf("/") + 1);
    return window.location.origin + dir;
  }
  function pageUrl(name) { return siteBase() + name; }

  function notify(event) {
    listeners.slice().forEach(function (cb) {
      try { cb(currentUser, event || "UPDATE"); } catch (e) {}
    });
  }

  /* Mirror favourites/recent into the signed-in user's metadata.
     Failure-isolated: a failed mirror never breaks the page. */
  function mirrorToAccount() {
    if (!client || !currentUser) return;
    try {
      client.auth.updateUser({ data: { favorites: getFavorites(), recent: getRecent() } })
        .then(function () {}, function () {});
    } catch (e) {}
  }

  /* Merge the account copy into the local copy after sign-in:
     favourites = union (account order first), recent = account copy wins
     when the account has one, otherwise the local copy stays. */
  function mergeFromAccount(user) {
    try {
      var meta = (user && user.user_metadata) || {};
      if (Array.isArray(meta.favorites)) {
        var merged = [];
        meta.favorites.forEach(function (s) {
          if (typeof s === "string" && s && merged.indexOf(s) < 0) merged.push(s);
        });
        getFavorites().forEach(function (s) {
          if (merged.indexOf(s) < 0) merged.push(s);
        });
        saveFavorites(merged);
      }
      if (Array.isArray(meta.recent) && meta.recent.length) {
        var clean = meta.recent.filter(function (it) { return it && typeof it.slug === "string" && it.slug; })
          .map(function (it) { return { slug: it.slug, title: String(it.title || it.slug) }; });
        if (clean.length) saveRecent(clean);
      }
    } catch (e) {}
  }

  function finishReady() {
    if (readyDone) return;
    readyDone = true;
    if (resolveReady) resolveReady(window.CSAuth);
    notify(currentUser ? "SIGNED_IN" : "INITIAL");
  }

  function init() {
    // A recovery link carries type=recovery in the URL hash; remember it
    // even before the client library finishes parsing the session.
    try {
      if ((window.location.hash || "").indexOf("type=recovery") >= 0) recovery = true;
    } catch (e) {}

    var script = document.createElement("script");
    script.src = CDN_URL;
    script.async = true;
    var timer = setTimeout(function () { finishReady(); }, 12000); // CDN too slow: fail soft
    script.onload = function () {
      clearTimeout(timer);
      try {
        if (!window.supabase || !window.supabase.createClient) { finishReady(); return; }
        client = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
        available = true;
        client.auth.onAuthStateChange(function (event, session) {
          var user = session ? session.user : null;
          var changed = (!!user !== !!currentUser) || ((user && currentUser) ? user.id !== currentUser.id : false);
          currentUser = user;
          if (event === "PASSWORD_RECOVERY") recovery = true;
          if (event === "SIGNED_IN" && user) { mergeFromAccount(user); }
          if (event === "SIGNED_OUT") { currentUser = null; }
          if (changed || event === "PASSWORD_RECOVERY" || event === "USER_UPDATED") notify(event);
          // The very first session event also completes the ready state.
          finishReady();
        });
        client.auth.getSession().then(function (res) {
          var session = res && res.data ? res.data.session : null;
          currentUser = session ? session.user : null;
          if (currentUser) mergeFromAccount(currentUser);
          finishReady();
        }, function () { finishReady(); });
      } catch (e) { finishReady(); }
    };
    script.onerror = function () { clearTimeout(timer); finishReady(); };
    (document.head || document.documentElement).appendChild(script);
  }

  function needClient() {
    if (client && available) return null;
    return new Error("Could not reach the sign-in service. Please check your connection and try again.");
  }

  /* ---------------- devices & sessions (Edge Function) ----------------
     Supabase Auth has no client-side API for listing or revoking a
     member's sessions, so both go through the "list-sessions" Edge
     Function, which checks the caller's token and answers for that
     member only. Only the public publishable key is sent from here;
     the service role key exists solely inside the function. */
  function currentAccessToken() {
    var bad = needClient();
    if (bad) return Promise.reject(bad);
    return client.auth.getSession().then(function (res) {
      var session = res && res.data ? res.data.session : null;
      if (!session || !session.access_token) {
        throw new Error("You are not signed in.");
      }
      return session.access_token;
    }, function (err) { throw new Error(friendly(err)); });
  }

  /* Read one claim from an access token's payload. Used only for the
     session_id claim, which tells the popup which row is this device;
     the Edge Function re-reads the same claim from the token itself. */
  function decodeJwtClaim(token, claim) {
    try {
      var parts = String(token || "").split(".");
      if (parts.length !== 3) return null;
      var b64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
      while (b64.length % 4 !== 0) b64 += "=";
      var payload = JSON.parse(window.atob(b64));
      var value = payload ? payload[claim] : null;
      return typeof value === "string" && value ? value : null;
    } catch (e) { return null; }
  }

  function callSessionsFunction(payload) {
    return currentAccessToken().then(function (token) {
      var body = {};
      Object.keys(payload || {}).forEach(function (k) { body[k] = payload[k]; });
      var mine = decodeJwtClaim(token, "session_id");
      if (mine && !body.currentSessionId) body.currentSessionId = mine;
      return window.fetch(SUPABASE_URL + "/functions/v1/list-sessions", {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + token,
          "apikey": SUPABASE_KEY,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });
    }).then(function (res) {
      return res.json().then(function (data) {
        if (!res.ok) {
          throw new Error((data && data.error) ||
            "Your sessions could not be loaded. Please try again.");
        }
        return data || {};
      }, function () {
        throw new Error("Your sessions could not be loaded. Please try again.");
      });
    }, function (err) {
      if (err && err.message && err.message !== "You are not signed in.") {
        throw new Error(friendly(err));
      }
      throw err;
    });
  }

  /* Device description for one session row, from its user agent. The
     same parsing the account page uses for "this device". */
  function describeUA(ua) {
    ua = String(ua || "");
    var os = "Unknown system";
    if (/Windows NT/.test(ua)) os = "Windows";
    else if (/Android/.test(ua)) os = "Android";
    else if (/iPhone|iPad|iPod/.test(ua)) os = "iOS";
    else if (/Mac OS X/.test(ua)) os = "macOS";
    else if (/Linux/.test(ua)) os = "Linux";
    var browser = "Unknown browser";
    if (/Edg\//.test(ua)) browser = "Microsoft Edge";
    else if (/OPR\/|Opera/.test(ua)) browser = "Opera";
    else if (/Firefox\//.test(ua)) browser = "Firefox";
    else if (/Chrome\//.test(ua)) browser = "Google Chrome";
    else if (/Safari\//.test(ua)) browser = "Safari";
    var kind = /Mobi|Android|iPhone|iPad|iPod/.test(ua) ? "Mobile" : "Desktop";
    return { os: os, browser: browser, kind: kind };
  }

  function fmtSessionDate(iso) {
    if (!iso) return "";
    var d = new Date(iso);
    if (isNaN(d.getTime())) return "";
    return d.toLocaleDateString("en-GB", {
      day: "numeric", month: "long", year: "numeric",
      hour: "2-digit", minute: "2-digit"
    });
  }

  /* Merge-safe metadata save: the keys already stored on the account
     (favourites, recent, avatar, ...) are read back and spread first, so
     saving one profile field can never wipe another. A patch value of
     null or "" clears that key. */
  function saveMeta(patch) {
    var bad = needClient();
    if (bad) return Promise.reject(bad);
    if (!currentUser) return Promise.reject(new Error("You are not signed in."));
    var data = {};
    var meta = currentUser.user_metadata || {};
    Object.keys(meta).forEach(function (k) { data[k] = meta[k]; });
    Object.keys(patch).forEach(function (k) { data[k] = patch[k]; });
    return client.auth.updateUser({ data: data }).then(function (res) {
      if (res.error) throw new Error(friendly(res.error));
      if (res.data && res.data.user) currentUser = res.data.user;
      notify("USER_UPDATED");
      return currentUser;
    }, function (err) { throw new Error(friendly(err)); });
  }

  /* Shared MFA step: open a challenge for the factor, then verify the
     6-digit code against it (used for enrolment, sign-in and turn-off). */
  function mfaChallengeVerify(factorId, code) {
    return client.auth.mfa.challenge({ factorId: factorId }).then(function (res) {
      if (res.error) throw new Error(friendly(res.error));
      var challengeId = res.data ? res.data.id : null;
      if (!challengeId) throw new Error("Could not start the two-factor check. Please try again.");
      return client.auth.mfa.verify({ factorId: factorId, challengeId: challengeId, code: code });
    }).then(function (res) {
      if (res.error) throw new Error(friendly(res.error));
      return true;
    }, function (err) { throw new Error(friendly(err)); });
  }

  /* ---------------- devices & sessions popup ----------------
     One shared popup for both the account page and Settings: it lists
     every session on the member's account (from the Edge Function),
     marks this device, signs out any other session on request, and
     offers the existing global sign-out for "everywhere at once".
     All session details are written with textContent — nothing from
     the server is ever injected as markup. */
  var sessionsModalOpen = false;

  function openSessionsModal() {
    if (sessionsModalOpen) return;
    if (!document.body) return;
    sessionsModalOpen = true;
    var lastFocus = document.activeElement;
    var prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    var backdrop = document.createElement("div");
    backdrop.className = "cs-modal-backdrop";

    var modal = document.createElement("div");
    modal.className = "cs-modal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-labelledby", "csSessionsTitle");

    var head = document.createElement("div");
    head.className = "cs-modal-head";
    var title = document.createElement("h3");
    title.id = "csSessionsTitle";
    title.textContent = "Devices & sessions";
    var closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.className = "cs-modal-close";
    closeBtn.setAttribute("aria-label", "Close");
    closeBtn.textContent = "×";
    head.appendChild(title);
    head.appendChild(closeBtn);
    modal.appendChild(head);

    var sub = document.createElement("p");
    sub.className = "cs-modal-sub";
    sub.textContent = "Every device currently signed in to your account. " +
      "If you see a device you do not recognise, sign it out here.";
    modal.appendChild(sub);

    var msg = document.createElement("div");
    msg.className = "auth-msg error";
    msg.setAttribute("role", "alert");
    msg.hidden = true;
    modal.appendChild(msg);

    var status = document.createElement("p");
    status.className = "cs-modal-status";
    status.textContent = "Loading your sessions…";
    modal.appendChild(status);

    var list = document.createElement("div");
    list.className = "cs-modal-list";
    modal.appendChild(list);

    var foot = document.createElement("div");
    foot.className = "cs-modal-foot";
    var allBtn = document.createElement("button");
    allBtn.type = "button";
    allBtn.className = "btn ghost";
    allBtn.textContent = "Sign out from all devices";
    var doneBtn = document.createElement("button");
    doneBtn.type = "button";
    doneBtn.className = "btn";
    doneBtn.textContent = "Close";
    foot.appendChild(allBtn);
    foot.appendChild(doneBtn);
    modal.appendChild(foot);

    backdrop.appendChild(modal);
    document.body.appendChild(backdrop);

    function close() {
      document.removeEventListener("keydown", onKey, true);
      if (backdrop.parentNode) backdrop.parentNode.removeChild(backdrop);
      document.body.style.overflow = prevOverflow;
      sessionsModalOpen = false;
      if (lastFocus && lastFocus.focus) { try { lastFocus.focus(); } catch (e) {} }
    }
    function onKey(ev) {
      if (ev.key === "Escape" || ev.keyCode === 27) close();
    }
    document.addEventListener("keydown", onKey, true);
    backdrop.addEventListener("mousedown", function (ev) {
      if (ev.target === backdrop) close();
    });
    closeBtn.addEventListener("click", close);
    doneBtn.addEventListener("click", close);

    function showError(text) {
      msg.textContent = text || "";
      msg.hidden = !text;
    }

    /* Two-tap confirm, the same pattern the account page uses for its
       "Sign out of all devices" button: first tap arms, second acts. */
    function armConfirm(btn, label, action) {
      if (btn.getAttribute("data-armed") === "1") {
        btn.removeAttribute("data-armed");
        btn.textContent = label;
        action();
        return;
      }
      btn.setAttribute("data-armed", "1");
      btn.textContent = "Tap again to confirm";
      setTimeout(function () {
        if (btn.getAttribute("data-armed") === "1") {
          btn.removeAttribute("data-armed");
          btn.textContent = label;
        }
      }, 5000);
    }

    function renderSessions(sessions) {
      list.textContent = "";
      if (!sessions.length) {
        status.textContent = "No active sessions were found for your account.";
        return;
      }
      status.textContent = sessions.length === 1
        ? "1 active session"
        : sessions.length + " active sessions";
      sessions.forEach(function (s) {
        var d = describeUA(s.user_agent);
        var row = document.createElement("div");
        row.className = "cs-sess-row";

        var main = document.createElement("div");
        main.className = "cs-sess-main";
        var deviceLine = document.createElement("div");
        deviceLine.className = "cs-sess-device";
        deviceLine.textContent = d.os + " · " + d.kind;
        if (s.is_current) {
          var badge = document.createElement("span");
          badge.className = "cs-badge-current";
          badge.textContent = "This device";
          deviceLine.appendChild(badge);
        }
        main.appendChild(deviceLine);
        var meta = document.createElement("div");
        meta.className = "cs-sess-meta";
        var bits = [d.browser];
        var when = fmtSessionDate(s.created_at);
        if (when) bits.push("Signed in " + when);
        var active = fmtSessionDate(s.refreshed_at);
        if (active && s.refreshed_at !== s.created_at) {
          bits.push("Last active " + active);
        }
        meta.textContent = bits.join(" · ");
        main.appendChild(meta);
        row.appendChild(main);

        if (!s.is_current) {
          var out = document.createElement("button");
          out.type = "button";
          out.className = "btn ghost acct-mini cs-sess-out";
          out.textContent = "Sign out";
          out.addEventListener("click", function () {
            armConfirm(out, "Sign out", function () {
              out.disabled = true;
              out.textContent = "Signing out…";
              window.CSAuth.revokeSession(s.id).then(function () {
                showError("");
                if (row.parentNode) row.parentNode.removeChild(row);
                var left = list.querySelectorAll(".cs-sess-row").length;
                status.textContent = left === 1
                  ? "1 active session"
                  : left + " active sessions";
              }, function (err) {
                out.disabled = false;
                out.textContent = "Sign out";
                showError((err && err.message) ||
                  "That session could not be signed out. Please try again.");
              });
            });
          });
          row.appendChild(out);
        }
        list.appendChild(row);
      });
    }

    function load() {
      status.textContent = "Loading your sessions…";
      list.textContent = "";
      showError("");
      window.CSAuth.listSessions().then(function (sessions) {
        renderSessions(sessions);
      }, function (err) {
        status.textContent = "";
        showError((err && err.message) ||
          "Your sessions could not be loaded. Please try again.");
        var retry = document.createElement("button");
        retry.type = "button";
        retry.className = "btn ghost acct-mini";
        retry.textContent = "Try again";
        retry.addEventListener("click", load);
        list.appendChild(retry);
      });
    }

    var allArmedLabel = "Sign out from all devices";
    allBtn.addEventListener("click", function () {
      armConfirm(allBtn, allArmedLabel, function () {
        allBtn.disabled = true;
        allBtn.textContent = "Signing out…";
        window.CSAuth.signOutAll().then(function () {
          window.location.href = "index.html";
        });
      });
    });

    load();
    if (closeBtn.focus) { try { closeBtn.focus(); } catch (e) {} }
  }

  /* ---------------- public API ---------------- */
  window.CSAuth = {
    ready: ready,
    isAvailable: function () { return available; },
    isRecovery: function () { return recovery; },
    getUser: function () { return currentUser; },
    siteBase: siteBase,
    pageUrl: pageUrl,
    friendlyError: friendly,

    onChange: function (cb) {
      if (typeof cb !== "function") return function () {};
      listeners.push(cb);
      if (readyDone) { try { cb(currentUser, "INITIAL"); } catch (e) {} }
      return function () {
        var i = listeners.indexOf(cb);
        if (i >= 0) listeners.splice(i, 1);
      };
    },

    signUp: function (email, password, displayName) {
      var bad = needClient();
      if (bad) return Promise.reject(bad);
      return client.auth.signUp({
        email: email,
        password: password,
        options: {
          data: { display_name: displayName || "" },
          emailRedirectTo: pageUrl("account.html")
        }
      }).then(function (res) {
        if (res.error) throw new Error(friendly(res.error));
        var user = res.data ? res.data.user : null;
        var session = res.data ? res.data.session : null;
        if (session && user) {
          currentUser = user;
          notify("SIGNED_IN");
        }
        return { user: user, session: session, needsConfirmation: !session };
      }, function (err) { throw new Error(friendly(err)); });
    },

    signIn: function (email, password) {
      var bad = needClient();
      if (bad) return Promise.reject(bad);
      return client.auth.signInWithPassword({ email: email, password: password })
        .then(function (res) {
          if (res.error) throw new Error(friendly(res.error));
          currentUser = res.data ? res.data.user : null;
          if (currentUser) { mergeFromAccount(currentUser); notify("SIGNED_IN"); }
          return currentUser;
        }, function (err) { throw new Error(friendly(err)); });
    },

    signInWithGoogle: function () {
      var bad = needClient();
      if (bad) return Promise.reject(bad);
      // Full-page redirect to Google; Supabase returns the visitor to
      // the account page with a session, and the normal session watch
      // takes it from there (the account page applies the two-factor
      // gate when the member has a factor enrolled).
      return client.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: pageUrl("account.html") }
      }).then(function (res) {
        if (res.error) throw new Error(friendly(res.error));
        return true;
      }, function (err) { throw new Error(friendly(err)); });
    },

    signOut: function () {
      var done = function () { currentUser = null; notify("SIGNED_OUT"); };
      if (!client) { done(); return Promise.resolve(); }
      // scope "local" ends the session on THIS device only. The
      // supabase-js default is "global", which used to sign the member
      // out on every device at once (fixed 2026-11-08). Signing out
      // everywhere stays available on purpose via signOutAll().
      return client.auth.signOut({ scope: "local" }).then(done, done);
    },

    sendPasswordReset: function (email) {
      var bad = needClient();
      if (bad) return Promise.reject(bad);
      return client.auth.resetPasswordForEmail(email, { redirectTo: pageUrl("reset-password.html") })
        .then(function (res) {
          if (res.error) throw new Error(friendly(res.error));
          return true;
        }, function (err) { throw new Error(friendly(err)); });
    },

    updatePassword: function (newPassword) {
      var bad = needClient();
      if (bad) return Promise.reject(bad);
      return client.auth.updateUser({ password: newPassword })
        .then(function (res) {
          if (res.error) throw new Error(friendly(res.error));
          if (res.data && res.data.user) currentUser = res.data.user;
          notify("USER_UPDATED");
          return true;
        }, function (err) { throw new Error(friendly(err)); });
    },

    /* ---- change email (verified flow) ----
       The project has "Secure email change" switched on, so updateUser
       sends a confirmation link to BOTH the current and the new inbox;
       the sign-in address changes only after both links are opened.
       After the call, the returned user record carries the pending
       address as new_email until the change completes. */
    changeEmail: function (newEmail) {
      var bad = needClient();
      if (bad) return Promise.reject(bad);
      var target = String(newEmail == null ? "" : newEmail).trim();
      if (!target) return Promise.reject(new Error("Please enter the new email address."));
      return client.auth.updateUser({ email: target }).then(function (res) {
        if (res.error) throw new Error(friendly(res.error));
        if (res.data && res.data.user) currentUser = res.data.user;
        notify("USER_UPDATED");
        return currentUser;
      }, function (err) { throw new Error(friendly(err)); });
    },

    resendConfirmation: function (email) {
      var bad = needClient();
      if (bad) return Promise.reject(bad);
      var target = email || (currentUser && currentUser.email) || "";
      if (!target) return Promise.reject(new Error("No email address to send the confirmation to."));
      return client.auth.resend({
        type: "signup",
        email: target,
        options: { emailRedirectTo: pageUrl("account.html") }
      }).then(function (res) {
        if (res.error) throw new Error(friendly(res.error));
        return true;
      }, function (err) { throw new Error(friendly(err)); });
    },

    getSessionInfo: function () {
      var info = {
        user: currentUser,
        emailConfirmed: !!(currentUser && currentUser.email_confirmed_at),
        sessionCreatedAt: null
      };
      if (!currentUser) return Promise.resolve(info);
      // supabase-js sessions carry no created-at field of their own; the
      // honest "signed in at" timestamp lives on the user record.
      info.sessionCreatedAt = currentUser.last_sign_in_at || null;
      return Promise.resolve(info);
    },

    /* ---- devices & sessions (via the list-sessions Edge Function) ---- */
    getCurrentSessionId: function () {
      return currentAccessToken().then(function (token) {
        return decodeJwtClaim(token, "session_id");
      }, function () { return null; });
    },

    listSessions: function () {
      return callSessionsFunction({ action: "list" }).then(function (data) {
        var rows = Array.isArray(data.sessions) ? data.sessions : [];
        return rows.filter(function (s) { return s && typeof s.id === "string" && s.id; })
          .map(function (s) {
            return {
              id: s.id,
              created_at: s.created_at || null,
              refreshed_at: s.refreshed_at || null,
              user_agent: s.user_agent || null,
              is_current: !!s.is_current
            };
          });
      });
    },

    revokeSession: function (sessionId) {
      if (!sessionId) {
        return Promise.reject(new Error("No session was specified."));
      }
      return callSessionsFunction({ action: "revoke", sessionId: sessionId })
        .then(function () { return true; });
    },

    openSessionsModal: openSessionsModal,

    /* ---- profile: name, mobile number, photo (user_metadata) ---- */
    updateProfile: function (fields) {
      fields = fields || {};
      var patch = {};
      if (typeof fields.displayName !== "undefined") patch.display_name = String(fields.displayName).trim();
      if (typeof fields.phone !== "undefined") patch.phone = String(fields.phone).trim();
      if (!Object.keys(patch).length) return Promise.resolve(currentUser);
      return saveMeta(patch);
    },

    setAvatar: function (dataUrl) {
      if (typeof dataUrl !== "string" || dataUrl.indexOf("data:image/") !== 0) {
        return Promise.reject(new Error("That photo could not be read. Please choose an image file."));
      }
      if (dataUrl.length > 40000) {
        return Promise.reject(new Error("That photo is too large to save. Please choose a smaller image."));
      }
      return saveMeta({ avatar: dataUrl });
    },

    clearAvatar: function () {
      return saveMeta({ avatar: "" });
    },

    /* The project's "Secure password change" setting is off, so updateUser
       alone would change the password without checking the old one. The
       current password is therefore verified explicitly first, by
       re-authenticating with it; only then is the new password set. */
    changePasswordWithCurrent: function (currentPw, newPw) {
      var bad = needClient();
      if (bad) return Promise.reject(bad);
      if (!currentUser || !currentUser.email) {
        return Promise.reject(new Error("You are not signed in."));
      }
      return client.auth.signInWithPassword({ email: currentUser.email, password: currentPw })
        .then(function (res) {
          if (res.error) {
            var m = String(res.error.message || "").toLowerCase();
            if (m.indexOf("invalid login credentials") >= 0) {
              throw new Error("Your current password is not correct.");
            }
            throw new Error(friendly(res.error));
          }
          if (res.data && res.data.user) currentUser = res.data.user;
          return client.auth.updateUser({ password: newPw }).then(function (u) {
            if (u.error) throw new Error(friendly(u.error));
            if (u.data && u.data.user) currentUser = u.data.user;
            notify("USER_UPDATED");
            return true;
          });
        }, function (err) { throw new Error(friendly(err)); });
    },

    signOutAll: function () {
      var done = function () { currentUser = null; notify("SIGNED_OUT"); };
      if (!client) { done(); return Promise.resolve(); }
      // scope "global" ends the session on every device, not just this one.
      return client.auth.signOut({ scope: "global" }).then(done, done);
    },

    /* ---- two-factor authentication (TOTP, Supabase MFA) ---- */
    /* Never rejects on a bad factors answer: an unexpected response shape
       (or a failed lookup, for example a session whose account no longer
       exists) resolves with unknown:true, so the page can show its
       "could not be checked" state instead of breaking. */
    mfaStatus: function () {
      var bad = needClient();
      if (bad) return Promise.reject(bad);
      function unknown() {
        return { enabled: false, factorId: null, createdAt: null, unknown: true };
      }
      return client.auth.mfa.listFactors().then(function (res) {
        if (!res || res.error || !res.data) return unknown();
        var totp = Array.isArray(res.data.totp) ? res.data.totp : null;
        if (!totp && Array.isArray(res.data.all)) {
          totp = res.data.all.filter(function (f) { return f && f.factor_type === "totp"; });
        }
        if (!totp) return unknown();
        var verified = null;
        totp.forEach(function (f) { if (!verified && f && f.status === "verified") verified = f; });
        return {
          enabled: !!verified,
          factorId: verified ? verified.id : null,
          createdAt: verified ? (verified.created_at || null) : null,
          unknown: false
        };
      }, function () { return unknown(); });
    },

    mfaEnroll: function () {
      var bad = needClient();
      if (bad) return Promise.reject(bad);
      return client.auth.mfa.enroll({ factorType: "totp", friendlyName: "Cheakstar 2FA" })
        .then(function (res) {
          if (res.error) throw new Error(friendly(res.error));
          var d = res.data || {};
          var t = d.totp || {};
          return { factorId: d.id, qrCode: t.qr_code, secret: t.secret, uri: t.uri };
        }, function (err) { throw new Error(friendly(err)); });
    },

    mfaVerifyEnroll: function (factorId, code) {
      var bad = needClient();
      if (bad) return Promise.reject(bad);
      return mfaChallengeVerify(factorId, code);
    },

    mfaChallengeAndVerify: function (factorId, code) {
      var bad = needClient();
      if (bad) return Promise.reject(bad);
      return mfaChallengeVerify(factorId, code);
    },

    mfaUnenroll: function (factorId) {
      var bad = needClient();
      if (bad) return Promise.reject(bad);
      return client.auth.mfa.unenroll({ factorId: factorId }).then(function (res) {
        if (res.error) throw new Error(friendly(res.error));
        return true;
      }, function (err) { throw new Error(friendly(err)); });
    },

    getAAL: function () {
      var bad = needClient();
      if (bad) return Promise.reject(bad);
      return client.auth.mfa.getAuthenticatorAssuranceLevel().then(function (res) {
        if (res.error) throw new Error(friendly(res.error));
        var d = res.data || {};
        return { currentLevel: d.currentLevel, nextLevel: d.nextLevel };
      }, function (err) { throw new Error(friendly(err)); });
    },

    /* ---- settings preferences (added 2026-11-06, settings/gating build) ----
       Preferences live in user_metadata through the same merge-safe save
       favourites use: every key already stored is read back and spread
       first, so saving a preference can never wipe another field. */
    savePrefs: function (patch) {
      if (!patch || typeof patch !== "object") return Promise.resolve(currentUser);
      return saveMeta(patch);
    },

    /* Clear the saved lists on this device and on the account copy. */
    clearFavorites: function () {
      saveFavorites([]);
      mirrorToAccount();
    },
    clearRecent: function () {
      saveRecent([]);
      mirrorToAccount();
    },

    /* ---- favourites + recent ---- */
    getFavorites: getFavorites,
    isFavorite: function (slug) { return getFavorites().indexOf(slug) >= 0; },
    toggleFavorite: function (slug) {
      if (!slug) return false;
      var favs = getFavorites();
      var i = favs.indexOf(slug);
      var nowFav;
      if (i >= 0) { favs.splice(i, 1); nowFav = false; }
      else { favs.push(slug); nowFav = true; }
      saveFavorites(favs);
      mirrorToAccount();
      return nowFav;
    },
    getRecent: getRecent,
    pushRecent: function (slug, title) {
      if (!slug) return;
      var items = getRecent().filter(function (it) { return it.slug !== slug; });
      items.unshift({ slug: slug, title: title || slug });
      saveRecent(items);
      mirrorToAccount();
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
