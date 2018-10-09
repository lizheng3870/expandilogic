"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Benefit_1 = require("./Benefit");
var SpecialPower = /** @class */ (function () {
    function SpecialPower(id) {
        if (id === "QIC1         " /* QIC1 */) {
            this.id = id;
            this.benefit = new Benefit_1.Benefit(6 /* Special */, null, null, [new Benefit_1.Value(1, Benefit_1.Material.QIC)]);
            this.ifGet = false;
            this.ifUsable = false;
        }
        if (id === "Dig1         " /* Dig1 */) {
            this.id = id;
            this.benefit = new Benefit_1.Benefit(6 /* Special */, null, null, [new Benefit_1.Value(1, Benefit_1.Material.Dig)]);
            this.ifGet = false;
            this.ifUsable = false;
        }
        if (id === "SpecialRange3" /* SpecialRange3 */) {
            this.id = id;
            this.benefit = new Benefit_1.Benefit(6 /* Special */, null, null, [new Benefit_1.Value(3, Benefit_1.Material.SpecialRange)]);
            this.ifGet = false;
            this.ifUsable = false;
        }
        if (id === "Power4       " /* Power4 */) {
            this.id = id;
            this.benefit = new Benefit_1.Benefit(6 /* Special */, null, null, [new Benefit_1.Value(4, Benefit_1.Material.Power)]);
            this.ifGet = false;
            this.ifUsable = false;
        }
        if (id === "QIC1Gold5    " /* QIC1Gold5 */) {
            this.id = id;
            this.benefit = new Benefit_1.Benefit(6 /* Special */, null, null, [new Benefit_1.Value(1, Benefit_1.Material.QIC), new Benefit_1.Value(5, Benefit_1.Material.Gold)]);
            this.ifGet = false;
            this.ifUsable = false;
        }
        if (id === "Ore3         " /* Ore3 */) {
            this.id = id;
            this.benefit = new Benefit_1.Benefit(6 /* Special */, null, null, [new Benefit_1.Value(3, Benefit_1.Material.Ore)]);
            this.ifGet = false;
            this.ifUsable = false;
        }
        if (id === "Science3     " /* Science3 */) {
            this.id = id;
            this.benefit = new Benefit_1.Benefit(6 /* Special */, null, null, [new Benefit_1.Value(3, Benefit_1.Material.Science)]);
            this.ifGet = false;
            this.ifUsable = false;
        }
    }
    /**
     * when you get the special power, activate it and make it Usable;
     */
    SpecialPower.prototype.activatePower = function () {
        if (this.ifGet === true) {
            console.log("special power already ifGet");
            return;
        }
        this.ifGet = true;
        this.ifUsable = true;
    };
    /**
     * when you get an advance techtile, you may need to turn off some one of special powers
     */
    SpecialPower.prototype.turnOffPower = function () {
        if (this.ifGet === false) {
            console.log("special power is already off");
            return;
        }
        this.ifGet = false;
        this.ifUsable = false;
    };
    SpecialPower.prototype.usePower = function (player) {
        if (this.ifGet === false) {
            console.log("special power is not ifGet, you can not use it");
            return;
        }
        if (this.ifUsable === false) {
            console.log("you have already used this power, wait for the nxt turn");
            return;
        }
        var values = this.benefit.values;
        var i = 0;
        var value;
        for (; i < values.length; i++) {
            value = values[i];
            if (value.material === Benefit_1.Material.Gold) {
                player.gold += value.quantity;
            }
            if (value.material === Benefit_1.Material.Ore) {
                player.ore += value.quantity;
            }
            if (value.material === Benefit_1.Material.Science) {
                player.science += value.quantity;
            }
            if (value.material === Benefit_1.Material.QIC) {
                player.qic += value.quantity;
            }
            if (value.material === Benefit_1.Material.Power) {
                player.power.bowl1 += value.quantity;
            }
            if (value.material === Benefit_1.Material.Power) {
                player.chargePower(value.quantity);
            }
            if (value.material === Benefit_1.Material.Dig) {
                player.specialDig += value.quantity;
            }
            if (value.material === Benefit_1.Material.VP) {
                player.vp += value.quantity;
            }
            if (value.material === Benefit_1.Material.SpecialRange) {
                player.specialRange += value.quantity;
            }
            if (value.material === Benefit_1.Material.GaiaFormer) {
                player.gaiaformer += value.quantity;
            }
        }
        this.ifUsable = false;
    };
    /**
     * every beginning of the turn the power will turn usable
     */
    SpecialPower.prototype.recoverPower = function () {
        if (this.ifGet)
            this.ifUsable = true;
    };
    return SpecialPower;
}());
exports.SpecialPower = SpecialPower;
