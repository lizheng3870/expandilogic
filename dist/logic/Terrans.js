"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Race_1 = require("./Race");
var Planet_1 = require("./Planet");
var Player_1 = require("./Player");
var Terrans = /** @class */ (function (_super) {
    __extends(Terrans, _super);
    function Terrans() {
        var _this = _super.call(this) || this;
        _this.setRaceType(Player_1.RaceType.Terrans);
        _this.setPlanetType(Planet_1.PlanetType.Blue);
        return _this;
    }
    return Terrans;
}(Race_1.Race));
exports.Terrans = Terrans;
