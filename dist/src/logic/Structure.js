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
var StructureType = /** @class */ (function () {
    function StructureType(type, price, power, benefit) {
        this.location = null;
        this.value = power;
        this.status = BuildingStatus.Unbuilt;
        this.type = type;
        this.cost = price;
        this.benefit = benefit;
    }
    /**
     * when get or loose the techtile of changing value, this function will work
     * @param value
     */
    StructureType.prototype.changePowerValue = function (value) {
        this.value = value;
    };
    return StructureType;
}());
export { StructureType, Building };
