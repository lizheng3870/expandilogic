var Material;
(function (Material) {
    Material[Material["Gold"] = 0] = "Gold";
    Material[Material["Ore"] = 1] = "Ore";
    Material[Material["Science"] = 2] = "Science";
    Material[Material["QIC"] = 3] = "QIC";
    Material[Material["Power"] = 4] = "Power";
    //  ExtraPower,
    Material[Material["Charge"] = 5] = "Charge";
    Material[Material["GaiaFormingPower"] = 6] = "GaiaFormingPower";
    Material[Material["Dig"] = 7] = "Dig";
    Material[Material["VP"] = 8] = "VP";
    Material[Material["SpecialDig"] = 9] = "SpecialDig";
    Material[Material["SpecialRange"] = 10] = "SpecialRange";
    Material[Material["GaiaFormer"] = 11] = "GaiaFormer";
})(Material || (Material = {}));
var Value = /** @class */ (function () {
    function Value(quantity, material) {
        this.quantity = quantity;
        this.material = material;
    }
    return Value;
}());
var Count;
(function (Count) {
    Count["Sectors"] = "sectors";
    Count["Mines"] = "mines";
    Count["TradingStations"] = "tradingstations";
    Count["Labs"] = "labs";
    Count["BigBuildings"] = "bigbuildings";
    Count["Feds"] = "feds";
    Count["PlanetTypes"] = "planetTypes";
    Count["Satellites"] = "satellites";
    Count["Gaia"] = "gaia";
    Count["None"] = "none";
})(Count || (Count = {}));
var Struct;
(function (Struct) {
    Struct["Mine"] = "mine";
    Struct["TradingStation"] = "trading";
    Struct["Lab"] = "Lab";
    Struct["Academy"] = "academy";
    Struct["Institute"] = "institute";
    Struct["None"] = "none";
})(Struct || (Struct = {}));
var Benefit = /** @class */ (function () {
    function Benefit(trigger, count, object, benefits) {
        this.trigger = trigger;
        this.count = count;
        this.object = object;
        this.benefits = benefits;
    }
    return Benefit;
}());
export { Benefit, Value, Material, Count, Struct };
//# sourceMappingURL=Benefit.js.map