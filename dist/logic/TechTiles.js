"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Benefit_1 = require("./Benefit");
var TechTile = /** @class */ (function () {
    function TechTile(techId) {
        this.techId = techId;
    }
    /**
     * get the techId
     */
    TechTile.prototype.getId = function () {
        return this.techId;
    };
    /**
     * when get a normal techtile
     * get something or get some power
     * @param player
     */
    TechTile.prototype.onTechTile = function (player) {
        //    let b1 = null;
        //    if(this.techId === 0){
        //     //  player.ore += 1;
        //     //  player.QIC += 1;
        //     b1 = new Benefit(Trigger.Now, null, null, [new Value(1, Material.Ore), new Value(1, Material.QIC)]); 
        //    }
        //    if(this.techId === 1){
        //     //  player.science += player.planetTypes.length * 1;
        //     b1 = new Benefit(Trigger.Now, Count.PlanetTypes, null, [new Value(1, Material.Science)]);
        //    }
        //    if(this.techId === 2){
        //     //  player.structure.value.academies = 4;
        //     //  player.structure.value.institute = 4;
        //     player.buildingLib.changeBigBuildingPowerValue(4);
        //    }
        //    if(this.techId === 3){
        //     //  player.VP += 7;
        //      b1 = new Benefit(Trigger.Now, null, null, [new Value(7, Material.VP)]);
        //    }
        //    if(this.techId === 4){
        //     //  player.income.ore += 1;
        //     //  player.income.charge += 1;
        //      b1 = new Benefit(Trigger.Income, null, null, [new Value(1, Material.Ore), new Value(1, Material.Power)]);
        //    }
        //    if(this.techId === 5){
        //     //  player.income.science += 1;
        //     //  player.income.gold += 1;
        //     b1 = new Benefit(Trigger.Income, null, null, [new Value(1, Material.Science), new Value(1, Material.Gold)]);
        //    }
        //    if(this.techId === 6){
        //      //everytime player build a mine, get 3 VP;
        //      b1 = new Benefit(Trigger.Build, null, Structure.MineOnGaia, [new Value(3, Material.VP)]);
        //    }
        //    if(this.techId ===7){
        //     //  player.income.gold += 4;
        //     b1 = new Benefit(Trigger.Income, null, null, [new Value(4, Material.Gold)]);
        //    }
        //    if(this.techId === 8){
        //      //power: can charge 4 power, everyturn
        //      b1 = new Benefit(Trigger.Special, null, null, [new Value(4, Material.Power)]);
        //    }
        //    if(b1 != null) player.getBenefit(b1);
    };
    /*
    when get an advance techtile, player need to cover a normal techtile,
    the normal techtile will not work
    */
    TechTile.prototype.offTechTile = function (player, techId) {
    };
    TechTile.prototype.onAdvanceTechTile = function (player, offTechId) {
        this.offTechTile(player, offTechId); //turn off the normal techtile;
        var adTechId = this.techId;
        var b1 = null;
        if (adTechId === 0) {
            //every cleanup phase: player.VP += 3 * number of federation;
            b1 = new Benefit_1.Benefit(5 /* Pass */, Benefit_1.Count.Feds, null, [new Benefit_1.Value(3, Benefit_1.Material.VP)]);
        }
        if (adTechId === 1) {
            //everytime update tech +2 VP;
            b1 = new Benefit_1.Benefit(7 /* ScienceUp */, null, null, [new Benefit_1.Value(2, Benefit_1.Material.VP)]);
        }
        if (adTechId === 2) {
            //get ability: every turn, +1 QIC +5 gold;
            b1 = new Benefit_1.Benefit(6 /* Special */, null, null, [new Benefit_1.Value(1, Benefit_1.Material.QIC), new Benefit_1.Value(5, Benefit_1.Material.Gold)]);
        }
        if (adTechId === 3) {
            //player.VP += number of mine * 2;
            b1 = new Benefit_1.Benefit(0 /* Now */, Benefit_1.Count.Mines, null, [new Benefit_1.Value(2, Benefit_1.Material.VP)]);
        }
        if (adTechId === 4) {
            //every cleanup phase: player.VP += 3 * number of lab;
            b1 = new Benefit_1.Benefit(5 /* Pass */, Benefit_1.Count.Labs, null, [new Benefit_1.Value(3, Benefit_1.Material.VP)]);
        }
        if (adTechId === 5) {
            //player.ore += 1 * player.number of sector
            b1 = new Benefit_1.Benefit(0 /* Now */, Benefit_1.Count.Sectors, null, [new Benefit_1.Value(1, Benefit_1.Material.Ore)]);
        }
        if (adTechId === 6) {
            //every cleanup phase: player.VP += 1 * player.planetTypes.length;
            b1 = new Benefit_1.Benefit(5 /* Pass */, Benefit_1.Count.PlanetTypes, null, [new Benefit_1.Value(1, Benefit_1.Material.VP)]);
        }
        if (adTechId === 7) {
            //  player.VP += 2 * player.numGaia;
            b1 = new Benefit_1.Benefit(0 /* Now */, Benefit_1.Count.Gaia, null, [new Benefit_1.Value(2, Benefit_1.Material.VP)]);
        }
        if (adTechId === 8) {
            //player.VP += 4 * player.number of station;
            b1 = new Benefit_1.Benefit(0 /* Now */, Benefit_1.Count.TradingStations, null, [new Benefit_1.Value(4, Benefit_1.Material.VP)]);
        }
        if (adTechId === 9) {
            //player.VP += 2 * number of sectors;
            b1 = new Benefit_1.Benefit(0 /* Now */, Benefit_1.Count.Sectors, null, [new Benefit_1.Value(2, Benefit_1.Material.VP)]);
        }
        if (adTechId === 10) {
            //get ability: +3 ore;
            b1 = new Benefit_1.Benefit(6 /* Special */, null, null, [new Benefit_1.Value(3, Benefit_1.Material.Ore)]);
        }
        if (adTechId === 11) {
            //player.VP += 5 * number of federation;
            b1 = new Benefit_1.Benefit(0 /* Now */, Benefit_1.Count.Feds, null, [new Benefit_1.Value(5, Benefit_1.Material.VP)]);
        }
        if (adTechId === 12) {
            //get ability: +3 science;
            b1 = new Benefit_1.Benefit(6 /* Special */, null, null, [new Benefit_1.Value(3, Benefit_1.Material.Science)]);
        }
        if (adTechId === 13) {
            //every time build mine: +3 VP;
            b1 = new Benefit_1.Benefit(3 /* Build */, null, Benefit_1.Structure.Mine, [new Benefit_1.Value(3, Benefit_1.Material.VP)]);
        }
        if (adTechId === 14) {
            //every time build station: +3 VP;
            b1 = new Benefit_1.Benefit(3 /* Build */, null, Benefit_1.Structure.TradingStation, [new Benefit_1.Value(3, Benefit_1.Material.VP)]);
        }
        if (b1 != null)
            player.getBenefit(b1);
    };
    return TechTile;
}());
exports.default = TechTile;
