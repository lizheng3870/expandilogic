var Material;
(function (Material) {
    Material[Material["Gold"] = 0] = "Gold";
    Material[Material["Ore"] = 1] = "Ore";
    Material[Material["Science"] = 2] = "Science";
    Material[Material["QIC"] = 3] = "QIC";
    Material[Material["Power"] = 4] = "Power";
    Material[Material["ExtraPower"] = 5] = "ExtraPower";
    Material[Material["Dig"] = 6] = "Dig";
    Material[Material["VP"] = 7] = "VP";
    Material[Material["SpecialDig"] = 8] = "SpecialDig";
    Material[Material["SpecialRange"] = 9] = "SpecialRange";
    Material[Material["GaiaFormer"] = 10] = "GaiaFormer";
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
    Count[Count["Sectors"] = 0] = "Sectors";
    Count[Count["Mines"] = 1] = "Mines";
    Count[Count["TradingStations"] = 2] = "TradingStations";
    Count[Count["Labs"] = 3] = "Labs";
    Count[Count["BigBuildings"] = 4] = "BigBuildings";
    Count[Count["Feds"] = 5] = "Feds";
    Count[Count["PlanetTypes"] = 6] = "PlanetTypes";
    Count[Count["Satellites"] = 7] = "Satellites";
    Count[Count["Gaia"] = 8] = "Gaia";
    Count[Count["None"] = 9] = "None"; // this none means the benefit do not need to count anything
})(Count || (Count = {}));
var Structure;
(function (Structure) {
    Structure[Structure["Mine"] = 0] = "Mine";
    // there is a techtile which is get 3 VP when you build a mine on gaia;
    // and there is a techtile which is get 3 VP when you build a mine;
    // so we need a new type MineOnGaia to distinguish them;
    Structure[Structure["MineOnGaia"] = 1] = "MineOnGaia";
    Structure[Structure["TradingStation"] = 2] = "TradingStation";
    Structure[Structure["Lab"] = 3] = "Lab";
    Structure[Structure["Academy"] = 4] = "Academy";
    Structure[Structure["Institute"] = 5] = "Institute";
    Structure[Structure["None"] = 6] = "None"; // this none means the benefit do not require the building type
})(Structure || (Structure = {}));
var Benefit = /** @class */ (function () {
    function Benefit(trigger, count, object, benefits) {
        this.trigger = trigger;
        this.count = count;
        this.object = object;
        this.benefits = benefits;
    }
    return Benefit;
}());
export { Benefit, Value, Material, Count, Structure };
