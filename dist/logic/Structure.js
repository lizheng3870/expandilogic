var Building;
(function (Building) {
    Building[Building["Mine"] = 0] = "Mine";
    Building[Building["Station"] = 1] = "Station";
    Building[Building["Lab"] = 2] = "Lab";
    Building[Building["Academy"] = 3] = "Academy";
    Building[Building["Institute"] = 4] = "Institute";
})(Building || (Building = {}));
var BuildingStatus;
(function (BuildingStatus) {
    BuildingStatus[BuildingStatus["Built"] = 0] = "Built";
    BuildingStatus[BuildingStatus["Unbuilt"] = 1] = "Unbuilt";
})(BuildingStatus || (BuildingStatus = {}));
var Structure = /** @class */ (function () {
    function Structure(type, price, power, benefit) {
        this.location = null;
        this.value = power;
        this.status = BuildingStatus.Unbuilt;
        this.type = type;
        this.cost = price;
        this.benefit = benefit;
    }
    return Structure;
}());
export { Structure, Building };
//# sourceMappingURL=Structure.js.map