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

    signOut: function () {
      var done = function () { currentUser = null; notify("SIGNED_OUT"); };
      if (!client) { done(); return Promise.resolve(); }
      return client.auth.signOut().then(done, done);
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
