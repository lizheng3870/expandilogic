"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Lab = require("lab");
var code_1 = require("code");
var Player_1 = require("../logic/Player");
var Benefit_1 = require("../logic/Benefit");
var Exchange_1 = require("../logic/Exchange");
var lab = Lab.script();
exports.lab = lab;
var describe = lab.describe, it = lab.it, before = lab.before, beforeEach = lab.beforeEach;
function testExchange(exchangeType, player, times, exchange) {
    var give = exchangeType.give;
    var get = exchangeType.get;
    var oldOre = player.ore;
    var oldPower3 = player.power.bowl3;
    var oldQIC = player.qic;
    var oldScience = player.science;
    var oldGold = player.gold;
    var oldSRange = player.specialRange;
    var oldPower1 = player.power.bowl1;
    exchange.trade(player, give, get, times);
    if (exchangeType === exchange.powerToGold) {
        code_1.expect(oldPower3).to.equal(exchangeType.numGive * times + player.power.bowl3);
        code_1.expect(exchangeType.numGet * times + oldPower1).to.equal(player.power.bowl1);
        code_1.expect(exchangeType.numGet * times + oldGold).to.equal(player.gold);
    }
    else if (exchangeType === exchange.powerToOre) {
        code_1.expect(oldPower3).to.equal(exchangeType.numGive * times + player.power.bowl3);
        code_1.expect(exchangeType.numGet * times + oldPower1).to.equal(player.power.bowl1);
        code_1.expect(exchangeType.numGet * times + oldOre).to.equal(player.ore);
    }
    else if (exchangeType === exchange.powerToQIC) {
        code_1.expect(oldPower3).to.equal(exchangeType.numGive * times + player.power.bowl3);
        code_1.expect(exchangeType.numGet * times + oldPower1).to.equal(player.power.bowl1);
        code_1.expect(exchangeType.numGet * times + oldQIC).to.equal(player.qic);
    }
    else if (exchangeType === exchange.powerToScience) {
        code_1.expect(oldPower3).to.equal(exchangeType.numGive * times + player.power.bowl3);
        code_1.expect(exchangeType.numGet * times + oldPower1).to.equal(player.power.bowl1);
        code_1.expect(exchangeType.numGet * times + oldScience).to.equal(player.science);
    }
    else if (exchangeType === exchange.oreToExtra) {
        code_1.expect(oldOre).to.equal(exchangeType.numGive * times + player.ore);
        code_1.expect(exchangeType.numGet * times + oldSRange).to.equal(player.specialRange);
    }
    else if (exchangeType === exchange.oreToGold) {
        code_1.expect(oldOre).to.equal(exchangeType.numGive * times + player.ore);
        code_1.expect(exchangeType.numGet * times + oldGold).to.equal(player.gold);
    }
    else if (exchangeType === exchange.qicToOre) {
        code_1.expect(oldQIC).to.equal(exchangeType.numGive * times + player.qic);
        code_1.expect(exchangeType.numGet * times + oldOre).to.equal(player.ore);
    }
    else if (exchangeType === exchange.qicToRange) {
        code_1.expect(oldQIC).to.equal(exchangeType.numGive * times + player.qic);
        code_1.expect(exchangeType.numGet * times + oldSRange).to.equal(player.specialRange);
    }
    else if (exchangeType === exchange.scienceToGold) {
        code_1.expect(oldScience).to.equal(exchangeType.numGive * times + player.science);
        code_1.expect(exchangeType.numGet * times + oldGold).to.equal(player.gold);
    }
}
describe('Exchange Test', function () {
    var p;
    var exchange;
    beforeEach(function () {
        p = new Player_1.Player('jon', Player_1.RaceType.Terrans);
        exchange = new Exchange_1.Exchange();
    });
    it('try to trade an invalid merchandise', function () {
        try {
            testExchange(new Exchange_1.Merchandise(Benefit_1.Material.Power, Benefit_1.Material.SpecialRange, 4, 1), p, 3, exchange);
        }
        catch (e) {
            code_1.expect('merchandise not found');
        }
    });
    // it('try to trade with not enough resources', ()=>{
    //     p.power.bowl3 = 1
    //     try{
    //         testExchange(exchange.powerToGold, p, 6, exchange)
    //     }catch(e){
    //         expect('not enough resources')
    //     }
    //     expect(p.power.bowl3).to.equal(1)
    // })
    //
    // it('single time trade success', ()=>{
    //     testExchange(exchange.powerToGold, p, 1, exchange)
    // })
});
