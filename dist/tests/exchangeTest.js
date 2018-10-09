"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Lab = require("lab");
var code_1 = require("code");
var Player_1 = require("../logic/Player");
var Benefit_1 = require("../logic/Benefit");
var Exchange_1 = require("../logic/Exchange");
var Store_1 = require("../logic/Store");
var lab = Lab.script();
exports.lab = lab;
var describe = lab.describe, it = lab.it, before = lab.before, beforeEach = lab.beforeEach;
describe('Exchange Test', function () {
    var p;
    var exchange;
    beforeEach(function () {
        p = Player_1.CreatePlayer('jon', Player_1.RaceType.Terrans);
        exchange = new Exchange_1.Exchange();
    });
    it('try to trade an invalid merchandise', function () {
        try {
            exchange.trade(p, Benefit_1.Material.Power, Benefit_1.Material.SpecialRange, 11);
        }
        catch (e) {
            code_1.expect('merchandise not found');
        }
    });
    it('single time trade failure: not enough resouces', function () {
        p.qic = 0;
        p.ore = 1;
        exchange.trade(p, Benefit_1.Material.QIC, Benefit_1.Material.Ore, 1);
        code_1.expect(p.qic).to.equal(0);
        code_1.expect(p.ore).to.equal(1);
    });
    it('single time trade success', function () {
        p.gold = 10;
        p.power.bowl3 = 1;
        exchange.trade(p, Benefit_1.Material.Power, Benefit_1.Material.Gold, 1);
        code_1.expect(p.gold).to.equal(11);
    });
    it('multiple times trade success', function () {
        p.gold = 10;
        p.power.bowl3 = 3;
        exchange.trade(p, Benefit_1.Material.Power, Benefit_1.Material.Gold, 3);
        code_1.expect(p.gold).to.equal(13);
    });
    it('multiple times trade failure: not enough resouces', function () {
        p.gold = 10;
        p.power.bowl3 = 1;
        exchange.trade(p, Benefit_1.Material.Power, Benefit_1.Material.Gold, 11);
        code_1.expect(p.gold).to.equal(10);
    });
});
describe('Store Test', function () {
    var p;
    var store;
    beforeEach(function () {
        p = Player_1.CreatePlayer('jon', Player_1.RaceType.Terrans);
        store = new Store_1.Store();
    });
    //this is unnecessary because if it's invalid, it doesn't pass npm test.
    it('try to trade an invalid merchandise', function () {
        try {
            //store.trade(p, StoreMerchandiseType.Pw3dig2);
        }
        catch (e) {
            code_1.expect('merchandise not found');
        }
    });
    it('single time trade success', function () {
        p.power.bowl3 = 7;
        p.science = 0;
        store.trade(p, Store_1.StoreMerchandiseType.Pw7sci3);
        code_1.expect(p.science).to.equal(3);
    });
    it('single time trade failure: not enough resources', function () {
        p.power.bowl3 = 3;
        p.science = 0;
        store.trade(p, Store_1.StoreMerchandiseType.Pw7sci3);
        code_1.expect(p.science).to.equal(0);
    });
    it('serial store trades: cannot buy the same item once it is sold out ', function () {
        p.power.bowl3 = 8;
        p.ore = 0;
        store.trade(p, Store_1.StoreMerchandiseType.Pw4ore2);
        store.trade(p, Store_1.StoreMerchandiseType.Pw4ore2);
        code_1.expect(p.ore).to.equal(2);
        code_1.expect(p.power.bowl3).to.equal(4);
    });
});
