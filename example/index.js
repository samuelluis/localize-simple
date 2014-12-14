var express = require("express");
var session = require("express-session");
var partials = require("express-partials");
var MongoStore = require("connect-mongo")(session);
var path = require("path");
var ejs = require("ejs");
var localize = require("..");
var app = express();

app.engine("html", ejs.renderFile);
app.use(partials());
app.use(session({
    secret: "localize-simple",
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({url: "mongodb://localize-simple:localize-simple@dogen.mongohq.com:10036/localize-simple/sessions"})
}));

app.use(localize({
    router: app,
    path: path.join(__dirname, "locales"),
    default: "es"
}));

app.get("/", function(req, res){
    var pjson = require("../package.json");
    res.render("index.html", {version: pjson.version});
});

app.set("port", process.env.PORT || 3000);

var server = app.listen(app.get("port"), function() {
    console.log("Express server listening on port " + server.address().port);
});
