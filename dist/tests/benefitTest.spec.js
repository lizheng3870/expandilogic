"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Lab = require("lab");
var code_1 = require("code");
var Player_1 = require("../logic/Player");
var Benefit_1 = require("../logic/Benefit");
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
        p = new Player_1.Player('jon');
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
});
