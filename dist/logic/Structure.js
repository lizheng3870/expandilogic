"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StructureType;
(function (StructureType) {
    StructureType[StructureType["Mine"] = 0] = "Mine";
    StructureType[StructureType["Station"] = 1] = "Station";
    StructureType[StructureType["Lab"] = 2] = "Lab";
    StructureType[StructureType["Academy"] = 3] = "Academy";
    StructureType[StructureType["Institute"] = 4] = "Institute";
})(StructureType || (StructureType = {}));
exports.StructureType = StructureType;
var StructureStatus;
(function (StructureStatus) {
    StructureStatus[StructureStatus["Built"] = 0] = "Built";
    StructureStatus[StructureStatus["Unbuilt"] = 1] = "Unbuilt";
})(StructureStatus || (StructureStatus = {}));
exports.StructureStatus = StructureStatus;
var Structure = /** @class */ (function () {
    function Structure(type, price, power, benefit) {
        this.location = null;
        this.value = power;
        this.status = StructureStatus.Unbuilt;
        this.type = type;
        this.cost = price;
        this.benefit = benefit;
    }
    /**
     * when get or loose the tech tile of changing value, this function will work
     * @param value
     */
    Structure.prototype.changePowerValue = function (value) {
        this.value = value;
    };
    Structure.prototype.changeBenefit = function (newBenefit) {
        this.benefit = newBenefit;
    };
    return Structure;
}());
exports.Structure = Structure;
