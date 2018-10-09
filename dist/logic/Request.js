"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RequestType;
(function (RequestType) {
    RequestType[RequestType["Action"] = 0] = "Action";
    RequestType[RequestType["Roundbooter"] = 1] = "Roundbooter";
    RequestType[RequestType["FirstStructures"] = 2] = "FirstStructures";
})(RequestType || (RequestType = {}));
exports.RequestType = RequestType;
var UpgradeType;
(function (UpgradeType) {
    UpgradeType[UpgradeType["MineToStation"] = 0] = "MineToStation";
    UpgradeType[UpgradeType["StationToInstitute"] = 1] = "StationToInstitute";
    UpgradeType[UpgradeType["StationToLab"] = 2] = "StationToLab";
    UpgradeType[UpgradeType["LabToAcademy"] = 3] = "LabToAcademy";
})(UpgradeType || (UpgradeType = {}));
exports.UpgradeType = UpgradeType;
var SpecialActionSource;
(function (SpecialActionSource) {
    SpecialActionSource[SpecialActionSource["RoundBooster"] = 0] = "RoundBooster";
    SpecialActionSource[SpecialActionSource["TechTile"] = 1] = "TechTile";
    SpecialActionSource[SpecialActionSource["LastInstitute"] = 2] = "LastInstitute";
    SpecialActionSource[SpecialActionSource["LastAcademy"] = 3] = "LastAcademy";
})(SpecialActionSource || (SpecialActionSource = {}));
exports.SpecialActionSource = SpecialActionSource;
var TechLaneType;
(function (TechLaneType) {
    TechLaneType[TechLaneType["Dig"] = 0] = "Dig";
    TechLaneType[TechLaneType["Range"] = 1] = "Range";
    TechLaneType[TechLaneType["QIC"] = 2] = "QIC";
    TechLaneType[TechLaneType["Gaia"] = 3] = "Gaia";
    TechLaneType[TechLaneType["Resource"] = 4] = "Resource";
    TechLaneType[TechLaneType["Science"] = 5] = "Science";
})(TechLaneType || (TechLaneType = {}));
exports.TechLaneType = TechLaneType;
var Request = /** @class */ (function () {
    function Request() {
        this.path = []; // for Federation
    }
    return Request;
}());
exports.Request = Request;
