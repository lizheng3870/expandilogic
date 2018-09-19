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
        var b1 = null;
        if (this.techId === 0) {
            b1 = new Benefit_1.Benefit(0 /* Now */, null, null, [new Benefit_1.Value(1, Benefit_1.Material.Ore), new Benefit_1.Value(1, Benefit_1.Material.QIC)]);
        }
        if (this.techId === 1) {
            b1 = new Benefit_1.Benefit(0 /* Now */, Benefit_1.Count.PlanetTypes, null, [new Benefit_1.Value(1, Benefit_1.Material.Science)]);
        }
        if (this.techId === 2) {
            // player.buildingLib.changeBigBuildingPowerValue(4);
        }
        if (this.techId === 3) {
            b1 = new Benefit_1.Benefit(0 /* Now */, null, null, [new Benefit_1.Value(7, Benefit_1.Material.VP)]);
        }
        if (this.techId === 4) {
            b1 = new Benefit_1.Benefit(4 /* Income */, null, null, [new Benefit_1.Value(1, Benefit_1.Material.Ore), new Benefit_1.Value(1, Benefit_1.Material.Power)]);
        }
        if (this.techId === 5) {
            b1 = new Benefit_1.Benefit(4 /* Income */, null, null, [new Benefit_1.Value(1, Benefit_1.Material.Science), new Benefit_1.Value(1, Benefit_1.Material.Gold)]);
        }
        if (this.techId === 6) {
            b1 = new Benefit_1.Benefit(3 /* Build */, null, Benefit_1.BuildingType.MineOnGaia, [new Benefit_1.Value(3, Benefit_1.Material.VP)]);
        }
        if (this.techId === 7) {
            b1 = new Benefit_1.Benefit(4 /* Income */, null, null, [new Benefit_1.Value(4, Benefit_1.Material.Gold)]);
        }
        if (this.techId === 8) {
            //power: can charge 4 power, everyturn
            b1 = new Benefit_1.Benefit(6 /* Special */, null, null, [new Benefit_1.Value(4, Benefit_1.Material.Power)]);
        }
        if (b1 != null) {
            player.getTechTileBenefit(b1);
            var techtile = new TechTile(this.techId);
            techtile.benefit = b1;
            techtile.round = -1;
            player.techTiles.push(techtile);
        }
    };
    /*
    when get an advance techtile, player need to cover a normal techtile,
    the normal techtile will not work
    */
    TechTile.prototype.offTechTile = function (player, techId) {
        var b1 = null;
        if (techId === 0) {
            //player.ore -= 1; player.QIC -= 1; do nothing, since this is a now benefit, turn it off will cause nothing
        }
        if (techId === 1) {
            //player.science += player.planetTypes.length * 1; also do nothing
        }
        if (techId === 2) {
            //  player.buildingLib.changeBigBuildingPowerValue(4);
        }
        if (techId === 3) {
            //player.VP += 7;
            //do nothing
        }
        if (techId === 4) {
            //  player.income.ore -= 1;
            //  player.income.charge -= 1;
            b1 = new Benefit_1.Benefit(4 /* Income */, null, null, [new Benefit_1.Value(-1, Benefit_1.Material.Ore), new Benefit_1.Value(-1, Benefit_1.Material.Power)]);
        }
        if (techId === 5) {
            //  player.income.science -= 1;
            //  player.income.gold -= 1;
            b1 = new Benefit_1.Benefit(4 /* Income */, null, null, [new Benefit_1.Value(-1, Benefit_1.Material.Science), new Benefit_1.Value(-1, Benefit_1.Material.Gold)]);
        }
        if (techId === 6) {
            //turn off the ability of "everytime player build a mine, get 3 VP";
            b1 = new Benefit_1.Benefit(3 /* Build */, null, Benefit_1.BuildingType.MineOnGaia, [new Benefit_1.Value(-3, Benefit_1.Material.VP)]);
        }
        if (techId === 7) {
            //  player.income.gold -= 4;
            b1 = new Benefit_1.Benefit(4 /* Income */, null, null, [new Benefit_1.Value(-4, Benefit_1.Material.Gold)]);
        }
        if (techId === 8) {
            //ability: can charge 4 power, everyturn
            //player.abilities[XX] = null;
            //how to turn it off;
            player.turnOffSpecialPower("Power4       " /* Power4 */);
        }
        // remove techTiles from player.techTiles
        player.removeTechtile(techId);
    };
    TechTile.prototype.onAdvanceTechTile = function (player, offTechId) {
        this.offTechTile(player, offTechId); //turn off the normal techtile;
        var adTechId = this.techId;
        var b1 = null;
        if (adTechId === 9) {
            //every cleanup phase: player.VP += 3 * number of federation;
            b1 = new Benefit_1.Benefit(5 /* Pass */, Benefit_1.Count.Feds, null, [new Benefit_1.Value(3, Benefit_1.Material.VP)]);
        }
        if (adTechId === 10) {
            //everytime update tech +2 VP;
            b1 = new Benefit_1.Benefit(7 /* ScienceUp */, null, null, [new Benefit_1.Value(2, Benefit_1.Material.VP)]);
        }
        if (adTechId === 11) {
            //get ability: every turn, +1 QIC +5 gold;
            b1 = new Benefit_1.Benefit(6 /* Special */, null, null, [new Benefit_1.Value(1, Benefit_1.Material.QIC), new Benefit_1.Value(5, Benefit_1.Material.Gold)]);
        }
        if (adTechId === 12) {
            //player.VP += number of mine * 2;
            b1 = new Benefit_1.Benefit(0 /* Now */, Benefit_1.Count.Mines, null, [new Benefit_1.Value(2, Benefit_1.Material.VP)]);
        }
        if (adTechId === 13) {
            //every cleanup phase: player.VP += 3 * number of lab;
            b1 = new Benefit_1.Benefit(5 /* Pass */, Benefit_1.Count.Labs, null, [new Benefit_1.Value(3, Benefit_1.Material.VP)]);
        }
        if (adTechId === 14) {
            //player.ore += 1 * player.number of sector
            b1 = new Benefit_1.Benefit(0 /* Now */, Benefit_1.Count.Sectors, null, [new Benefit_1.Value(1, Benefit_1.Material.Ore)]);
        }
        if (adTechId === 15) {
            //every cleanup phase: player.VP += 1 * player.planetTypes.length;
            b1 = new Benefit_1.Benefit(5 /* Pass */, Benefit_1.Count.PlanetTypes, null, [new Benefit_1.Value(1, Benefit_1.Material.VP)]);
        }
        if (adTechId === 16) {
            //  player.VP += 2 * player.numGaia;
            b1 = new Benefit_1.Benefit(0 /* Now */, Benefit_1.Count.Gaia, null, [new Benefit_1.Value(2, Benefit_1.Material.VP)]);
        }
        if (adTechId === 17) {
            //player.VP += 4 * player.number of station;
            b1 = new Benefit_1.Benefit(0 /* Now */, Benefit_1.Count.TradingStations, null, [new Benefit_1.Value(4, Benefit_1.Material.VP)]);
        }
        if (adTechId === 18) {
            //player.VP += 2 * number of sectors;
            b1 = new Benefit_1.Benefit(0 /* Now */, Benefit_1.Count.Sectors, null, [new Benefit_1.Value(2, Benefit_1.Material.VP)]);
        }
        if (adTechId === 19) {
            //get ability: +3 ore;
            b1 = new Benefit_1.Benefit(6 /* Special */, null, null, [new Benefit_1.Value(3, Benefit_1.Material.Ore)]);
        }
        if (adTechId === 20) {
            //player.VP += 5 * number of federation;
            b1 = new Benefit_1.Benefit(0 /* Now */, Benefit_1.Count.Feds, null, [new Benefit_1.Value(5, Benefit_1.Material.VP)]);
        }
        if (adTechId === 21) {
            //get ability: +3 science;
            b1 = new Benefit_1.Benefit(6 /* Special */, null, null, [new Benefit_1.Value(3, Benefit_1.Material.Science)]);
        }
        if (adTechId === 22) {
            //every time build mine: +3 VP;
            b1 = new Benefit_1.Benefit(3 /* Build */, null, Benefit_1.BuildingType.Mine, [new Benefit_1.Value(3, Benefit_1.Material.VP)]);
        }
        if (adTechId === 23) {
            //every time build station: +3 VP;
            b1 = new Benefit_1.Benefit(3 /* Build */, null, Benefit_1.BuildingType.TradingStation, [new Benefit_1.Value(3, Benefit_1.Material.VP)]);
        }
        if (b1 != null) {
            player.getTechTileBenefit(b1);
            var techtile = new TechTile(this.techId);
            techtile.benefit = b1;
            techtile.round = -1;
            player.techTiles.push(techtile);
        }
    };
    return TechTile;
}());
exports.default = TechTile;
