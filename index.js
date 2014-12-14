var main = require('./lib/main');
var expect = require('chai').expect;

module.exports = function(options) {
  expect(options).to.be.an("object").that.have.property(router);
  expect(options.router).to.have.property("get").that.is.a("function");
  expect(options.path).to.be.a("string").that.is.ok();

  options.router.get('/locale/:lang/*', function (req, res) {
    req.session.locale = req.params.lang;
    res.redirect("/" + (req.params[0] || ""));
  });

  return main.init(options.default, options.path, options.storage);
};
