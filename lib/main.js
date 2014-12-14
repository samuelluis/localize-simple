module.exports = {
	lang: "",
	path: "",
	init: function(lang, path) {
		exports.lang = lang;
		exports.path = path;
		return function (req, res, next) {
			res.locals.lang = req.session.locale = req.session.locale || exports.lang || "en";
			res.locals.t = require("./locales").call(this, res.locals.lang, exports.path);
			next();
		};
	}
};
