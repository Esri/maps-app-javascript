module.exports = [
  (context, request, callback) => {
    if (
      /^dojo/.test(request) ||
      /^esri/.test(request)
    ) {
      if (request.includes("dojo/i18n!.")) {
        request = request.replace(/^dojo\/i18n!\./, "dojo/i18n!./widgets");
      }
      return callback(null, "amd " + request);
    }
    callback();
  }
];