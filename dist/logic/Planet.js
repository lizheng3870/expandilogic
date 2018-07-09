var PlanetType;
(function (PlanetType) {
    PlanetType[PlanetType["Red"] = 0] = "Red";
    PlanetType[PlanetType["Orange"] = 1] = "Orange";
    PlanetType[PlanetType["Yellow"] = 2] = "Yellow";
    PlanetType[PlanetType["Green"] = 3] = "Green";
    PlanetType[PlanetType["Blue"] = 4] = "Blue";
    PlanetType[PlanetType["Purple"] = 5] = "Purple";
    PlanetType[PlanetType["Brown"] = 6] = "Brown";
    PlanetType[PlanetType["White"] = 7] = "White";
    PlanetType[PlanetType["Black"] = 8] = "Black";
    PlanetType[PlanetType["Lost"] = 9] = "Lost";
    PlanetType[PlanetType["Gaiaformer"] = 10] = "Gaiaformer";
})(PlanetType || (PlanetType = {}));
var Planet = /** @class */ (function () {
    //  public type : PlanetType
    function Planet(loc, type) {
        this.type = type;
        this.loc = loc;
    }
    Planet.prototype.terraformingCalculate = function (player) {
        if (this.type === PlanetType.Purple) {
            console.log("Transdim, need  gaia project ");
            return 1000000;
        }
        if (this.type === PlanetType.Green) {
            console.log("Gaia planet need one QIC");
            return 0;
        }
        if (this.type === PlanetType.Gaiaformer) { // Gaiaformer
            console.log("nice Gaiaformer, no terraforming cost");
            return 0;
        }
        var distance = Math.abs(this.type - player.planetType);
        if (distance > 3) {
            distance = 3 - (distance - 4);
        }
    };
    return Planet;
}());
export { Planet, PlanetType };
//# sourceMappingURL=Planet.js.map