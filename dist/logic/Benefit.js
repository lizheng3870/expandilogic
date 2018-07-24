"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Material;
(function (Material) {
    Material[Material["Gold"] = 0] = "Gold";
    Material[Material["Ore"] = 1] = "Ore";
    Material[Material["Science"] = 2] = "Science";
    Material[Material["QIC"] = 3] = "QIC";
    Material[Material["Power"] = 4] = "Power";
    Material[Material["ExtraPower"] = 5] = "ExtraPower";
    Material[Material["VP"] = 6] = "VP";
    Material[Material["Dig"] = 7] = "Dig";
    Material[Material["SpecialRange"] = 8] = "SpecialRange";
    Material[Material["GaiaFormer"] = 9] = "GaiaFormer";
})(Material || (Material = {}));
exports.Material = Material;
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
})(Count || (Count = {}));
exports.Count = Count;
var Value = /** @class */ (function () {
    function Value(quantity, material) {
        this.quantity = quantity;
        this.material = material;
    }
    return Value;
}());
exports.Value = Value;
var BuildingType;
(function (BuildingType) {
    BuildingType[BuildingType["Mine"] = 0] = "Mine";
    // there is a techtile which is get 3 VP when you build a mine on gaia;
    // and there is a techtile which is get 3 VP when you build a mine;
    // so we need a new type MineOnGaia to distinguish them;
    BuildingType[BuildingType["MineOnGaia"] = 1] = "MineOnGaia";
    BuildingType[BuildingType["TradingStation"] = 2] = "TradingStation";
    BuildingType[BuildingType["Lab"] = 3] = "Lab";
    BuildingType[BuildingType["Academy"] = 4] = "Academy";
    BuildingType[BuildingType["Institute"] = 5] = "Institute";
})(BuildingType || (BuildingType = {}));
exports.BuildingType = BuildingType;
var Benefit = /** @class */ (function () {
    function Benefit(trigger, count, object, values) {
        this.trigger = trigger;
        this.count = count;
        this.object = object;
        this.values = values;
    }
    return Benefit;
}());
exports.Benefit = Benefit;
