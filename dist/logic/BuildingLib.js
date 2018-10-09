"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Structure_1 = require("./Structure");
var Benefit_1 = require("./Benefit");
/**
 * Base building Library for all factions
 * Specific differences between each Faction is stored in their
 * respective Faction class in Races folder
 */
var BuildingLib = /** @class */ (function () {
    function BuildingLib() {
        // this.race = race;
        this.mines = [];
        this.station = [];
        this.institute = [];
        this.lab = [];
        this.academies = [];
        // this.gaiaformer = [];
        /**
          * Adds Mines
          */
        for (var i = 1; i <= 8; i++) {
            if (i === 3) {
                //Mine 2
                var values_1 = [new Benefit_1.Value(2, Benefit_1.Material.Gold), new Benefit_1.Value(1, Benefit_1.Material.Ore)];
                var benefit_1 = new Benefit_1.Benefit(4 /* Income */, null, null, [new Benefit_1.Value(0, Benefit_1.Material.Ore)]);
                var mine2 = new Structure_1.Structure(Structure_1.StructureType.Mine, values_1, 1, benefit_1);
                this.mines.push(mine2);
            }
            else {
                //Mine 1
                var mine1 = new Structure_1.Structure(Structure_1.StructureType.Mine, [new Benefit_1.Value(2, Benefit_1.Material.Gold),
                    new Benefit_1.Value(1, Benefit_1.Material.Ore)], 1, new Benefit_1.Benefit(4 /* Income */, null, null, [new Benefit_1.Value(1, Benefit_1.Material.Ore)]));
                this.mines.push(mine1);
            }
        }
        /**
         * Adds Trading stations
         */
        {
            var station1 = new Structure_1.Structure(Structure_1.StructureType.Station, [new Benefit_1.Value(3, Benefit_1.Material.Gold),
                new Benefit_1.Value(2, Benefit_1.Material.Ore)], 2, new Benefit_1.Benefit(4 /* Income */, null, null, [new Benefit_1.Value(3, Benefit_1.Material.Gold)]));
            this.station.push(station1);
            var station2 = new Structure_1.Structure(Structure_1.StructureType.Station, [new Benefit_1.Value(3, Benefit_1.Material.Gold),
                new Benefit_1.Value(2, Benefit_1.Material.Ore)], 2, new Benefit_1.Benefit(4 /* Income */, null, null, [new Benefit_1.Value(4, Benefit_1.Material.Gold)]));
            this.station.push(station2);
            var station3 = new Structure_1.Structure(Structure_1.StructureType.Station, [new Benefit_1.Value(3, Benefit_1.Material.Gold),
                new Benefit_1.Value(2, Benefit_1.Material.Ore)], 2, new Benefit_1.Benefit(4 /* Income */, null, null, [new Benefit_1.Value(4, Benefit_1.Material.Gold)]));
            this.station.push(station3);
            var station4 = new Structure_1.Structure(Structure_1.StructureType.Station, [new Benefit_1.Value(3, Benefit_1.Material.Gold),
                new Benefit_1.Value(2, Benefit_1.Material.Ore)], 2, new Benefit_1.Benefit(4 /* Income */, null, null, [new Benefit_1.Value(5, Benefit_1.Material.Gold)]));
            this.station.push(station4);
        }
        /**
         * Adds Labs
         */
        for (var i = 1; i <= 3; i++) {
            var lab1 = new Structure_1.Structure(Structure_1.StructureType.Lab, [new Benefit_1.Value(5, Benefit_1.Material.Gold),
                new Benefit_1.Value(3, Benefit_1.Material.Ore)], 2, new Benefit_1.Benefit(4 /* Income */, null, null, [new Benefit_1.Value(1, Benefit_1.Material.Science)]));
            this.lab.push(lab1);
        }
        /**
         * Academy types on Faction Board
         */
        {
            var values_2 = [new Benefit_1.Value(6, Benefit_1.Material.Gold), new Benefit_1.Value(6, Benefit_1.Material.Ore)];
            var benefit1 = new Benefit_1.Benefit(4 /* Income */, null, null, [new Benefit_1.Value(2, Benefit_1.Material.Science)]);
            var benefit2 = new Benefit_1.Benefit(6 /* Special */, null, null, [new Benefit_1.Value(1, Benefit_1.Material.QIC)]);
            var academy1 = new Structure_1.Structure(Structure_1.StructureType.Academy, values_2, 3, benefit1);
            var academy2 = new Structure_1.Structure(Structure_1.StructureType.Academy, values_2, 3, benefit2);
            this.academies.push(academy1);
            this.academies.push(academy2);
        }
        /**
         * Adds Institute
         * Different Institute powers
         */
        var values = [new Benefit_1.Value(6, Benefit_1.Material.Gold), new Benefit_1.Value(4, Benefit_1.Material.Ore)];
        var benefit = new Benefit_1.Benefit(4 /* Income */, null, null, [new Benefit_1.Value(1, Benefit_1.Material.ExtraPower), new Benefit_1.Value(4, Benefit_1.Material.Power)]);
        var raceInstitute = new Structure_1.Structure(Structure_1.StructureType.Institute, values, 3, benefit);
        this.institute.push(raceInstitute);
    }
    return BuildingLib;
}());
exports.BuildingLib = BuildingLib;
