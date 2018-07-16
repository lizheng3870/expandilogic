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
    }
    /**
     * the function to make a particular times of trade;
     * @param player the player who does the trade;
     * @param give the material given out;
     * @param get the material get;
     * @param times the times of trade
     */
    Exchange.prototype.trade = function (player, give, get, times) {
        var good = null;
        // find the type of trading
        for (var i = 0; i < this.exchanges.length; i++) {
            if (this.exchanges[i].give === give && this.exchanges[i].get === get) {
                good = this.exchanges[i];
                break;
            }
        }
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
        if (get === Benefit_1.Material.Gold)
            player.gold += totalGet;
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
        // if(give === Material.Power) return player.power3 >= quantity;
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
