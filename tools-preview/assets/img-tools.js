// Shared helpers for the Cheakstar image tool pages.
(function () {
  "use strict";

  function formatSize(bytes) {
    if (bytes < 1024) { return bytes + " bytes"; }
    if (bytes < 1024 * 1024) { return (bytes / 1024).toFixed(1) + " KB"; }
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  }

  function readImageFile(file) {
    return new Promise(function (resolve, reject) {
      var reader = new FileReader();
      reader.onload = function () {
        var img = new Image();
        img.onload = function () { resolve(img); };
        img.onerror = function () { reject(new Error("Could not read this image file.")); };
        img.src = reader.result;
      };
      reader.onerror = function () { reject(new Error("Could not read this file.")); };
      reader.readAsDataURL(file);
    });
  }

  function canvasToBlob(canvas, mime, quality) {
    return new Promise(function (resolve, reject) {
      canvas.toBlob(function (blob) {
        if (blob) { resolve(blob); } else { reject(new Error("The browser could not create the output image.")); }
      }, mime, quality);
    });
  }

  function drawImageToCanvas(img, width, height) {
    var canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    var ctx = canvas.getContext("2d");
    if (ctx === null) { throw new Error("Canvas is not supported in this browser."); }
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);
    ctx.drawImage(img, 0, 0, width, height);
    return canvas;
  }

  function extensionFor(mime) {
    if (mime === "image/png") { return "png"; }
    if (mime === "image/webp") { return "webp"; }
    return "jpg";
  }

  function baseName(name) {
    var dot = name.lastIndexOf(".");
    return dot > 0 ? name.slice(0, dot) : name;
  }

  function triggerDownload(blob, filename) {
    var url = URL.createObjectURL(blob);
    var link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  }

  function gcd(a, b) { return b === 0 ? a : gcd(b, a % b); }

  function aspectText(w, h) {
    if (!w || !h) { return ""; }
    var g = gcd(w, h) || 1;
    return (w / g) + ":" + (h / g);
  }

  window.ImgTools = {
    formatSize: formatSize,
    readImageFile: readImageFile,
    canvasToBlob: canvasToBlob,
    drawImageToCanvas: drawImageToCanvas,
    extensionFor: extensionFor,
    baseName: baseName,
    triggerDownload: triggerDownload,
    aspectText: aspectText
  };
})();
