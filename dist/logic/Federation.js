// import {Race, RaceType} from './Race'
// import {Benefit, Value, Material, Count, Struct, Trigger} from './Benefit'
// import {MapBoard} from './MapBoard'
// enum Fed{
//   12vp,
//   8vp1qic,
//   8vp2pw,
//   7vp2ore,
//   7vp6gold,
//   6vp2klgs,
//   1ore1klg2gold
// }
// todo rename a better name like VP VP
var Fed;
(function (Fed) {
    Fed[Fed["vp12"] = 0] = "vp12";
    Fed[Fed["vp8qic1"] = 1] = "vp8qic1";
    Fed[Fed["vp8pw2"] = 2] = "vp8pw2";
    Fed[Fed["vp7ore2"] = 3] = "vp7ore2";
    Fed[Fed["vp7gold6"] = 4] = "vp7gold6";
    Fed[Fed["vp62klgs"] = 5] = "vp62klgs";
    Fed[Fed["ore1klg1gold2"] = 6] = "ore1klg1gold2";
})(Fed || (Fed = {}));
var Federation = /** @class */ (function () {
    //public types : ?
    function Federation() {
        // if(race === 'Gleens'){
        //   addFed(6);//if race is gleens, automatically gains this.
        // }
    }
    Federation.prototype.initialize = function () {
        for (var i = 1; i < 7; i++) {
            //  types[i].side = 'green'; //the 12vp one has both sides gray.
        }
        // hasFed = [];  // missing this
        // this.count = 0;
    };
    /*
    * Check if the points are enough for federating, and that they are
    * next to each other or connected by sattelites.
    */
    // public checkValid(input: string){
    //   //points === 0;
    //   //input is 'cancel' or hex
    //   while(input !== 'cancel' && points <= 7){
    //     selectBuildings();
    //   }
    //   connectBySatellites();
    //   chooseFedType();//that fed type is still available in the store
    // }
    Federation.prototype.selectBuildings = function (hex, pid) {
        //getHexInfo from yousong's mapboard class
        //if the building's owner is your
        //and points are enough
    };
    // todo why this?  is this refer to player?
    Federation.prototype.addFed = function (fed) {
        // if(fed === 'vp'){
        //   const benefit  = new Benefit(Trigger.Fed, null, null,
        //       [new Value(12, Material.VP)]);
        //   this.benefit.push(benefit)
        // }
        // if(fed === 'vp1qic'){
        //   const benefit  = new Benefit(Trigger.Fed, null, null,
        //       [new Value(8, Material.VP), new Value(1, Material.QIC)]);
        //   this.benefit.push(benefit)
        // }
        // if(fed === 'vp2pw'){
        //   const benefit  = new Benefit(Trigger.Fed, null, null,
        //       [new Value(8, Material.VP), new Value(2, Material.Power)]);
        //   this.benefit.push(benefit)
        // }
        // if(fed === 'vp2ore'){
        //   const benefit  = new Benefit(Trigger.Fed, null, null,
        //       [new Value(7, Material.VP), new Value(2, Material.Ore)]);
        //   this.benefit.push(benefit)
        // }
        // if(fed === 'vp6gold'){
        //   const benefit  = new Benefit(Trigger.Fed, null, null,
        //       [new Value(7, Material.VP), new Value(6, Material.Gold)]);
        //   this.benefit.push(benefit)
        // }
        // if(fed === 'vp2klgs'){
        //   const benefit  = new Benefit(Trigger.Fed, null, null,
        //       [new Value(6, Material.VP), new Value(2, Material.Science)]);
        //   this.benefit.push(benefit)
        // }
        // if(fed === 'ore1klg2gold'){
        //   const benefit  = new Benefit(Trigger.Fed, null, null,
        //       [new Value(1, Material.Ore), new Value(1, Material.Science), new Value(2, Material.Gold)]);
        //   this.benefit.push(benefit)
        // }
    };
    return Federation;
}());
export { Federation, Fed };
//# sourceMappingURL=Federation.js.map