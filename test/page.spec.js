var chai = require("chai");
var expect = chai.expect;
var spies = require("chai-spies");
var Page = require("../models/index.js").Page;

describe("Wikistack Model", function() {
	describe("Page Schema", function() {
		describe("Validation", function() {
			var page;
			beforeEach(function () {
				page = new Page();
			});
			it("returns true if valid title otherwise returns error", function() {
				page.title = "validTitle";
				page.validate(function(err) {
					expect(err).to.be.undefined;
					page.title = "";
					page.validate(function(err) {
						expect(err.errors).to.have.property("title");
						done();
					});
				});
				
			});
		});
		describe("Methods", function() {
			describe("computeUrlName", function() {
				it("replaces whitespace with _ and removes non-alphanumeric chars");
			});
			describe("getSimilar", function() {
				it("returns similar pages");
			});
		});
		describe("Hooks", function() {
			describe("calls computeUrlName before saving");
		});
		describe("Virtuals", function() {
			describe("full_route", function() {
				it("returns full url");
			});
		});
		describe("Statistics", function() {
			describe("findByTag", function() {
				it("returns pages with same tag");
			});
		});
	});
});