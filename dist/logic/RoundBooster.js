//import Income from './Income'
import { Benefit, Value, Material, Count } from './Benefit';
var RoundBooster = /** @class */ (function () {
    function RoundBooster(id) {
        this.valid = true;
        this.benefit = [];
        this.initialize(id);
    }
    RoundBooster.prototype.initialize = function (id) {
        this.id = id;
        if (id === 0) {
            var benefit = new Benefit(4 /* Income */, null, null, [new Value(1, Material.Ore), new Value(1, Material.Science)]);
            this.benefit.push(benefit);
            // this.income.ore = 1;
            // this.income.science = 1;
        }
        if (id === 1) {
            var benefit = new Benefit(4 /* Income */, null, null, [new Value(2, Material.Gold), new Value(1, Material.QIC)]);
            this.benefit.push(benefit);
            // this.income.gold = 2;
            // this.income.QIC = 1;
        }
        if (id === 2) {
            var benefit = new Benefit(4 /* Income */, null, null, [new Value(2, Material.Power), new Value(1, Material.Ore)]);
            this.benefit.push(benefit);
            // this.income.power = 2; // gain of two power tokens
            // this.income.ore = 1;
        }
        if (id === 3) {
            var benefit = new Benefit(4 /* Income */, null, null, [new Value(2, Material.Gold), new Value(1, Material.SpecialDig)]);
            this.benefit.push(benefit);
            //this.benefit.push(benefit)
            // this.income.charge = 2; //charge of two power tokens
            // this.benefit.range = 3;
        }
        if (id === 4) {
            var benefit = new Benefit(4 /* Income */, null, null, [new Value(2, Material.Power), new Value(1, Material.SpecialRange)]);
            this.benefit.push(benefit);
            // When you return this round booster by taking the “Pass” action,
            // gain 1 VP for each of your mines on the board
        }
        if (id === 5) {
            var benefit = new Benefit(4 /* Income */, null, null, [new Value(1, Material.Ore)]);
            this.benefit.push(benefit);
            var benefit2 = new Benefit(5 /* Pass */, Count.Mines, null, [new Value(1, Material.VP)]);
            this.benefit.push(benefit2);
            // When you return this round booster by taking the “Pass” action,
            // gain 3 VP for each of your research labs on the board.
        }
        if (id === 6) {
            var benefit = new Benefit(4 /* Income */, null, null, [new Value(1, Material.Science)]);
            this.benefit.push(benefit);
            var benefit2 = new Benefit(5 /* Pass */, Count.Labs, null, [new Value(3, Material.VP)]);
            this.benefit.push(benefit2);
            // When you return this round booster by taking the “Pass” action,
            // gain 2 VP for each of your trading stations on the board.
        }
        /*
    
        enum Count {
            Sectors = 'sectors',
            Mines = 'mines',
            TradingStations = 'tradingstations',
            Labs = 'labs',
            BigBuildings = 'bigbuildings',
            Feds = 'feds',
            PlanetTypes = 'planetTypes',
            Satellites = 'satellites',
            Gaia = 'gaia'
        }
    
        enum Struct {
            Mine = 'mine',
            TradingStation = 'trading',
            Lab = 'Lab',
            BigBuildings = 'bigbuildings',
            Academy = 'academy',
            Institute = 'institute'
        }
        */
        if (id === 7) {
            var benefit = new Benefit(4 /* Income */, null, null, [new Value(1, Material.Ore)]);
            this.benefit.push(benefit);
            var benefit2 = new Benefit(5 /* Pass */, Count.TradingStations, null, [new Value(2, Material.VP)]);
            this.benefit.push(benefit2);
            // Free terraforming step
        }
        if (id === 8) {
            var benefit = new Benefit(4 /* Income */, null, null, [new Value(4, Material.Power)]);
            this.benefit.push(benefit);
            var benefit2 = new Benefit(5 /* Pass */, Count.BigBuildings, null, [new Value(4, Material.VP)]);
            this.benefit.push(benefit2);
            // When you return this round booster by taking the “Pass” action,
            // gain 4 VP for each of your planetary institutes and academies on the board.
        }
        if (id === 9) {
            var benefit = new Benefit(4 /* Income */, null, null, [new Value(4, Material.Gold)]);
            this.benefit.push(benefit);
            var benefit2 = new Benefit(5 /* Pass */, Count.Gaia, null, [new Value(1, Material.VP)]);
            this.benefit.push(benefit2);
            // When you return this round booster by taking the “Pass” action, gain 1 VP for each Gaia Planet you have colonized
            // (you do not gain VP for Gaiaformers on Gaia or Transdim Planets).
        }
    };
    return RoundBooster;
}());
export default RoundBooster;
//# sourceMappingURL=RoundBooster.js.map