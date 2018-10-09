"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Exchange_1 = require("./Exchange");
exports.Merchandise = Exchange_1.Merchandise;
var Benefit_1 = require("./Benefit");
var StoreMerchandiseType;
(function (StoreMerchandiseType) {
    StoreMerchandiseType[StoreMerchandiseType["Pw7sci3"] = 0] = "Pw7sci3";
    StoreMerchandiseType[StoreMerchandiseType["Pw5dig2"] = 1] = "Pw5dig2";
    StoreMerchandiseType[StoreMerchandiseType["Pw4ore2"] = 2] = "Pw4ore2";
    StoreMerchandiseType[StoreMerchandiseType["Pw4gold7"] = 3] = "Pw4gold7";
    StoreMerchandiseType[StoreMerchandiseType["Pw4sci2"] = 4] = "Pw4sci2";
    StoreMerchandiseType[StoreMerchandiseType["Pw3dig1"] = 5] = "Pw3dig1";
    StoreMerchandiseType[StoreMerchandiseType["Pw3pw2"] = 6] = "Pw3pw2";
    // missing 3 QIC item
    StoreMerchandiseType[StoreMerchandiseType["qic2vp"] = 7] = "qic2vp";
    StoreMerchandiseType[StoreMerchandiseType["qic3fed"] = 8] = "qic3fed";
    StoreMerchandiseType[StoreMerchandiseType["qic4tile"] = 9] = "qic4tile";
})(StoreMerchandiseType || (StoreMerchandiseType = {}));
exports.StoreMerchandiseType = StoreMerchandiseType;
/**
 * Store.ts
 * this class is the store on the tech board. It gives a discount on regular exchange
 */
