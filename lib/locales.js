var join = require("path").join;

module.exports = {
	is: function(val,type){ return Object.prototype.toString.call(val) == Object.prototype.toString.call(new type()); },
	translate: function (lang, path) {
		var locale = require(join(path, lang));
		return function (path, attrs) {
			var value;
			try {
				eval("value = locale." + path + ";");
				value = module.exports.is(value, String) ? value : value.default;
				if (attrs) for (var k in attrs) {
					value = value.replace(new RegExp("{" + k + "}", "g"), attrs[k]);
				}
			}
			catch (e) {
				value = undefined;
			}
			return (value) ? value : "translation missing for: " + lang + "." + path;
		};
	}
};