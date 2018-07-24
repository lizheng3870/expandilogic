"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Lab = require("lab");
var code_1 = require("code");
var Player_1 = require("../logic/Player");
var Benefit_1 = require("../logic/Benefit");
var TechBoard_1 = require("../logic/TechBoard");
var lab = Lab.script();
exports.lab = lab;
var describe = lab.describe, it = lab.it, before = lab.before, beforeEach = lab.beforeEach;
function testAddIncomeBenefit(player, benefits, numOfIncome) {
    var old = player.incomeBenefits.length;
    for (var i = 0; i < benefits.length; i++) {
        player.getBenefit(benefits[i]);
    }
    var now = player.incomeBenefits.length;
    code_1.expect(now - old).to.equal(numOfIncome);
}
describe('experiment', function () {
    before(function () { });
    it('verifies 1 equals 1', function () {
        code_1.expect(1).to.equal(1);
    });
});
describe('Benefit Test', function () {
    var p;
    var b1;
    var b2;
    // let b3: Benefit;
    beforeEach(function () {
        p = new Player_1.Player('jon', Player_1.RaceType.Terrans);
        b1 = new Benefit_1.Benefit(4 /* Income */, null, null, [new Benefit_1.Value(1, Benefit_1.Material.Gold)]);
        b2 = new Benefit_1.Benefit(0 /* Now */, null, null, [new Benefit_1.Value(1, Benefit_1.Material.Ore)]);
        // b3 = new Benefit(Trigger.Income, null, null, [new Value(3, Material.QIC)]);
    });
    it('begin the player with no benefit', function () {
        code_1.expect(p.incomeBenefits.length).to.equal(0);
    });
    it('add one income benefit of income into the player', function () {
        testAddIncomeBenefit(p, [b1], 1);
    });
    it('add one income benefit and one now benefit, to see if the income benefit is added into the right place', function () {
        testAddIncomeBenefit(p, [b1, b2], 1);
    });
    it('can add the resource of now benefit into player class', function () {
        var oldOre = p.ore;
        p.getBenefit(b2);
        var nowOre = p.ore;
        code_1.expect(nowOre - oldOre).to.equal(1);
    });
    it('can add mutiple resources', function () {
        var g1 = p.gold;
        var o1 = p.ore;
        var s1 = p.science;
        var q1 = p.qic;
        var b3 = new Benefit_1.Benefit(0 /* Now */, null, null, [new Benefit_1.Value(10, Benefit_1.Material.Gold),
            new Benefit_1.Value(3, Benefit_1.Material.Ore),
            new Benefit_1.Value(5, Benefit_1.Material.Science),
            new Benefit_1.Value(7, Benefit_1.Material.QIC)]);
        p.getBenefit(b3);
        code_1.expect(p.gold - g1).to.equal(10);
        code_1.expect(p.ore - o1).to.equal(3);
        code_1.expect(p.science - s1).to.equal(5);
        code_1.expect(p.qic - q1).to.equal(7);
    });
    it('can add mutiple resources from multiple benefits', function () {
        var g1 = p.gold;
        var o1 = p.ore;
        var s1 = p.science;
        var q1 = p.qic;
        var b3 = new Benefit_1.Benefit(0 /* Now */, null, null, [new Benefit_1.Value(10, Benefit_1.Material.Gold),
            new Benefit_1.Value(3, Benefit_1.Material.Ore),
            new Benefit_1.Value(5, Benefit_1.Material.Science),
            new Benefit_1.Value(7, Benefit_1.Material.QIC)]);
        var b4 = new Benefit_1.Benefit(0 /* Now */, null, null, [new Benefit_1.Value(2, Benefit_1.Material.Gold),
            new Benefit_1.Value(6, Benefit_1.Material.Ore),
            new Benefit_1.Value(1, Benefit_1.Material.Science),
            new Benefit_1.Value(9, Benefit_1.Material.QIC)]);
        p.getBenefit(b3);
        p.getBenefit(b4);
        code_1.expect(p.gold - g1).to.equal(12);
        code_1.expect(p.ore - o1).to.equal(9);
        code_1.expect(p.science - s1).to.equal(6);
        code_1.expect(p.qic - q1).to.equal(16);
    });
});
describe('tech test', function () {
    var p;
    var techboard;
    beforeEach(function () {
        console.log("tech test begin");
        p = new Player_1.Player('jon', Player_1.RaceType.Terrans);
        code_1.expect(p.techs[0]).to.equal(0);
        code_1.expect(p.techs[1]).to.equal(0);
        code_1.expect(p.techs[2]).to.equal(0);
        code_1.expect(p.techs[3]).to.equal(0);
        code_1.expect(p.techs[4]).to.equal(0);
        code_1.expect(p.techs[5]).to.equal(0);
        techboard = new TechBoard_1.default();
        // techboard.print();
    });
    it("update test: 1.if it can update; 2.can not update when it is level 5", function () {
        techboard.update(0, p);
        code_1.expect(p.techs[0]).to.equal(1);
        techboard.update(0, p);
        code_1.expect(p.techs[0]).to.equal(2);
        techboard.update(0, p);
        code_1.expect(p.techs[0]).to.equal(3);
        techboard.update(0, p);
        code_1.expect(p.techs[0]).to.equal(4);
        techboard.update(0, p);
        code_1.expect(p.techs[0]).to.equal(5);
        techboard.update(0, p);
        code_1.expect(p.techs[0]).to.equal(5);
    });
    it("the effect of tech is right: dig", function () {
        console.log("the dig cost was: " + p.digCost);
        techboard.update(0, p);
        code_1.expect(p.ore).to.equal(6);
        techboard.update(0, p);
        code_1.expect(p.digCost).to.equal(2);
        techboard.update(0, p);
        code_1.expect(p.digCost).to.equal(1);
        code_1.expect(p.power.bowl2).to.equal(5);
        code_1.expect(p.power.bowl3).to.equal(1);
        techboard.update(0, p);
        code_1.expect(p.ore).to.equal(8);
    });
});
