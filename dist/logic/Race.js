"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Race base class. Every race shares similar base
 * initialization aspects which are included here
 * race will have income from many places, including
 * build board
 * permanent income from build board
 * tech tiles
 * round boosters
 * tech tracks
 *
 */
var Race = /** @class */ (function () {
    function Race() {
        this.power = {
            bowl1: 2,
            bowl2: 4,
            bowl3: 0,
            gaia: 0
        };
        // this buildBoard holds the benefits that are unlocked at each step
        this.buildBoard = {
            mines: [],
            stations: [],
            institutes: [],
            labs: [],
            academies: []
        };
        this.vp = 10;
        this.gold = 15;
        this.ore = 4;
        this.science = 3;
        this.qic = 1;
        this.gaiaformer = 0;
        // set up the buildboard
        this.setUpBuildBoard();
        this.range = 1; // how far you can jump
    }
    Race.prototype.setUpBuildBoard = function () {
        // this.buildBoard.mines.push()
    };
    /*
        use the "charge power" mechanic to push
        power aka energy around the bowl system
        gaia bowl and "burning power" mechanics are
        handled in other methods
    */
    Race.prototype.chargePower = function (charge) {
        var amount = charge;
        // move the lesser of the amount to charge or all of bowl 1
        // this will also work when there's zero in bowl 1
        if (charge > this.power.bowl1) {
            amount = this.power.bowl1;
        }
        this.power.bowl2 += amount;
        this.power.bowl1 -= amount;
        charge -= amount;
        // now do bowl2 -> bowl3
        amount = charge;
        if (charge > this.power.bowl2) {
            amount = this.power.bowl2;
        }
        this.power.bowl3 += amount;
        this.power.bowl2 -= amount;
        charge -= amount;
    };
    Race.prototype.addPower = function (extra) {
        this.power.bowl1 += extra;
    };
    /*
    * spend the power to get something
    * this function only consume power
    * @yalei;
    */
    Race.prototype.spendPower = function (charge) {
        if (this.power.bowl3 < charge) {
            throw new Error("SPEND POWER ERROR: " + charge + " is greater than " + this.power.bowl3);
        }
        this.power.bowl3 -= charge;
        this.power.bowl1 += charge;
    };
    return Race;
}());
exports.Race = Race;
