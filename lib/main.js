var expect = require('chai').expect;

module.exports = {
	lang: "",
	path: "",
	init: function(lang, path, storage) {
		exports.lang = lang;
		exports.path = path;
		return function (req, res, next) {
			storage = storage || req.session;
			expect(storage).to.be.ok;
			res.locals.lang = storage.locale = storage.locale || lang || "en";
			res.locals.t = require("./locales.js").translate(res.locals.lang, path);
			next();
		};
	}
};
