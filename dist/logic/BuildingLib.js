"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Structure_1 = require("./Structure");
var Player_1 = require("./Player");
var Benefit_1 = require("./Benefit");
/**
 * Building Libraries for each faction
 */
var BuildingLib = /** @class */ (function () {
    function BuildingLib(race) {
        this.race = race;
        this.mines = [];
        this.station = [];
        this.institute = [];
        this.lab = [];
        this.academies = [];
        this.gaiaformer = [];
        /**
         * Trading Station types on Faction Board
         */
        var station1 = new Structure_1.Structure(Structure_1.StructureType.Station, [new Benefit_1.Value(3, Benefit_1.Material.Gold),
            new Benefit_1.Value(1, Benefit_1.Material.Ore)], 2, new Benefit_1.Benefit(4 /* Income */, null, null, [new Benefit_1.Value(3, Benefit_1.Material.Gold)]));
        var station2 = new Structure_1.Structure(Structure_1.StructureType.Station, [new Benefit_1.Value(Benefit_1.Material.Gold, 3),
            new Benefit_1.Value(Benefit_1.Material.Ore, 1)], 2, new Benefit_1.Benefit(4 /* Income */, null, null, [new Benefit_1.Value(4, Benefit_1.Material.Gold)]));
        var station3 = new Structure_1.Structure(Structure_1.StructureType.Station, [new Benefit_1.Value(Benefit_1.Material.Gold, 3),
            new Benefit_1.Value(Benefit_1.Material.Ore, 1)], 2, new Benefit_1.Benefit(4 /* Income */, null, null, [new Benefit_1.Value(5, Benefit_1.Material.Gold)]));
        /**
         * Academy types on Faction Board
         */
        var academy1 = new Structure_1.Structure(Structure_1.StructureType.Academy, [new Benefit_1.Value(Benefit_1.Material.Gold, 6),
            new Benefit_1.Value(Benefit_1.Material.Ore, 6)], 3, new Benefit_1.Benefit(4 /* Income */, null, null, [new Benefit_1.Value(2, Benefit_1.Material.Science)]));
        var academy1a = new Structure_1.Structure(Structure_1.StructureType.Academy, [new Benefit_1.Value(Benefit_1.Material.Gold, 6),
            new Benefit_1.Value(Benefit_1.Material.Ore, 6)], 3, new Benefit_1.Benefit(4 /* Income */, null, null, [new Benefit_1.Value(3, Benefit_1.Material.Science)]));
        var academy2 = new Structure_1.Structure(Structure_1.StructureType.Academy, [new Benefit_1.Value(Benefit_1.Material.Gold, 6),
            new Benefit_1.Value(Benefit_1.Material.Ore, 6)], 3, new Benefit_1.Benefit(6 /* Special */, null, null, [new Benefit_1.Value(1, Benefit_1.Material.QIC)]));
        var academy2a = new Structure_1.Structure(Structure_1.StructureType.Academy, [new Benefit_1.Value(Benefit_1.Material.Gold, 6),
            new Benefit_1.Value(Benefit_1.Material.Ore, 6)], 3, new Benefit_1.Benefit(6 /* Special */, null, null, [new Benefit_1.Value(4, Benefit_1.Material.Gold)]));
        /**
         * Adds Mines
         */
        for (var i = 1; i <= 8; i++) {
            if (i === 3) {
                //Mine 2
                var mine2 = new Structure_1.Structure(Structure_1.StructureType.Mine, [new Benefit_1.Value(2, Benefit_1.Material.Gold),
                    new Benefit_1.Value(1, Benefit_1.Material.Ore)], 1, new Benefit_1.Benefit(4 /* Income */, null, null, [new Benefit_1.Value(0, Benefit_1.Material.Ore)]));
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
        if (this.race === Player_1.RaceType.Bescods) {
            /**
             * Lab types on Faction Board
             */
            for (var i = 1; i <= 4; i++) {
                var lab = new Structure_1.Structure(Structure_1.StructureType.Lab, [new Benefit_1.Value(Benefit_1.Material.Gold, 5),
                    new Benefit_1.Value(Benefit_1.Material.Ore, 3)], 2, new Benefit_1.Benefit(4 /* Income */, null, null, [new Benefit_1.Value(1, Benefit_1.Material.Science)]));
                this.station.push(lab);
            }
        }
        else {
            this.station.push(station1);
            this.station.push(station2);
            this.station.push(station2);
            this.station.push(station3);
        }
        /**
         * Adds Labs
         */
        if (this.race === Player_1.RaceType.Bescods) {
            this.lab.push(station1);
            this.lab.push(station2);
            this.lab.push(station3);
        }
        else {
            for (var i = 1; i <= 3; i++) {
                /**
                 * Lab types on Faction Board
                 */
                var lab = new Structure_1.Structure(Structure_1.StructureType.Lab, [new Benefit_1.Value(Benefit_1.Material.Gold, 5),
                    new Benefit_1.Value(Benefit_1.Material.Ore, 3)], 2, new Benefit_1.Benefit(4 /* Income */, null, null, [new Benefit_1.Value(1, Benefit_1.Material.Science)]));
                this.lab.push(lab);
            }
        }
        /**
         * Adds Academies
         */
        if (this.race === Player_1.RaceType.Itars) {
            this.academies.push(academy1a);
            this.academies.push(academy2);
        }
        else if (this.race === Player_1.RaceType.Baltaks) {
            this.academies.push(academy1);
            this.academies.push(academy2a);
        }
        else {
            this.academies.push(academy1);
            this.academies.push(academy2);
        }
        /**
         * Adds Institute
         * Different Institute powers
         */
        if (this.race === Player_1.RaceType.Terrans) {
            var values = [new Benefit_1.Value(Benefit_1.Material.Gold, 6), new Benefit_1.Value(Benefit_1.Material.Ore, 4)];
            var benefit = new Benefit_1.Benefit(4 /* Income */, null, null, [new Benefit_1.Value(1, Benefit_1.Material.ExtraPower), new Benefit_1.Value(4, Benefit_1.Material.Power)]);
            var terranInstitute = new Structure_1.Structure(Structure_1.StructureType.Institute, values, 3, benefit);
            this.institute.push(terranInstitute);
        }
        else if (this.race === Player_1.RaceType.Lantids) {
            var lantidsInstitute = new Structure_1.Structure(Structure_1.StructureType.Institute, [new Benefit_1.Value(Benefit_1.Material.Gold, 6),
                new Benefit_1.Value(Benefit_1.Material.Ore, 4)], 3, new Benefit_1.Benefit(4 /* Income */, null, null, [new Benefit_1.Value(4, Benefit_1.Material.Power)]));
            this.institute.push(lantidsInstitute);
        }
        else if (this.race === Player_1.RaceType.Xenos) {
            var xenosInstitute = new Structure_1.Structure(Structure_1.StructureType.Institute, [new Benefit_1.Value(Benefit_1.Material.Gold, 6),
                new Benefit_1.Value(Benefit_1.Material.Ore, 4)], 3, new Benefit_1.Benefit(4 /* Income */, null, null, [new Benefit_1.Value(4, Benefit_1.Material.Power), new Benefit_1.Value(1, Benefit_1.Material.QIC)]));
            this.institute.push(xenosInstitute);
        }
        else if (this.race === Player_1.RaceType.Gleens) {
            var gleensInstitute = new Structure_1.Structure(Structure_1.StructureType.Institute, [new Benefit_1.Value(Benefit_1.Material.Gold, 6),
                new Benefit_1.Value(Benefit_1.Material.Ore, 4)], 3, new Benefit_1.Benefit(4 /* Income */, null, null, [new Benefit_1.Value(4, Benefit_1.Material.Power), new Benefit_1.Value(1, Benefit_1.Material.Ore)]));
            this.institute.push(gleensInstitute);
        }
        else if (this.race === Player_1.RaceType.Taklons) {
            var taklonsInstitute = new Structure_1.Structure(Structure_1.StructureType.Institute, [new Benefit_1.Value(Benefit_1.Material.Gold, 6),
                new Benefit_1.Value(Benefit_1.Material.Ore, 4)], 3, new Benefit_1.Benefit(4 /* Income */, null, null, [new Benefit_1.Value(4, Benefit_1.Material.Power), new Benefit_1.Value(1, Benefit_1.Material.Power)]));
            this.institute.push(taklonsInstitute);
        }
        else if (this.race === Player_1.RaceType.Ambas) {
            var ambasInstitute = new Structure_1.Structure(Structure_1.StructureType.Institute, [new Benefit_1.Value(Benefit_1.Material.Gold, 6),
                new Benefit_1.Value(Benefit_1.Material.Ore, 4)], 3, new Benefit_1.Benefit(4 /* Income */, null, null, [new Benefit_1.Value(4, Benefit_1.Material.Power), new Benefit_1.Value(2, Benefit_1.Material.Power)]));
            this.institute.push(ambasInstitute);
        }
        else if (this.race === Player_1.RaceType.Nevlas) {
            var nevlasInstitute = new Structure_1.Structure(Structure_1.StructureType.Institute, [new Benefit_1.Value(Benefit_1.Material.Gold, 6),
                new Benefit_1.Value(Benefit_1.Material.Ore, 4)], 3, new Benefit_1.Benefit(4 /* Income */, null, null, [new Benefit_1.Value(4, Benefit_1.Material.Power), new Benefit_1.Value(1, Benefit_1.Material.Power)]));
            this.institute.push(nevlasInstitute);
        }
        else if (this.race === Player_1.RaceType.Itars) {
            var itarsInstitute = new Structure_1.Structure(Structure_1.StructureType.Institute, [new Benefit_1.Value(Benefit_1.Material.Gold, 6),
                new Benefit_1.Value(Benefit_1.Material.Ore, 4)], 3, new Benefit_1.Benefit(4 /* Income */, null, null, [new Benefit_1.Value(4, Benefit_1.Material.Power), new Benefit_1.Value(1, Benefit_1.Material.Power)]));
            this.institute.push(itarsInstitute);
        }
        else if (this.race === Player_1.RaceType.Ivits) {
            var ivitsInstitute = new Structure_1.Structure(Structure_1.StructureType.Institute, [new Benefit_1.Value(Benefit_1.Material.Gold, 6),
                new Benefit_1.Value(Benefit_1.Material.Ore, 4)], 3, new Benefit_1.Benefit(4 /* Income */, null, null, [new Benefit_1.Value(4, Benefit_1.Material.Power), new Benefit_1.Value(1, Benefit_1.Material.Power)]));
            this.institute.push(ivitsInstitute);
        }
        else if (this.race === Player_1.RaceType.HadschHallas) {
            var hHInstitute = new Structure_1.Structure(Structure_1.StructureType.Institute, [new Benefit_1.Value(Benefit_1.Material.Gold, 6),
                new Benefit_1.Value(Benefit_1.Material.Ore, 4)], 3, new Benefit_1.Benefit(4 /* Income */, null, null, [new Benefit_1.Value(4, Benefit_1.Material.Power), new Benefit_1.Value(1, Benefit_1.Material.Power)]));
            this.institute.push(hHInstitute);
        }
        else if (this.race === Player_1.RaceType.Geodens) {
            var geodensInstitute = new Structure_1.Structure(Structure_1.StructureType.Institute, [new Benefit_1.Value(Benefit_1.Material.Gold, 6),
                new Benefit_1.Value(Benefit_1.Material.Ore, 4)], 3, new Benefit_1.Benefit(4 /* Income */, null, null, [new Benefit_1.Value(4, Benefit_1.Material.Power), new Benefit_1.Value(1, Benefit_1.Material.Power)]));
            this.institute.push(geodensInstitute);
        }
        else if (this.race === Player_1.RaceType.Baltaks) {
            var baltaksInstitute = new Structure_1.Structure(Structure_1.StructureType.Institute, [new Benefit_1.Value(Benefit_1.Material.Gold, 6),
                new Benefit_1.Value(Benefit_1.Material.Ore, 4)], 3, new Benefit_1.Benefit(4 /* Income */, null, null, [new Benefit_1.Value(4, Benefit_1.Material.Power), new Benefit_1.Value(1, Benefit_1.Material.Power)]));
            this.institute.push(baltaksInstitute);
        }
        else if (this.race === Player_1.RaceType.Firaks) {
            var firaksInstitute = new Structure_1.Structure(Structure_1.StructureType.Institute, [new Benefit_1.Value(Benefit_1.Material.Gold, 6),
                new Benefit_1.Value(Benefit_1.Material.Ore, 4)], 3, new Benefit_1.Benefit(4 /* Income */, null, null, [new Benefit_1.Value(4, Benefit_1.Material.Power), new Benefit_1.Value(1, Benefit_1.Material.Power)]));
            this.institute.push(firaksInstitute);
        }
        else if (this.race === Player_1.RaceType.Bescods) {
            var bescodsInstitute = new Structure_1.Structure(Structure_1.StructureType.Institute, [new Benefit_1.Value(Benefit_1.Material.Gold, 6),
                new Benefit_1.Value(Benefit_1.Material.Ore, 4)], 3, new Benefit_1.Benefit(4 /* Income */, null, null, [new Benefit_1.Value(4, Benefit_1.Material.Power), new Benefit_1.Value(2, Benefit_1.Material.Power)]));
            this.institute.push(bescodsInstitute);
        }
    }
    /**
     * this function serve for the techtile of changing power value of bigbuilding
     * @param value
     */
    BuildingLib.prototype.changeBigBuildingPowerValue = function (value) {
        for (var i = 0; i < this.academies.length; i++) {
            this.academies[i].changePowerValue(value);
        }
        this.institute[0].changePowerValue(value);
    };
    return BuildingLib;
}());
exports.BuildingLib = BuildingLib;
