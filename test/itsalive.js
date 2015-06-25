var expect = require("chai").expect;
var chai = require("chai");
var spies = require("chai-spies");

chai.use(spies);

describe("adds 2 + 2", function() {
	it("returns 4", function() {
		expect(2 + 2).to.equal(4);
	});
});

describe("waits 10 ms", function() {
	it("sets timeout of 10", function(done) {
		var start = new Date();
		setTimeout(function() {
			var end = new Date();
			expect(end - start).to.be.within(0, 20);
			done();
		}, 10);
	});
});

describe("loops over each", function() {
	it("loops over each", function() {
		var logI = function(i) {
			console.log(i);
		};
		var spy = chai.spy(logI);
		[1,2,3,4,5].forEach(spy);
		expect(spy).to.have.been.called.exactly(5);
	});
});