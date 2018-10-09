"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Structure_1 = require("./Structure");
var PlanetType;
(function (PlanetType) {
    PlanetType[PlanetType["Blue"] = 0] = "Blue";
    PlanetType[PlanetType["Red"] = 1] = "Red";
    PlanetType[PlanetType["Orange"] = 2] = "Orange";
    PlanetType[PlanetType["Yellow"] = 3] = "Yellow";
    PlanetType[PlanetType["Brown"] = 4] = "Brown";
    PlanetType[PlanetType["Black"] = 5] = "Black";
    PlanetType[PlanetType["White"] = 6] = "White";
    PlanetType[PlanetType["Lost"] = 7] = "Lost";
    PlanetType[PlanetType["Gaia"] = 8] = "Gaia";
    PlanetType[PlanetType["Transdim"] = 9] = "Transdim";
    //Gaiaformer//  this is Transdim planet maybe need change
})(PlanetType || (PlanetType = {}));
exports.PlanetType = PlanetType;
var Planet = /** @class */ (function () {
    //  public type : PlanetType
    function Planet(loc, type) {
        this.building = null; // change from StructureType[] to StructureType without concern specail race.
        this.type = type;
        this.loc = loc;
        this.playerID = -1; // not building on it
    }
    // PlanetType of race vs PlanetType of planet
    Planet.prototype.terraformingCalculate = function (type) {
        if (type === PlanetType.Transdim) {
            console.log("Transdim, need  gaia project ");
            return 1000000;
        }
        if (type === PlanetType.Gaia) {
            console.log("Gaia planet need one QIC");
            return 0;
        }
        // if(type === PlanetType.Gaiaformer){  // Gaiaformer
        //   console.log("nice Gaiaformer, no terraforming cost");
        //   return 0;
        // }
        var distance = Math.abs(this.type - type);
        if (distance > 3) {
            distance = 3 - (distance - 4);
        }
        return distance;
    };
    // public onStructure(structure: Structure){ no use
    //   if(this.structure != null){
    //     console.log("already built on this planet")
    //   }
    //   this.structure = structure;
    // }
    // public offStructure(){
    //   this.structure = null;
    // }
    Planet.prototype.buildingPower = function () {
        var charge = 0;
        if (this.playerID === -1) { // not building
            return 0;
        }
        if (this.building === Structure_1.StructureType.Mine) {
            charge = 1;
        }
        if (this.building === Structure_1.StructureType.Station || this.building === Structure_1.StructureType.Lab) {
            charge = 2;
        }
        if (this.building === Structure_1.StructureType.Academy || this.building === Structure_1.StructureType.Institute) {
            charge = 3;
        }
        return charge;
    };
    return Planet;
}());
exports.Planet = Planet;
