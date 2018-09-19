"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import Income from './Income'
var Benefit_1 = require("./Benefit");
var RoundBooster = /** @class */ (function () {
    function RoundBooster(id) {
        this.valid = true;
        this.benefit = [];
        this.initialize(id);
    }
    RoundBooster.prototype.initialize = function (id) {
        this.id = id;
        if (id === 0) {
            var benefit = new Benefit_1.Benefit(4 /* Income */, null, null, [new Benefit_1.Value(1, Benefit_1.Material.Ore), new Benefit_1.Value(1, Benefit_1.Material.Science)]);
            this.benefit.push(benefit);
            // this.income.ore = 1;
            // this.income.science = 1;
        }
        //
        if (id === 1) {
            var benefit = new Benefit_1.Benefit(4 /* Income */, null, null, [new Benefit_1.Value(2, Benefit_1.Material.Gold), new Benefit_1.Value(1, Benefit_1.Material.QIC)]);
            this.benefit.push(benefit);
            // this.income.gold = 2;
            // this.income.QIC = 1;
        }
        if (id === 2) {
            var benefit = new Benefit_1.Benefit(4 /* Income */, null, null, [new Benefit_1.Value(2, Benefit_1.Material.Power), new Benefit_1.Value(1, Benefit_1.Material.Ore)]);
            this.benefit.push(benefit);
            // this.income.power = 2; // gain of two power tokens
            // this.income.ore = 1;
        }
        /**
         * @Rong I changed this to two benefits. Because one is a special benefit and the other is
         * an income benefit
         */
        if (id === 3) {
            var benefit = new Benefit_1.Benefit(4 /* Income */, null, null, [new Benefit_1.Value(2, Benefit_1.Material.Gold)]);
            var benefit2 = new Benefit_1.Benefit(6 /* Special */, null, null, [new Benefit_1.Value(1, Benefit_1.Material.Dig)]);
            this.benefit.push(benefit);
            this.benefit.push(benefit2);
            //this.benefit.push(benefit)
            // this.income.Power = 2; //Power of two power tokens
            // this.benefit.range = 3;
        }
        /**
         * @Rong I changed this to two benefits. Because one is a special benefit and the other is
         * an income benefit
         */
        if (id === 4) {
            var benefit = new Benefit_1.Benefit(4 /* Income */, null, null, [new Benefit_1.Value(2, Benefit_1.Material.Power)]);
            var benefit2 = new Benefit_1.Benefit(6 /* Special */, null, null, [new Benefit_1.Value(3, Benefit_1.Material.SpecialRange)]);
            this.benefit.push(benefit);
            this.benefit.push(benefit2);
        }
        /**
         * When you return this round booster by taking the “Pass” action,
         * gain 1 VP for each of your mines on the board
         */
        if (id === 5) {
            var benefit = new Benefit_1.Benefit(4 /* Income */, null, null, [new Benefit_1.Value(1, Benefit_1.Material.Ore)]);
            this.benefit.push(benefit);
            var benefit2 = new Benefit_1.Benefit(5 /* Pass */, Benefit_1.Count.Mines, null, [new Benefit_1.Value(1, Benefit_1.Material.VP)]);
            this.benefit.push(benefit2);
        }
        /**
         * When you return this round booster by taking the “Pass” action,
         * gain 3 VP for each of your research labs on the board.
         */
        if (id === 6) {
            var benefit = new Benefit_1.Benefit(4 /* Income */, null, null, [new Benefit_1.Value(1, Benefit_1.Material.Science)]);
            this.benefit.push(benefit);
            var benefit2 = new Benefit_1.Benefit(5 /* Pass */, Benefit_1.Count.Labs, null, [new Benefit_1.Value(3, Benefit_1.Material.VP)]);
            this.benefit.push(benefit2);
        }
        /**
         * When you return this round booster by taking the “Pass” action,
         * gain 2 VP for each of your trading stations on the board.
         */
        if (id === 7) {
            var benefit = new Benefit_1.Benefit(4 /* Income */, null, null, [new Benefit_1.Value(1, Benefit_1.Material.Ore)]);
            this.benefit.push(benefit);
            var benefit2 = new Benefit_1.Benefit(5 /* Pass */, Benefit_1.Count.TradingStations, null, [new Benefit_1.Value(2, Benefit_1.Material.VP)]);
            this.benefit.push(benefit2);
            // Free terraforming step ----? Rong
        }
        /**
         *  When you return this round booster by taking the “Pass” action,
         * gain 4 VP for each of your planetary institutes and academies on the board.
         *
         */
        if (id === 8) {
            var benefit = new Benefit_1.Benefit(4 /* Income */, null, null, [new Benefit_1.Value(4, Benefit_1.Material.Power)]);
            this.benefit.push(benefit);
            var benefit2 = new Benefit_1.Benefit(5 /* Pass */, Benefit_1.Count.BigBuildings, null, [new Benefit_1.Value(4, Benefit_1.Material.VP)]);
            this.benefit.push(benefit2);
        }
        /**
         * When you return this round booster by taking the “Pass” action, gain 1 VP for each Gaia Planet you have colonized
         * (you do not gain VP for Gaiaformers on Gaia or Transdim Planets).
         */
        if (id === 9) {
            var benefit = new Benefit_1.Benefit(4 /* Income */, null, null, [new Benefit_1.Value(4, Benefit_1.Material.Gold)]);
            this.benefit.push(benefit);
            var benefit2 = new Benefit_1.Benefit(5 /* Pass */, Benefit_1.Count.Gaia, null, [new Benefit_1.Value(1, Benefit_1.Material.VP)]);
            this.benefit.push(benefit2);
        }
    };
    return RoundBooster;
}());
exports.default = RoundBooster;
