var lang,path;

exports.init = function(locale, url) {
	lang = locale;
	path = url;
	return function (req, res, next) {
		req.session.locale = (req.session && req.session.locale) ? req.session.locale : lang || "en";
		res.locals.t = require("./locales.js")(res.locals.lang = (req.session.locale ? req.session.locale : lang), path);
		next();
	};
};
