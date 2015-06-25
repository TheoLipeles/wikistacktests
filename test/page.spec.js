var chai = require("chai");
var expect = chai.expect;
var spies = require("chai-spies");
var Page = require("../models/index.js").Page;

describe("Wikistack Model", function() {
	describe("Page Schema", function() {
		var page;
		var page2;
		var page3;
		beforeEach(function (done) {
			Page.remove({});
			page = new Page();
			page2 = new Page();
			page3 = new Page();
			page.body = "Somebody...";
			page.title = "The title!";
			page2.body = "Somebody2...";
			page2.title = "The title2!";
			page3.body = "Somebody3...";
			page3.title = "The title3!";
			page2.tags = ["text1", "text2", 'text3'];
			page3.tags = ["text10", "text5", 'text6'];
			page.tags = ["text7", "text1", 'text4'];
			page.save(function(){
				page2.save(function(){
					page3.save(function(){
						done();
					});
				});
			});
		});
		afterEach(function(done){
			Page.remove({}, function() {
				done();
			});
		});
		describe("Validation", function() {
			it("doesn't return error if title is valid", function(done) {
				page.title = "validTitle";
				page.validate(function(err) {
					expect(err).to.be.null;
					done();
				});
			});
			it("returns error if no valid title", function(done) {	
				page.title = "";
				page.validate(function(err) {
					expect(err.errors).to.have.property("title");
					done();
				});
			});
		});
		describe("Methods", function() {
			describe("computeUrlName", function(done) {
				it("replaces whitespace with _ and removes non-alphanumeric chars", function(done){
					page.title = "The Quick F@x";
					page.computeUrlName();
					expect(page.url_name).to.equal("The_Quick_F_x");
					done();
				});
			});
			describe("getSimilar", function() {
				it("returns pages with same tag", function(done){
					page.getSimilar(function(err, pages){
						expect(pages[0].id).to.equal(page2.id);
						done();
					});
				});
			});
		});
		describe("Hooks", function() {
			it("calls computeUrlName before saving", function() {
				var spy = chai.spy(this.computeUrlName);
				expect(spy).to.have.been.called;
			});
		});
		describe("Virtuals", function() {
			describe("full_route", function() {
				it("returns full url", function(done) {
					expect(page.full_route).to.equal("/wiki/" + page.url_name);
					done();
				});
			});
		});
		describe("Statics", function() {
			describe("findByTag", function() {
				it("returns pages with same tag", function(done) {
					Page.findByTag("text10", function(err, pages) {
						expect(pages[0].id).to.equal(page3.id);
						done();
					});
				});
			});
		});
	});
});