var Store = /** @class */ (function () {
    function Store() {
        // qic item
        this.qic2vp = new Exchange_1.Merchandise(Benefit_1.Material.QIC, Benefit_1.Material.VP, 2, 3);
        this.qic2vp.available = true;
        this.qic3fed = new Exchange_1.Merchandise(Benefit_1.Material.QIC, Benefit_1.Material.Feds, 3, 1);
        this.qic3fed.available = true;
        this.qic4tile = new Exchange_1.Merchandise(Benefit_1.Material.QIC, Benefit_1.Material.techtile, 4, 1);
        this.qic4tile.available = true;
        this.pw7sci3 = new Exchange_1.Merchandise(Benefit_1.Material.Power, Benefit_1.Material.Science, 7, 3);
        this.pw7sci3.available = true;
        this.pw5dig2 = new Exchange_1.Merchandise(Benefit_1.Material.Power, Benefit_1.Material.Dig, 5, 2);
        this.pw5dig2.available = true;
        this.pw4ore2 = new Exchange_1.Merchandise(Benefit_1.Material.Power, Benefit_1.Material.Ore, 4, 2);
        this.pw4ore2.available = true;
        this.pw4gold7 = new Exchange_1.Merchandise(Benefit_1.Material.Power, Benefit_1.Material.Gold, 4, 7);
        this.pw4gold7.available = true;
        this.pw4sci2 = new Exchange_1.Merchandise(Benefit_1.Material.Power, Benefit_1.Material.Science, 4, 2);
        this.pw4sci2.available = true;
        this.pw3dig1 = new Exchange_1.Merchandise(Benefit_1.Material.Power, Benefit_1.Material.Dig, 3, 1);
        this.pw3dig1.available = true;
        this.pw3pw2 = new Exchange_1.Merchandise(Benefit_1.Material.Power, Benefit_1.Material.ExtraPower, 3, 2);
        this.pw3pw2.available = true;
        //push them all into an array
        this.exchanges = [];
        this.exchanges.push(this.pw7sci3);
        this.exchanges.push(this.pw5dig2);
        this.exchanges.push(this.pw4ore2);
        this.exchanges.push(this.pw4gold7);
        this.exchanges.push(this.pw4sci2);
        this.exchanges.push(this.pw3dig1);
        this.exchanges.push(this.pw3pw2);
        //qic item
        this.exchanges.push(this.qic2vp);
        this.exchanges.push(this.qic3fed);
        this.exchanges.push(this.qic4tile);
    }
    Store.prototype.getGood = function (type) {
        var good = null;
        // find the type of trading
        if (type === StoreMerchandiseType.Pw7sci3) {
            good = this.pw7sci3;
        }
        if (type === StoreMerchandiseType.Pw5dig2) {
            good = this.pw5dig2;
        }
        if (type === StoreMerchandiseType.Pw4ore2) {
            good = this.pw4ore2;
        }
        if (type === StoreMerchandiseType.Pw4gold7) {
            good = this.pw4gold7;
        }
        if (type === StoreMerchandiseType.Pw4sci2) {
            good = this.pw4sci2;
        }
        if (type === StoreMerchandiseType.Pw3dig1) {
            good = this.pw3dig1;
        }
        //qic item
        if (type == StoreMerchandiseType.qic2vp) {
            good = this.qic2vp;
        }
        if (type == StoreMerchandiseType.qic3fed) {
            good = this.qic3fed;
        }
        if (type == StoreMerchandiseType.qic4tile) {
            good = this.qic4tile;
        }
        // last case
        good = this.pw3pw2;
        return good;
    };
    Store.prototype.checkTrade = function (player, type) {
        // must call if
        var good = this.getGood(type);
        var totalGive = good.numGive;
        return player.power.bowl3 > totalGive && good.available;
    };
    // check the qic of player
    Store.prototype.checkQic = function (Player, type) {
        var good = this.getGood(type);
        return Player.qic > good.numGive && good.available;
    };
    Store.prototype.trade = function (player, type) {
        var good = null;
        var get = null;
        // find the type of trading
        if (type === StoreMerchandiseType.Pw7sci3) {
            good = this.pw7sci3;
            get = Benefit_1.Material.Science;
        }
        if (type === StoreMerchandiseType.Pw5dig2) {
            good = this.pw5dig2;
            get = Benefit_1.Material.Dig;
        }
        if (type === StoreMerchandiseType.Pw4ore2) {
            good = this.pw4ore2;
            get = Benefit_1.Material.Ore;
        }
        if (type === StoreMerchandiseType.Pw4gold7) {
            good = this.pw4gold7;
            get = Benefit_1.Material.Gold;
        }
        if (type === StoreMerchandiseType.Pw4sci2) {
            good = this.pw4sci2;
            get = Benefit_1.Material.Science;
        }
        if (type === StoreMerchandiseType.Pw3dig1) {
            good = this.pw3dig1;
            get = Benefit_1.Material.Dig;
        }
        if (type === StoreMerchandiseType.Pw3pw2) {
            good = this.pw3pw2;
            get = Benefit_1.Material.ExtraPower;
        }
        // qic item
        if (type == StoreMerchandiseType.qic2vp) {
            console.log("in the Store");
            good = this.qic2vp;
            get = Benefit_1.Material.VP;
        }
        if (type == StoreMerchandiseType.qic3fed) {
            good = this.qic3fed;
            get = Benefit_1.Material.Feds;
        }
        if (type == StoreMerchandiseType.qic4tile) {
            good = this.qic4tile;
            get = Benefit_1.Material.techtile;
        }
        if (good === null) { // if not find the type of trading
            console.log("merchandise not found");
            return;
        }
        if (good.available === false) { // if the good is used in the same round already
            console.log("merchandise already used");
            return;
        }
        var totalGive = good.numGive;
        var totalGet = good.numGet;
        //check if you have enough resources
        if (type == StoreMerchandiseType.qic2vp || type == StoreMerchandiseType.qic3fed || type == StoreMerchandiseType.qic4tile) {
            console.log("check qic number");
            if (player.qic < totalGive) {
                console.log("not enough qic");
                return;
            }
            // qic action
            player.spendQic(totalGive);
            good.available = false;
            console.log("add vp step");
            if (get == Benefit_1.Material.Feds)
                player.federations += totalGet;
            if (get == Benefit_1.Material.VP)
                player.vp += totalGet + player.numGaia;
            if (get == Benefit_1.Material.techtile)
                player.techTiles += totalGet;
        }
        if (type == StoreMerchandiseType.Pw3dig1 || type == StoreMerchandiseType.Pw3pw2 || type == StoreMerchandiseType.Pw4gold7
            || type == StoreMerchandiseType.Pw4ore2 || type == StoreMerchandiseType.Pw4sci2 || type == StoreMerchandiseType.Pw5dig2
            || type == StoreMerchandiseType.Pw7sci3) {
            if (player.power.bowl3 < totalGive) {
                console.log("not enough resources");
                return;
            }
            player.spendPower(totalGive);
            good.available = false;
            if (get === Benefit_1.Material.QIC)
                player.qic += totalGet;
            if (get === Benefit_1.Material.Ore)
                player.ore += totalGet;
            if (get === Benefit_1.Material.Gold)
                player.gold += totalGet;
            if (get === Benefit_1.Material.Science)
                player.science += totalGet;
            if (get === Benefit_1.Material.Dig)
                player.specialDig += totalGet;
            if (get === Benefit_1.Material.ExtraPower)
                player.power.bowl1 += totalGet;
        }
    };
    return Store;
}());
exports.Store = Store;
