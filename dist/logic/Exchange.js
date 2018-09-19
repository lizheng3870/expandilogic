"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Benefit_1 = require("./Benefit");
/**
 * the class Merchandise
 * this class will be used in the Exchange to represent material
 * will also be used in the store in the TechBoard class
 * @argument give: the material used to trade
 * @argument get: the material you want
 * @argument numGive: the quantity to give in one trade
 * @argument numGet: the quantity you get in one trade
 */
var Merchandise = /** @class */ (function () {
    function Merchandise(give, get, numGive, numGet) {
        this.give = give;
        this.get = get;
        this.numGive = numGive;
        this.numGet = numGet;
    }
    return Merchandise;
}());
exports.Merchandise = Merchandise;
/**
 * Exchange has nine kinds of Merchandise;
 * this class will be initialized in the Action class;
 * after initialized, nine merchandises will be pushed into an array;
 */
var Exchange = /** @class */ (function () {
    function Exchange() {
        this.powerToGold = new Merchandise(Benefit_1.Material.Power, Benefit_1.Material.Gold, 1, 1);
        this.powerToOre = new Merchandise(Benefit_1.Material.Power, Benefit_1.Material.Ore, 3, 1);
        this.powerToScience = new Merchandise(Benefit_1.Material.Power, Benefit_1.Material.Science, 4, 1);
        this.powerToQIC = new Merchandise(Benefit_1.Material.Power, Benefit_1.Material.QIC, 4, 1);
        this.oreToGold = new Merchandise(Benefit_1.Material.Ore, Benefit_1.Material.Gold, 1, 1);
        this.oreToExtra = new Merchandise(Benefit_1.Material.Ore, Benefit_1.Material.ExtraPower, 1, 1);
        this.qicToOre = new Merchandise(Benefit_1.Material.QIC, Benefit_1.Material.Ore, 1, 1);
        this.qicToRange = new Merchandise(Benefit_1.Material.QIC, Benefit_1.Material.SpecialRange, 1, 2);
        this.scienceToGold = new Merchandise(Benefit_1.Material.Science, Benefit_1.Material.Gold, 1, 1);
        //push them all into an array
        this.exchanges = [];
        this.exchanges.push(this.powerToGold);
        this.exchanges.push(this.powerToOre);
        this.exchanges.push(this.powerToScience);
        this.exchanges.push(this.oreToGold);
        this.exchanges.push(this.oreToExtra);
        this.exchanges.push(this.qicToOre);
        this.exchanges.push(this.qicToRange);
        this.exchanges.push(this.scienceToGold);
    }
    /**
     * the function to check a particular times of trade;
     * @param player the player who does the trade;
     * @param give the material given out;
     * @param get the material get;
     * @param times the times of trade
     */
    Exchange.prototype.checkTrade = function (player, give, get, times) {
        var good = this.getGood(give, get);
        // find the type of trading
        if (give === Benefit_1.Material.Power && get === Benefit_1.Material.Power) {
            return player.power.bowl2 >= times;
        }
        if (good === null)
            return false;
        var totalGive = good.numGive * times;
        //check if you have enough resources
        if (!this.checkResources(player, give, totalGive)) {
            return false;
        }
        else {
            return true;
        }
    };
    Exchange.prototype.getGood = function (give, get) {
        var good = null;
        for (var i = 0; i < this.exchanges.length; i++) {
            if (this.exchanges[i].give === give && this.exchanges[i].get === get) {
                good = this.exchanges[i];
                break;
            }
        }
        return good;
    };
    /**
     * the function to make a particular times of trade;
     * @param player the player who does the trade;
     * @param give the material given out;
     * @param get the material get;
     * @param times the times of trade
     */
    Exchange.prototype.trade = function (player, give, get, times) {
        // special case for Discard one power token from area II of
        //  your power cycle to move one power token from area II to area III.
        if (give === Benefit_1.Material.Power && get === Benefit_1.Material.Power) {
            var amount = times;
            player.power.bowl2 -= amount;
            if (player.power.bowl2 < amount) {
                amount = player.power.bowl2;
            }
            player.power.bowl2 -= amount;
            player.power.bowl3 += amount;
            return;
        }
        var good = this.getGood(give, get);
        if (good === null) { // if not find the type of trading
            console.log("merchandise not found");
            return;
        }
        var totalGive = good.numGive * times;
        var totalGet = good.numGet * times;
        //check if you have enough resources
        if (!this.checkResources(player, give, totalGive)) {
            console.log("not enough resources");
            return;
        }
        if (give === Benefit_1.Material.Power)
            player.spendPower(totalGive);
        if (give === Benefit_1.Material.Ore)
            player.ore -= totalGive;
        if (give === Benefit_1.Material.QIC)
            player.qic -= totalGive;
        if (give === Benefit_1.Material.Science)
            player.science -= totalGive;
        /**
         * // problem: how to reduce it after one action?
         * In player's class, if does exchange and get === Material.SpecialRange, do player.range-=totalGet after the exchange
         */
        if (get === Benefit_1.Material.QIC)
            player.qic += totalGet;
        if (get === Benefit_1.Material.Ore)
            player.ore += totalGet;
        if (get === Benefit_1.Material.Gold) {
            //console.log(player.gold);
            player.gold += totalGet;
            //console.log(player.gold);
        }
        if (get === Benefit_1.Material.Science)
            player.science += totalGet;
        // TODO: is this the right way to handle this? VVV
        // if(get === Material.Power) player.power1 += totalGet;
    };
    /**
     * check if the player has enough resources to buy something
     * @param player
     * @param give the material given out
     * @param quantity the total number of resource needed
     */
    Exchange.prototype.checkResources = function (player, give, quantity) {
        // TODO : uncomment and fix
        if (give === Benefit_1.Material.Power)
            return player.power.bowl3 >= quantity;
        if (give === Benefit_1.Material.Ore)
            return player.ore >= quantity;
        if (give === Benefit_1.Material.QIC)
            return player.qic >= quantity;
        if (give === Benefit_1.Material.Science)
            return player.science >= quantity;
        console.log("material not found");
        return false;
    };
    return Exchange;
}());
exports.Exchange = Exchange;
