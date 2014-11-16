var main = require('./lib/main');

module.exports = function(app, path, lang) {
  app.get('/locale/:lang/*', function (req, res) {
    req.session.locale = req.params.lang;
    res.redirect("/" + (req.params[0] || ""));
  });
  return main.init(lang, path);
};
