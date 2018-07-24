"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    PlanetType[PlanetType["Gaiaformer"] = 10] = "Gaiaformer";
})(PlanetType || (PlanetType = {}));
exports.PlanetType = PlanetType;
var Planet = /** @class */ (function () {
    //  public type : PlanetType
    function Planet(loc, type) {
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
        if (type === PlanetType.Gaiaformer) { // Gaiaformer
            console.log("nice Gaiaformer, no terraforming cost");
            return 0;
        }
        var distance = Math.abs(this.type - type);
        if (distance > 3) {
            distance = 3 - (distance - 4);
        }
        return distance;
    };
    return Planet;
}());
exports.Planet = Planet;
