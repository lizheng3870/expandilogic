"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Benefit_1 = require("./Benefit");
var Tech = /** @class */ (function () {
    /**
     * each square of technology in the tech board would have the this.lane and this.level to stand for its position
     * @param this.lane the type of technology
     * @param this.level the this.level of technology
     */
    function Tech(lane, level) {
        this.lane = lane;
        this.level = level;
    }
    /**
     * update and get the benefit
     * @param player the player who do the update
     */
    Tech.prototype.update = function (player) {
        // console.log("the lane is: " + this.lane + "; the level is: " + this.level);
        if (this.level === 3) {
            //player.chargePower(3);
            var b1 = new Benefit_1.Benefit(0 /* Now */, null, null, [new Benefit_1.Value(3, Benefit_1.Material.Power)]);
            player.getBenefit(b1);
        }
        var b2 = null;
        //dig
        if (this.lane === 0) {
            if (this.level === 1) {
                b2 = new Benefit_1.Benefit(0 /* Now */, null, null, [new Benefit_1.Value(2, Benefit_1.Material.Ore)]);
            }
            if (this.level === 2) {
                player.digCost = 2;
            }
            if (this.level === 3) {
                player.digCost = 1;
            }
            if (this.level === 4) {
                b2 = new Benefit_1.Benefit(0 /* Now */, null, null, [new Benefit_1.Value(2, Benefit_1.Material.Ore)]);
            }
            //if(this.level == 5) // player.getFedaration();
        }
        //range
        if (this.lane === 1) {
            if (this.level === 1) {
                b2 = new Benefit_1.Benefit(0 /* Now */, null, null, [new Benefit_1.Value(1, Benefit_1.Material.QIC)]);
            }
            if (this.level === 2) {
                player.range = 2;
            }
            if (this.level === 3) {
                b2 = new Benefit_1.Benefit(0 /* Now */, null, null, [new Benefit_1.Value(1, Benefit_1.Material.QIC)]);
            }
            if (this.level === 4) {
                player.range = 3;
            }
            if (this.level === 5) {
                player.range = 4;
                //player.getLostPlanet();
            }
        }
        //qic
        if (this.lane === 2) {
            if (this.level === 1) {
                b2 = new Benefit_1.Benefit(0 /* Now */, null, null, [new Benefit_1.Value(1, Benefit_1.Material.QIC)]);
            }
            if (this.level === 2) {
                b2 = new Benefit_1.Benefit(0 /* Now */, null, null, [new Benefit_1.Value(1, Benefit_1.Material.QIC)]);
            }
            if (this.level === 3) {
                b2 = new Benefit_1.Benefit(0 /* Now */, null, null, [new Benefit_1.Value(2, Benefit_1.Material.QIC)]);
            }
            if (this.level === 4) {
                b2 = new Benefit_1.Benefit(0 /* Now */, null, null, [new Benefit_1.Value(2, Benefit_1.Material.QIC)]);
            }
            if (this.level === 5) {
                b2 = new Benefit_1.Benefit(0 /* Now */, null, null, [new Benefit_1.Value(4, Benefit_1.Material.QIC)]);
            }
        }
        //gaia
        if (this.lane === 3) {
            if (this.level === 1) {
                b2 = new Benefit_1.Benefit(0 /* Now */, null, null, [new Benefit_1.Value(1, Benefit_1.Material.GaiaFormer)]);
            }
            if (this.level === 2) {
                b2 = new Benefit_1.Benefit(0 /* Now */, null, null, [new Benefit_1.Value(3, Benefit_1.Material.Power)]);
            }
            if (this.level === 3) {
                b2 = new Benefit_1.Benefit(0 /* Now */, null, null, [new Benefit_1.Value(1, Benefit_1.Material.GaiaFormer)]);
                player.gaiaFormingCost = 4;
            }
            if (this.level === 4) {
                b2 = new Benefit_1.Benefit(0 /* Now */, null, null, [new Benefit_1.Value(1, Benefit_1.Material.GaiaFormer)]);
                player.gaiaFormingCost = 3;
            }
            if (this.level === 5) {
                b2 = new Benefit_1.Benefit(0 /* Now */, Benefit_1.Count.Gaia, null, [new Benefit_1.Value(1, Benefit_1.Material.VP)]);
                var b3 = new Benefit_1.Benefit(0 /* Now */, null, null, [new Benefit_1.Value(4, Benefit_1.Material.VP)]);
                player.getBenefit(b3);
            }
        }
        //income
        if (this.lane === 4) {
            if (this.level === 1) {
                b2 = new Benefit_1.Benefit(4 /* Income */, null, null, [new Benefit_1.Value(2, Benefit_1.Material.Gold), new Benefit_1.Value(1, Benefit_1.Material.Power)]);
            }
            if (this.level === 2) {
                b2 = new Benefit_1.Benefit(4 /* Income */, null, null, [new Benefit_1.Value(1, Benefit_1.Material.Ore), new Benefit_1.Value(1, Benefit_1.Material.Power)]);
            }
            if (this.level === 3) {
                b2 = new Benefit_1.Benefit(4 /* Income */, null, null, [new Benefit_1.Value(1, Benefit_1.Material.Gold), new Benefit_1.Value(1, Benefit_1.Material.Power)]);
            }
            if (this.level === 4) {
                b2 = new Benefit_1.Benefit(4 /* Income */, null, null, [new Benefit_1.Value(1, Benefit_1.Material.Ore), new Benefit_1.Value(1, Benefit_1.Material.Gold), new Benefit_1.Value(1, Benefit_1.Material.Power)]);
            }
            if (this.level === 5) {
                b2 = new Benefit_1.Benefit(4 /* Income */, null, null, [new Benefit_1.Value(-2, Benefit_1.Material.Ore), new Benefit_1.Value(-4, Benefit_1.Material.Gold), new Benefit_1.Value(-4, Benefit_1.Material.Power)]);
                var b3 = new Benefit_1.Benefit(0 /* Now */, null, null, [new Benefit_1.Value(3, Benefit_1.Material.Ore), new Benefit_1.Value(6, Benefit_1.Material.Gold), new Benefit_1.Value(6, Benefit_1.Material.Power)]);
                player.getBenefit(b3);
            }
        }
        //science
        if (this.lane === 5) {
            if (this.level === 1) {
                b2 = new Benefit_1.Benefit(4 /* Income */, null, null, [new Benefit_1.Value(1, Benefit_1.Material.Science)]);
            }
            if (this.level === 2) {
                b2 = new Benefit_1.Benefit(4 /* Income */, null, null, [new Benefit_1.Value(1, Benefit_1.Material.Science)]);
            }
            if (this.level === 3) {
                b2 = new Benefit_1.Benefit(4 /* Income */, null, null, [new Benefit_1.Value(1, Benefit_1.Material.Science)]);
            }
            if (this.level === 4) {
                b2 = new Benefit_1.Benefit(4 /* Income */, null, null, [new Benefit_1.Value(1, Benefit_1.Material.Science)]);
            }
            if (this.level === 5) {
                b2 = new Benefit_1.Benefit(4 /* Income */, null, null, [new Benefit_1.Value(-4, Benefit_1.Material.Science)]);
                var b3 = new Benefit_1.Benefit(0 /* Now */, null, null, [new Benefit_1.Value(9, Benefit_1.Material.Science)]);
                player.getBenefit(b3);
            }
        }
        if (b2 !== null) {
            // console.log("tech benefit is passing");
            player.getBenefit(b2);
        }
        // console.log("tech benefit is null");
    };
    return Tech;
}());
exports.default = Tech;
