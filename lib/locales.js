var expect = require("chai").expect;
var join = require("path").join;

module.exports = {
	is: function(val,type){ return Object.prototype.toString.call(val) === Object.prototype.toString.call(new type()); },
	translate: function (lang, path) {
		var locale = require(join(path, lang));
		expect(locale).to.be.an("object");
		return function (path, params) {
			var value;
			try {
				eval("value = locale." + path + ";");
				value = module.exports.is(value, String) ? value : value.default;
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
	}
};