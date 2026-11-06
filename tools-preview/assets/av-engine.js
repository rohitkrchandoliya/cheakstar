// Shared conversion-engine helper for the Cheakstar audio and video tool
// pages. The ffmpeg.wasm library files are vendored in assets/ffmpeg-esm/
// (browsers block cross-origin web workers, so the library must load from
// the same origin as the page). Only the engine core itself (ffmpeg-core.js
// and ffmpeg-core.wasm) loads from the public jsDelivr CDN.
//
// Pages use: window.AVEngine = {
//   MAX_BYTES, ADVISED_BYTES,
//   onLog, onProgress        (assignable callbacks)
//   ensureEngine(statusEl)   -> Promise<boolean>
//   checkFile(file, statusEl)-> file | null   (100 MB rule + over-50 MB note)
//   writeFile(name, uint8), exec(args), readFile(name), deleteFile(name)
//   baseName(name), extOf(name), formatBytes(n), formatSeconds(s)
//   showBasicInfo(file, el)  (HTML5-only instant facts: size/duration/dims)
//   probe(file)              -> Promise<{info, log}>  (ffmpeg -i parse)
// }
(function () {
  "use strict";

  var CORE_URL = "https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.10/dist/esm/ffmpeg-core.js";
  var WASM_URL = "https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.10/dist/esm/ffmpeg-core.wasm";
  var scriptBase = (function () {
    var s = document.currentScript;
    if (s && s.src) { return s.src.slice(0, s.src.lastIndexOf("/") + 1); }
    return "../assets/";
  })();
  var FFMPEG_URL = scriptBase + "ffmpeg-esm/index.js";
  var MAX_BYTES = 100 * 1024 * 1024;
  var ADVISED_BYTES = 50 * 1024 * 1024;

  var FFmpegClass = null;
  var libState = "loading"; // loading | ready | failed
  var libError = "";
  import(FFMPEG_URL).then(function (mod) {
    FFmpegClass = mod.FFmpeg;
    libState = "ready";
  }).catch(function (err) {
    libState = "failed";
    libError = err && err.message ? err.message : String(err);
  });

  var ffmpeg = null;
  var engineState = "not-loaded"; // not-loaded | loading | ready | failed
  var engineError = "";
  var captureLog = null; // when non-null, log lines are also collected here

  // Same helper as @ffmpeg/util toBlobURL, with one retry.
  async function toBlobURL(url, mimeType) {
    var lastErr = null;
    for (var attempt = 0; attempt < 2; attempt++) {
      try {
        var res = await fetch(url);
        if (!res.ok) { throw new Error("Download failed with status " + res.status + " for " + url); }
        var buf = await res.arrayBuffer();
        return URL.createObjectURL(new Blob([buf], { type: mimeType }));
      } catch (err) {
        lastErr = err;
        await new Promise(function (r) { setTimeout(r, 2000); });
      }
    }
    throw lastErr;
  }

  var AV = {
    MAX_BYTES: MAX_BYTES,
    ADVISED_BYTES: ADVISED_BYTES,
    onLog: null,      // function(message)
    onProgress: null, // function(fraction 0..1)

    baseName: function (name) {
      var i = name.lastIndexOf(".");
      return i > 0 ? name.slice(0, i) : name;
    },
    extOf: function (name) {
      var i = name.lastIndexOf(".");
      return i > 0 ? name.slice(i + 1).toLowerCase() : "";
    },
    formatBytes: function (n) {
      if (n < 1024) { return n + " bytes"; }
      if (n < 1024 * 1024) { return (n / 1024).toFixed(1) + " KB"; }
      return (n / (1024 * 1024)).toFixed(2) + " MB";
    },
    formatSeconds: function (s) {
      if (!isFinite(s) || s === null || s === undefined) { return ""; }
      s = Math.round(s);
      var h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
      function p(n) { return (n < 10 ? "0" : "") + n; }
      return (h > 0 ? h + ":" + p(m) : m) + ":" + p(sec) + (h > 0 ? "" : "") + (s < 60 && h === 0 && m === 0 ? " sec" : "");
    },
    isReady: function () { return engineState === "ready"; },

    checkFile: function (file, showMsg) {
      if (!file) { showMsg("Choose a file first.", true); return null; }
      if (file.size > MAX_BYTES) {
        showMsg("That file is over 100 MB. This page refuses files over 100 MB because the browser conversion engine runs out of memory on large files. Use a desktop app for large files.", true);
        return null;
      }
      if (file.size > ADVISED_BYTES) {
        showMsg("That file is over 50 MB, so this may be slow or may run out of memory. Trying anyway.", false);
      }
      return file;
    },

    ensureEngine: async function (showMsg) {
      if (engineState === "ready") { return true; }
      if (engineState === "failed") {
        showMsg("The conversion engine could not be loaded: " + engineError + " Check your connection and try again.", true);
        return false;
      }
      if (engineState === "loading") {
        showMsg("The conversion engine is still loading. Please wait a moment and try again.", true);
        return false;
      }
      if (libState === "loading") {
        showMsg("The conversion library is still loading. Please wait a moment and try again.", true);
        return false;
      }
      if (libState === "failed" || !FFmpegClass) {
        engineState = "failed";
        engineError = "the ffmpeg.wasm library did not load" + (libError ? " (" + libError + ")" : ".");
        showMsg("The conversion engine could not be loaded: " + engineError + " Check your connection and try again.", true);
        return false;
      }
      engineState = "loading";
      showMsg("Loading conversion engine (about 20 to 31 MB, once)...", false);
      try {
        ffmpeg = new FFmpegClass();
        ffmpeg.on("log", function (e) {
          if (captureLog !== null) { captureLog += e.message + "\n"; }
          if (typeof AV.onLog === "function") { AV.onLog(e.message); }
        });
        ffmpeg.on("progress", function (p) {
          if (typeof AV.onProgress === "function") { AV.onProgress(p.progress); }
        });
        var coreURL = await toBlobURL(CORE_URL, "text/javascript");
        var wasmURL = await toBlobURL(WASM_URL, "application/wasm");
        await ffmpeg.load({ coreURL: coreURL, wasmURL: wasmURL });
        engineState = "ready";
        return true;
      } catch (err) {
        engineState = "failed";
        engineError = err && err.message ? err.message : String(err);
        showMsg("The conversion engine could not be loaded: " + engineError + " Check your connection and try again.", true);
        return false;
      }
    },

    writeFile: function (name, data) { return ffmpeg.writeFile(name, data); },
    exec: function (args) { return ffmpeg.exec(args); },
    readFile: function (name) { return ffmpeg.readFile(name); },
    deleteFile: async function (name) {
      try { await ffmpeg.deleteFile(name); } catch (e) { /* cleanup only */ }
    },

    // Instant, engine-free facts from the browser's own media elements.
    showBasicInfo: function (file, el) {
      if (!el) { return; }
      if (!file) { el.textContent = ""; return; }
      var kind = (file.type || "").split("/")[0];
      var url = URL.createObjectURL(file);
      var media = document.createElement(kind === "audio" ? "audio" : "video");
      media.preload = "metadata";
      media.onloadedmetadata = function () {
        var parts = ["File: " + file.name + " (" + AV.formatBytes(file.size) + ")"];
        if (isFinite(media.duration)) { parts.push("duration " + AV.formatSeconds(media.duration)); }
        if (media.videoWidth) { parts.push(media.videoWidth + " x " + media.videoHeight + " px"); }
        el.textContent = parts.join(", ") + ".";
        URL.revokeObjectURL(url);
      };
      media.onerror = function () {
        el.textContent = "File: " + file.name + " (" + AV.formatBytes(file.size) + ").";
        URL.revokeObjectURL(url);
      };
      media.src = url;
    },

    // Full probe: writes the file, runs ffmpeg -i, parses the log.
    probe: async function (file) {
      var name = "probe-input." + (AV.extOf(file.name) || "bin");
      var data = new Uint8Array(await file.arrayBuffer());
      await ffmpeg.writeFile(name, data);
      captureLog = "";
      try {
        await ffmpeg.exec(["-i", name]);
      } finally {
        var log = captureLog;
        captureLog = null;
        await AV.deleteFile(name);
      }
      return { info: AV.parseMediaInfo(log), log: log };
    },

    parseMediaInfo: function (log) {
      var info = {};
      var dm = log.match(/Duration: (\d+):(\d+):([\d.]+)/);
      if (dm) { info.durationSeconds = parseInt(dm[1], 10) * 3600 + parseInt(dm[2], 10) * 60 + parseFloat(dm[3]); }
      var br = log.match(/Duration:[^\n]*bitrate: (\d+) kb\/s/);
      if (br) { info.overallBitrateKbps = parseInt(br[1], 10); }
      var lines = log.split("\n");
      for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        if (/Stream #\d+:\d+/.test(line) && line.indexOf("Video:") !== -1 && !info.videoCodec) {
          var vm = line.match(/Video: ([^,\s(]+)/);
          if (vm) { info.videoCodec = vm[1]; }
          var res = line.match(/(\d{2,5})x(\d{2,5})/);
          if (res) { info.width = parseInt(res[1], 10); info.height = parseInt(res[2], 10); }
          var fps = line.match(/([\d.]+) fps/);
          if (fps) { info.fps = parseFloat(fps[1]); }
          var vbr = line.match(/, (\d+) kb\/s/);
          if (vbr) { info.videoBitrateKbps = parseInt(vbr[1], 10); }
        }
        if (/Stream #\d+:\d+/.test(line) && line.indexOf("Audio:") !== -1 && !info.audioCodec) {
          var am = line.match(/Audio: ([^,\s(]+)/);
          if (am) { info.audioCodec = am[1]; }
          var sr = line.match(/(\d+) Hz/);
          if (sr) { info.sampleRate = parseInt(sr[1], 10); }
          var ch = line.match(/Hz, ([^,]+)/);
          if (ch) { info.channels = ch[1].trim(); }
          var abr = line.match(/, (\d+) kb\/s/);
          if (abr) { info.audioBitrateKbps = parseInt(abr[1], 10); }
        }
      }
      return info;
    }
  };

  // --- Shared page wiring -------------------------------------------------

  // Build the showMsg(text, isError) callback that checkFile/ensureEngine
  // expect, writing into a page's status element.
  AV.statusFn = function (el) {
    return function (text, isError) {
      if (!el) { return; }
      el.textContent = text;
      el.className = isError ? "status error" : "status";
    };
  };

  // Wire the engine status line, the "load engine" button, the log box and
  // the progress percentage for one tool page.
  AV.wirePage = function (opts) {
    var statusEl = opts.statusEl;
    var logEl = opts.logEl;
    AV.onLog = function (text) {
      if (!logEl) { return; }
      logEl.textContent += text + "\n";
      logEl.scrollTop = logEl.scrollHeight;
    };
    AV.onProgress = function (ratio) {
      if (!statusEl || !statusEl.dataset || !statusEl.dataset.busy) { return; }
      statusEl.textContent = "Working... about " + Math.round(Math.max(0, Math.min(1, ratio)) * 100) + "% done.";
    };
    if (opts.engineButton && opts.engineStatus) {
      opts.engineButton.addEventListener("click", function () {
        AV.ensureEngine(AV.statusFn(opts.engineStatus)).then(function (ok) {
          if (ok) { opts.engineStatus.textContent = "Engine is loaded and ready."; }
        });
      });
    }
  };

  // Run one conversion job end to end and render the download link.
  // opts: { file, args, outName, mime, downloadName, statusEl, resultEl, busyText }
  // args[1] must be the input file name inside the engine.
  AV.runJob = async function (opts) {
    var statusEl = opts.statusEl;
    var inputName = opts.args[1];
    var showMsg = AV.statusFn(statusEl);
    statusEl.dataset.busy = "1";
    try {
      var ok = await AV.ensureEngine(showMsg);
      if (!ok) {
        var silent = new Error("The engine could not be loaded.");
        silent.silent = true; // ensureEngine already showed the reason
        throw silent;
      }
      statusEl.className = "status";
      statusEl.textContent = opts.busyText || "Working...";
      var data = new Uint8Array(await opts.file.arrayBuffer());
      await AV.writeFile(inputName, data);
      await AV.exec(opts.args);
      var outData = await AV.readFile(opts.outName);
      var blob = new Blob([outData], { type: opts.mime });
      var url = URL.createObjectURL(blob);
      opts.resultEl.innerHTML = "";
      var link = document.createElement("a");
      link.className = "btn download";
      link.href = url;
      link.download = opts.downloadName;
      link.textContent = "Download " + opts.downloadName + " (" + AV.formatBytes(blob.size) + ")";
      opts.resultEl.appendChild(link);
      delete statusEl.dataset.busy;
      statusEl.className = "status ok";
      statusEl.textContent = "Done. Your file is ready below.";
      return blob;
    } catch (err) {
      delete statusEl.dataset.busy;
      if (!err || !err.silent) {
        statusEl.textContent = "Something went wrong while processing this file. The engine log below shows the details; a shorter or smaller file often works.";
        statusEl.className = "status error";
      }
      throw err;
    } finally {
      AV.deleteFile(inputName);
      AV.deleteFile(opts.outName);
    }
  };

  window.AVEngine = AV;
})();
