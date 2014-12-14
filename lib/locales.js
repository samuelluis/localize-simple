var expect = require("chai").expect;
var join = require("path").join;
var helpers = require("./helpers");

module.exports = function (lang, path) {
	var locale = require(join(path, lang));
	expect(locale).to.be.an("object");
	return function (path, params) {
		var value;
		try {
			value = helpers.deep(locale, path);
			value = helpers.is(value, String) ? value : value.default;
			if (params){
				for (var key in params) {
					if (params.hasOwnProperty(key)){
						value = value.replace(new RegExp("{" + key + "}", "g"), params[key]);
					}
				}
			}
		}
		catch (e) {
			value = undefined;
		}
		return (value) ? value : "translation missing for: " + lang + "." + path;
	};
};