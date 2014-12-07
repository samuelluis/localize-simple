var expect = require('chai').expect;
var locales = require('../lib/locales.js');

describe('locales.is', function(){
    it("string", function(){
        r = locales.is("", String);
        expect(r).to.be.ok;
    });
    it("number", function(){
        r = locales.is(0, Number);
        expect(r).to.be.ok;
    });
    it("boolean", function(){
        r = locales.is(true, Boolean);
        expect(r).to.be.ok;
    });
    it("array", function(){
        r = locales.is([], Array);
        expect(r).to.be.ok;
    });
    it("object", function(){
        r = locales.is({}, Object);
        expect(r).to.be.ok;
    });
    it("function", function(){
        r = locales.is(function(){}, Function);
        expect(r).to.be.ok;
    });
});

describe("locale.translate", function(){
    describe("en", function() {
        var t;
        before(function(){
            t = locales.translate("en", "../test/locales");
            expect(t).to.be.a("function");
        });

        it("normal", function () {
            r = t("menu.home");
            expect(r).to.be.a("string").that.equals("Home");
        });
        it("default", function () {
            r = t("menu");
            expect(r).to.be.a("string").that.equals("Menu");
        });
        it("with params", function () {
            r = t("menu.download",{ version: "1.2" });
            expect(r).to.be.a("string").that.equals("Download our 1.2 version");
        });
        it("missing", function () {
            r = t("menu.about");
            expect(r).to.be.a("string").that.equals("translation missing for: en.menu.about");
        });
    });
    describe("es", function() {
        var t;
        before(function(){
            t = locales.translate("es", "../test/locales");
            expect(t).to.be.a("function");
        });

        it("normal", function () {
            r = t("menu.home");
            expect(r).to.be.a("string").that.equals("Inicio");
        });
        it("default", function () {
            r = t("menu");
            expect(r).to.be.a("string").that.equals("Menú");
        });
        it("with params", function () {
            r = t("menu.download",{ version: "1.2" });
            expect(r).to.be.a("string").that.equals("Descarga nuestra versión 1.2");
        });
        it("missing", function () {
            r = t("menu.about");
            expect(r).to.be.a("string").that.equals("translation missing for: es.menu.about");
        });
    });
});