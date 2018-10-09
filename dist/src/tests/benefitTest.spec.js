"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Lab = require("lab");
var code_1 = require("code");
var Player_1 = require("../logic/Player");
var Benefit_1 = require("../logic/Benefit");
var TechBoard_1 = require("../logic/TechBoard");
var Federation_1 = require("../logic/Federation");
var lab = Lab.script();
exports.lab = lab;
var describe = lab.describe, it = lab.it, before = lab.before, beforeEach = lab.beforeEach;
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
        p = Player_1.CreatePlayer('jon', Player_1.RaceType.Terrans);
        b1 = new Benefit_1.Benefit(4 /* Income */, null, null, [new Benefit_1.Value(1, Benefit_1.Material.Gold)]);
        b2 = new Benefit_1.Benefit(0 /* Now */, null, null, [new Benefit_1.Value(1, Benefit_1.Material.Ore)]);
        // b3 = new Benefit(Trigger.Income, null, null, [new Value(3, Material.QIC)]);
    });
    it('can add the resource of now benefit into player class', function () {
        var oldOre = p.ore;
        p.getTechBenefit(b2);
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
        p.getTechBenefit(b3);
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
        p.getTechBenefit(b3);
        p.getTechBenefit(b4);
        code_1.expect(p.gold - g1).to.equal(12);
        code_1.expect(p.ore - o1).to.equal(9);
        code_1.expect(p.science - s1).to.equal(6);
        code_1.expect(p.qic - q1).to.equal(16);
    });
});
describe('tech test', function () {
    var p;
    var techboard;
    var fedLib = new Federation_1.FederationLib();
    beforeEach(function () {
        //console.log("tech test begin");
        p = Player_1.CreatePlayer('jon', Player_1.RaceType.Terrans);
        code_1.expect(p.techs[0]).to.equal(0);
        code_1.expect(p.techs[1]).to.equal(0);
        code_1.expect(p.techs[2]).to.equal(0);
        code_1.expect(p.techs[3]).to.equal(1);
        code_1.expect(p.techs[4]).to.equal(0);
        code_1.expect(p.techs[5]).to.equal(0);
        techboard = new TechBoard_1.default(false, fedLib.getDigLaneSpeicalFederationToken());
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
    it("has the right effect of dig tech", function () {
        //console.log("the dig cost was: " + p.digCost);
        techboard.update(0, p);
        code_1.expect(p.ore).to.equal(6);
        techboard.update(0, p);
        code_1.expect(p.digCost).to.equal(2);
        techboard.update(0, p);
        code_1.expect(p.digCost).to.equal(1);
        code_1.expect(p.power.bowl2).to.equal(7);
        code_1.expect(p.power.bowl1).to.equal(1);
        techboard.update(0, p);
        code_1.expect(p.ore).to.equal(8);
    });
    it('has right effect of range tech', function () {
        techboard.update(1, p);
        code_1.expect(p.qic).to.equal(2);
        techboard.update(1, p);
        code_1.expect(p.range).to.equal(2);
        techboard.update(1, p);
        code_1.expect(p.qic).to.equal(3);
        code_1.expect(p.power.bowl2).to.equal(7);
        code_1.expect(p.power.bowl1).to.equal(1);
        techboard.update(1, p);
        code_1.expect(p.range).to.equal(3);
        techboard.update(1, p);
        code_1.expect(p.range).to.equal(4);
    });
    it('has right effect of QIC tech', function () {
        // console.log("the terran QIC was: " + p.qic);
        techboard.update(2, p);
        code_1.expect(p.qic).to.equal(2);
        techboard.update(2, p);
        code_1.expect(p.qic).to.equal(3);
        techboard.update(2, p);
        code_1.expect(p.qic).to.equal(5);
        code_1.expect(p.power.bowl2).to.equal(7);
        code_1.expect(p.power.bowl1).to.equal(1);
        techboard.update(2, p);
        code_1.expect(p.qic).to.equal(7);
        techboard.update(2, p);
        code_1.expect(p.qic).to.equal(11);
    });
    it('has right effect of Gaia tech', function () {
        // console.log("the terran QIC was: " + p.qic);
        code_1.expect(p.gaiaformer).to.equal(1);
        code_1.expect(p.gaiaFormingCost).to.equal(6);
        techboard.update(3, p);
        code_1.expect(p.power.bowl1).to.equal(7);
        techboard.update(3, p);
        code_1.expect(p.gaiaformer).to.equal(2);
        code_1.expect(p.gaiaFormingCost).to.equal(4);
        code_1.expect(p.power.bowl2).to.equal(7);
        code_1.expect(p.power.bowl1).to.equal(4);
        techboard.update(3, p);
        code_1.expect(p.gaiaformer).to.equal(3);
        code_1.expect(p.gaiaFormingCost).to.equal(3);
        techboard.update(3, p);
        // expect(p.qic).to.equal(11);
    });
    if ('race HadschHallas add 2 gold 1 ore 1 science and power charge 1 at income phase') {
        var p_1 = Player_1.CreatePlayer('yalei', Player_1.RaceType.HadschHallas);
        code_1.expect(p_1.science).to.equal(3);
        code_1.expect(p_1.ore).to.equal(4);
        code_1.expect(p_1.gold).to.equal(15);
        code_1.expect(p_1.power.bowl1).to.equal(2);
        code_1.expect(p_1.power.bowl2).to.equal(4);
        // p.calculateIncomeBenefit();
        // expect(p.science).to.equal(4);
        // expect(p.ore).to.equal(5);
        // expect(p.gold).to.equal(20);
        // expect(p.power.bowl1).to.equal(1);
        // expect(p.power.bowl2).to.equal(5);
    }
});
describe("special power test", function () {
    var p;
    beforeEach(function () {
        p = Player_1.CreatePlayer('yalei', Player_1.RaceType.Terrans);
    });
    it('begin the test', function () {
        console.log();
        console.log("***********special power test begin***********");
        p.printSpecialPower();
        code_1.expect(1).to.equal(1);
        for (var i = 0; i < p.specialPowers.length; i++) {
            code_1.expect(p.specialPowers[i].ifGet).to.equal(false);
        }
    });
    it('can directly activate the special power', function () {
        p.specialPowers[0].activatePower();
        code_1.expect(p.specialPowers[0].ifGet).to.equal(true);
    });
    it('can get the special power from the benefit', function () {
        p.activateSpecialPower(new Benefit_1.Benefit(6 /* Special */, null, null, [new Benefit_1.Value(3, Benefit_1.Material.Science)]));
        // p.printSpecialPower();
        code_1.expect(p.specialPowers[6].ifGet).to.equal(true);
    });
    it('can get the special power from the normal techtile', function () {
        var t = new TechBoard_1.default(false);
        t.takeNormal3TechTiles(2, 0, p);
        code_1.expect(p.specialPowers[3].ifGet).to.equal(true);
    });
    it('can get the special power from the advance techtile', function () {
        var t = new TechBoard_1.default(false);
        t.takeAdvancedTechTiles(2, 0, p);
        code_1.expect(p.specialPowers[4].ifGet).to.equal(true);
    });
    it('can get advance techtile special power and turn off the normal techtile special power', function () {
        var t = new TechBoard_1.default(false);
        t.takeNormal3TechTiles(2, 0, p);
        code_1.expect(p.specialPowers[3].ifGet).to.equal(true);
        t.takeAdvancedTechTiles(2, 8, p);
        code_1.expect(p.specialPowers[3].ifGet).to.equal(false);
        code_1.expect(p.specialPowers[4].ifGet).to.equal(true);
    });
    it('can not use a deactivated special power', function () {
        var flag = p.useSpecialPower(0);
        code_1.expect(flag).to.equal(false);
    });
    it('can not use one special power two times in one turn', function () {
        var t = new TechBoard_1.default(false);
        t.takeNormal3TechTiles(2, 0, p);
        var flag = p.useSpecialPower(3);
        code_1.expect(flag).to.equal(true);
        flag = p.useSpecialPower(3);
        code_1.expect(flag).to.equal(false);
    });
    it('has the right effect of QIC1', function () {
        p.specialPowers[0].activatePower();
        p.useSpecialPower(0);
        code_1.expect(p.qic).to.equal(2);
    });
});
