var path = require("path");

var is = function(val,type){ return Object.prototype.toString.call(val) == Object.prototype.toString.call(new type()); };

module.exports = function (lang, url) {
	var locale = require(path.join(url, lang));
	return function(path, attrs){
		var value;
		try{
			eval("value = locale."+path+";");
			value = is(value,String) ? value : value.default;
			if(attrs) for(var k in attrs){ value = value.replace(new RegExp("{"+k+"}","g"), attrs[k]); }
		}
		catch(e){ value = undefined; }
		return (value) ? value : "translation missing for: "+lang+"."+path;
	};
};