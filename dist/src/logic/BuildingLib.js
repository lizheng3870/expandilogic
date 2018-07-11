import { StructureType, Building } from "./Structure";
import { RaceType } from "./Race";
import { Cost, BuildCost } from "./Cost";
import { Benefit, Value, Material, Count, Structure } from "./Benefit";
/**
 * Building Libraries for each faction
 */
var BuildingLib = /** @class */ (function () {
    function BuildingLib(race) {
        this.race = race;
        /**
         * Mine types on Faction Board
         */
        //Mine 1
        var mine1 = new StructureType(Building.Mine, new Cost([new BuildCost(Material.Gold, 2),
            new BuildCost(Material.Ore, 1)]), 1, new Benefit(4 /* Income */, Count.Mines, Structure.Mine, [new Value(1, Material.Ore)]));
        //Mine 2
        var mine2 = new StructureType(Building.Mine, new Cost([new BuildCost(Material.Gold, 2),
            new BuildCost(Material.Ore, 1)]), 1, new Benefit(4 /* Income */, Count.Mines, Structure.Mine, [new Value(0, Material.Ore)]));
        /**
         * Trading Station types on Faction Board
         */
        var station1 = new StructureType(Building.Station, new Cost([new BuildCost(Material.Gold, 3),
            new BuildCost(Material.Ore, 1)]), 2, new Benefit(4 /* Income */, Count.TradingStations, Structure.TradingStation, [new Value(3, Material.Gold)]));
        var station2 = new StructureType(Building.Station, new Cost([new BuildCost(Material.Gold, 3),
            new BuildCost(Material.Ore, 1)]), 2, new Benefit(4 /* Income */, Count.TradingStations, Structure.TradingStation, [new Value(4, Material.Gold)]));
        var station3 = new StructureType(Building.Station, new Cost([new BuildCost(Material.Gold, 3),
            new BuildCost(Material.Ore, 1)]), 2, new Benefit(4 /* Income */, Count.TradingStations, Structure.TradingStation, [new Value(5, Material.Gold)]));
        /**
         * Lab types on Faction Board
         */
        var lab = new StructureType(Building.Lab, new Cost([new BuildCost(Material.Gold, 5),
            new BuildCost(Material.Ore, 3)]), 2, new Benefit(4 /* Income */, Count.Labs, Structure.Lab, [new Value(1, Material.Science)]));
        /**
        * Academy types on Faction Board
        */
        var academy1 = new StructureType(Building.Academy, new Cost([new BuildCost(Material.Gold, 6),
            new BuildCost(Material.Ore, 6)]), 3, new Benefit(4 /* Income */, Count.BigBuildings, Structure.Academy, [new Value(2, Material.Science)]));
        var academy1a = new StructureType(Building.Academy, new Cost([new BuildCost(Material.Gold, 6),
            new BuildCost(Material.Ore, 6)]), 3, new Benefit(4 /* Income */, Count.BigBuildings, Structure.Academy, [new Value(3, Material.Science)]));
        var academy2 = new StructureType(Building.Academy, new Cost([new BuildCost(Material.Gold, 6),
            new BuildCost(Material.Ore, 6)]), 3, new Benefit(6 /* Special */, Count.BigBuildings, Structure.Academy, [new Value(1, Material.QIC)]));
        var academy2a = new StructureType(Building.Academy, new Cost([new BuildCost(Material.Gold, 6),
            new BuildCost(Material.Ore, 6)]), 3, new Benefit(6 /* Special */, Count.BigBuildings, Structure.Academy, [new Value(4, Material.Gold)]));
        /**
        * Adds Mines
        */
        for (var i = 1; i <= 8; i++) {
            if (i === 3) {
                this.mines.push(mine2);
            }
            else {
                this.mines.push(mine1);
            }
        }
        /**
         * Adds Trading stations
         */
        if (this.race === RaceType.Bescods) {
            this.station.push(lab);
            this.station.push(lab);
            this.station.push(lab);
            this.station.push(lab);
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
        if (this.race === RaceType.Bescods) {
            this.lab.push(station1);
            this.lab.push(station2);
            this.lab.push(station3);
        }
        else {
            for (var i = 1; i <= 3; i++) {
                this.lab.push(lab);
            }
        }
        /**
         * Adds Academies
         */
        if (this.race === RaceType.Itars) {
            this.academies.push(academy1a);
            this.academies.push(academy2);
        }
        else if (this.race === RaceType.Baltaks) {
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
        if (this.race === RaceType.Terrans) {
            var terranInstitute = new StructureType(Building.Institute, new Cost([new BuildCost(Material.Gold, 6),
                new BuildCost(Material.Ore, 4)]), 3, new Benefit(4 /* Income */, Count.BigBuildings, Structure.Institute, [new Value(1, Material.ExtraPower), new Value(4, Material.Power)]));
            this.institute.push(terranInstitute);
        }
        else if (this.race === RaceType.Lantids) {
            var lantidsInstitute = new StructureType(Building.Institute, new Cost([new BuildCost(Material.Gold, 6),
                new BuildCost(Material.Ore, 4)]), 3, new Benefit(4 /* Income */, Count.BigBuildings, Structure.Institute, [new Value(4, Material.Power)]));
            this.institute.push(lantidsInstitute);
        }
        else if (this.race === RaceType.Xenos) {
            var xenosInstitute = new StructureType(Building.Institute, new Cost([new BuildCost(Material.Gold, 6),
                new BuildCost(Material.Ore, 4)]), 3, new Benefit(4 /* Income */, Count.BigBuildings, Structure.Institute, [new Value(4, Material.Power), new Value(1, Material.QIC)]));
            this.institute.push(xenosInstitute);
        }
        else if (this.race === RaceType.Gleens) {
            var gleensInstitute = new StructureType(Building.Institute, new Cost([new BuildCost(Material.Gold, 6),
                new BuildCost(Material.Ore, 4)]), 3, new Benefit(4 /* Income */, Count.BigBuildings, Structure.Institute, [new Value(4, Material.Power), new Value(1, Material.Ore)]));
            this.institute.push(gleensInstitute);
        }
        else if (this.race === RaceType.Taklons) {
            var taklonsInstitute = new StructureType(Building.Institute, new Cost([new BuildCost(Material.Gold, 6),
                new BuildCost(Material.Ore, 4)]), 3, new Benefit(4 /* Income */, Count.BigBuildings, Structure.Institute, [new Value(4, Material.Power), new Value(1, Material.Power)]));
            this.institute.push(taklonsInstitute);
        }
        else if (this.race === RaceType.Ambas) {
            var ambasInstitute = new StructureType(Building.Institute, new Cost([new BuildCost(Material.Gold, 6),
                new BuildCost(Material.Ore, 4)]), 3, new Benefit(4 /* Income */, Count.BigBuildings, Structure.Institute, [new Value(4, Material.Power), new Value(2, Material.Power)]));
            this.institute.push(ambasInstitute);
        }
        else if (this.race === RaceType.Nevlas) {
            var nevlasInstitute = new StructureType(Building.Institute, new Cost([new BuildCost(Material.Gold, 6),
                new BuildCost(Material.Ore, 4)]), 3, new Benefit(4 /* Income */, Count.BigBuildings, Structure.Institute, [new Value(4, Material.Power), new Value(1, Material.Power)]));
            this.institute.push(nevlasInstitute);
        }
        else if (this.race === RaceType.Itars) {
            var itarsInstitute = new StructureType(Building.Institute, new Cost([new BuildCost(Material.Gold, 6),
                new BuildCost(Material.Ore, 4)]), 3, new Benefit(4 /* Income */, Count.BigBuildings, Structure.Institute, [new Value(4, Material.Power), new Value(1, Material.Power)]));
            this.institute.push(itarsInstitute);
        }
        else if (this.race === RaceType.Ivits) {
            var ivitsInstitute = new StructureType(Building.Institute, new Cost([new BuildCost(Material.Gold, 6),
                new BuildCost(Material.Ore, 4)]), 3, new Benefit(4 /* Income */, Count.BigBuildings, Structure.Institute, [new Value(4, Material.Power), new Value(1, Material.Power)]));
            this.institute.push(ivitsInstitute);
        }
        else if (this.race === RaceType.HadschHallas) {
            var hHInstitute = new StructureType(Building.Institute, new Cost([new BuildCost(Material.Gold, 6),
                new BuildCost(Material.Ore, 4)]), 3, new Benefit(4 /* Income */, Count.BigBuildings, Structure.Institute, [new Value(4, Material.Power), new Value(1, Material.Power)]));
            this.institute.push(hHInstitute);
        }
        else if (this.race === RaceType.Geodens) {
            var geodensInstitute = new StructureType(Building.Institute, new Cost([new BuildCost(Material.Gold, 6),
                new BuildCost(Material.Ore, 4)]), 3, new Benefit(4 /* Income */, Count.BigBuildings, Structure.Institute, [new Value(4, Material.Power), new Value(1, Material.Power)]));
            this.institute.push(geodensInstitute);
        }
        else if (this.race === RaceType.Baltaks) {
            var baltaksInstitute = new StructureType(Building.Institute, new Cost([new BuildCost(Material.Gold, 6),
                new BuildCost(Material.Ore, 4)]), 3, new Benefit(4 /* Income */, Count.BigBuildings, Structure.Institute, [new Value(4, Material.Power), new Value(1, Material.Power)]));
            this.institute.push(baltaksInstitute);
        }
        else if (this.race === RaceType.Firaks) {
            var firaksInstitute = new StructureType(Building.Institute, new Cost([new BuildCost(Material.Gold, 6),
                new BuildCost(Material.Ore, 4)]), 3, new Benefit(4 /* Income */, Count.BigBuildings, Structure.Institute, [new Value(4, Material.Power), new Value(1, Material.Power)]));
            this.institute.push(firaksInstitute);
        }
        else if (this.race === RaceType.Bescods) {
            var bescodsInstitute = new StructureType(Building.Institute, new Cost([new BuildCost(Material.Gold, 6),
                new BuildCost(Material.Ore, 4)]), 3, new Benefit(4 /* Income */, Count.BigBuildings, Structure.Institute, [new Value(4, Material.Power), new Value(2, Material.Power)]));
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
export { BuildingLib };
