var main = require('./lib/main');
var expect = require('chai').expect;

module.exports = function(options) {
  expect(options).to.be.an("object").that.have.property(app);
  expect(options.app).to.have.property("get").that.is.a("function");
  expect(options.locales_path).to.be.a("string").that.is.ok;

  options.app.get('/locale/:lang/*', function (req, res) {
    req.session.locale = req.params.lang;
    res.redirect("/" + (req.params[0] || ""));
  });

  return main.init(options.default_locale, options.locales_path, options.storage);
};
