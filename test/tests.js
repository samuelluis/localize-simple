var expect = require("chai").expect;
var locales = require("../lib/locales");
var helpers = require("../lib/helpers");

describe("helpers", function(){
    describe("is", function(){
        it("string", function(){
            var r = helpers.is("", String);
            expect(r).to.be.ok();
        });
        it("number", function(){
            var r = helpers.is(0, Number);
            expect(r).to.be.ok();
        });
        it("boolean", function(){
            var r = helpers.is(true, Boolean);
            expect(r).to.be.ok();
        });
        it("array", function(){
            var r = helpers.is([], Array);
            expect(r).to.be.ok();
        });
        it("object", function(){
            var r = helpers.is({}, Object);
            expect(r).to.be.ok();
        });
        it("function", function(){
            var r = helpers.is(function(){}, Function);
            expect(r).to.be.ok();
        });
    });
    describe("deep", function(){
        var obj;
        before(function(){
            obj = {
                individual: "I don't have parent!",
                parent: {
                    child: "I'm an inner property!"
                }
            };
        });

        it("one level", function(){
            var r = helpers.deep(obj, "individual");
            expect(r).to.be.a("string").that.equals(obj.individual);
        });
        it("some levels", function(){
            var r = helpers.deep(obj, "parent.child");
            expect(r).to.be.a("string").that.equals(obj.parent.child);
        });
        it("understatement", function(){
            var r = helpers.deep(obj, "parent");
            expect(r).to.be.an("object").that.equals(obj.parent);
        });
        it("exceeded", function(){
            var r = helpers.deep(obj, "parent.child.grandchild");
            expect(r).to.equals(obj.parent.child.grandchild);
        });
        it("dumbness", function(){
            var r = helpers.deep(obj, "");
            expect(r).to.be.an("object").that.equals(obj);
        });
    });
});

describe("locale.translate", function(){
    describe("en", function() {
        var t;
        before(function(){
            t = locales.call(this, "en", "../test/locales");
            expect(t).to.be.a("function");
        });

        it("normal", function () {
            var r = t("menu.home");
            expect(r).to.be.a("string").that.equals("Home");
        });
        it("default", function () {
            var r = t("menu");
            expect(r).to.be.a("string").that.equals("Menu");
        });
        it("with params", function () {
            var r = t("menu.download",{ version: "1.2" });
            expect(r).to.be.a("string").that.equals("Download our 1.2 version");
        });
        it("missing", function () {
            var r = t("menu.about");
            expect(r).to.be.a("string").that.equals("translation missing for: en.menu.about");
        });
    });
    describe("es", function() {
        var t;
        before(function(){
            t = locales.call(this, "es", "../test/locales");
            expect(t).to.be.a("function");
        });

        it("normal", function () {
            var r = t("menu.home");
            expect(r).to.be.a("string").that.equals("Inicio");
        });
        it("default", function () {
            var r = t("menu");
            expect(r).to.be.a("string").that.equals("Menú");
        });
        it("with params", function () {
            var r = t("menu.download",{ version: "1.2" });
            expect(r).to.be.a("string").that.equals("Descarga nuestra versión 1.2");
        });
        it("missing", function () {
            var r = t("menu.about");
            expect(r).to.be.a("string").that.equals("translation missing for: es.menu.about");
        });
    });
});