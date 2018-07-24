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
var TokenType;
(function (TokenType) {
    TokenType[TokenType["Roundbooter"] = 0] = "Roundbooter";
    TokenType[TokenType["TechTile"] = 1] = "TechTile";
    TokenType[TokenType["Federation"] = 2] = "Federation";
})(TokenType || (TokenType = {}));
var Request = /** @class */ (function () {
    function Request() {
    }
    return Request;
}());
exports.Request = Request;
