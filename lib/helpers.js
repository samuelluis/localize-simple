var expect = require("chai").expect;

function deep(obj, path){
    if (module.exports.is(path, String)){
        path = path.split(".");
    }
    var prop = path.splice(0,1).toString();
    if (prop && obj !== undefined){
        return deep(obj[prop], path);
    }
    else{
        return obj;
    }
}

module.exports = {
    is: function(val,Type){ return Object.prototype.toString.call(val) === Object.prototype.toString.call(new Type()); },
    deep: deep
};