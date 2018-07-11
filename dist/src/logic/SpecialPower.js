import { Benefit, Count, Structure, Material, Value } from "./Benefit";
var SpecialPower = /** @class */ (function () {
    function SpecialPower(id) {
        if (id === 0 /* QIC1 */) {
            this.id = id;
            this.benefit = new Benefit(6 /* Special */, Count.None, Structure.None, [new Value(1, Material.QIC)]);
            this.activated = false;
            this.activated = false;
        }
        if (id === 1 /* Dig1 */) {
            this.id = id;
            this.benefit = new Benefit(6 /* Special */, Count.None, Structure.None, [new Value(1, Material.SpecialDig)]);
            this.activated = false;
            this.activated = false;
        }
        if (id === 2 /* SpecialRange3 */) {
            this.id = id;
            this.benefit = new Benefit(6 /* Special */, Count.None, Structure.None, [new Value(3, Material.SpecialRange)]);
            this.activated = false;
            this.activated = false;
        }
        if (id === 3 /* Power4 */) {
            this.id = id;
            this.benefit = new Benefit(6 /* Special */, Count.None, Structure.None, [new Value(4, Material.Power)]);
            this.activated = false;
            this.activated = false;
        }
        if (id === 4 /* QIC1Gold5 */) {
            this.id = id;
            this.benefit = new Benefit(6 /* Special */, Count.None, Structure.None, [new Value(1, Material.QIC), new Value(5, Material.Gold)]);
            this.activated = false;
            this.activated = false;
        }
        if (id === 5 /* Ore3 */) {
            this.id = id;
            this.benefit = new Benefit(6 /* Special */, Count.None, Structure.None, [new Value(3, Material.Ore)]);
            this.activated = false;
            this.activated = false;
        }
        if (id === 6 /* Science3 */) {
            this.id = id;
            this.benefit = new Benefit(6 /* Special */, Count.None, Structure.None, [new Value(3, Material.Science)]);
            this.activated = false;
            this.activated = false;
        }
    }
    /**
     * when you get the special power, activate it and make it available;
     */
    SpecialPower.prototype.activatePower = function () {
        if (this.activated === true) {
            console.log("special power already activated");
            return;
        }
        this.activated = true;
        this.available = true;
    };
    /**
     * when you get an advance techtile, you may need to turn off some kind of special power
     */
    SpecialPower.prototype.turnOffPower = function () {
        if (this.activated === false) {
            console.log("special power is already off");
            return;
        }
        this.activated = false;
        this.available = false;
    };
    SpecialPower.prototype.usePower = function (player) {
        if (this.activated === false) {
            console.log("special power is not activated, you can not use it");
            return;
        }
        if (this.available === false) {
            console.log("you have already used this power, wait for the nxt turn");
            return;
        }
        var values = this.benefit.benefits;
        var i = 0;
        var value;
        for (; i < values.length; i++) {
            value = values[i];
            if (value.material === Material.Gold) {
                player.gold += value.quantity;
            }
            if (value.material === Material.Ore) {
                player.ore += value.quantity;
            }
            if (value.material === Material.Science) {
                player.science += value.quantity;
            }
            if (value.material === Material.QIC) {
                player.qic += value.quantity;
            }
            if (value.material === Material.Power) {
                player.power1 += value.quantity;
            }
            if (value.material === Material.Power) {
                player.chargePower(value.quantity);
            }
            if (value.material === Material.Dig) { /*lets discuss player part later --- by yalei*/ }
            if (value.material === Material.VP) {
                player.vp += value.quantity;
            }
            if (value.material === Material.SpecialDig) { /*what is the special dig? ---by yalei*/ }
            if (value.material === Material.SpecialRange) {
                player.specialRange += value.quantity;
            }
            if (value.material === Material.GaiaFormer) {
                player.gaiaformer += value.quantity;
            }
        }
        this.available = false;
    };
    /**
     * every beginning of the turn the power will turn available
     */
    SpecialPower.prototype.recoverPower = function () {
        this.available = true;
    };
    return SpecialPower;
}());
export { SpecialPower };
