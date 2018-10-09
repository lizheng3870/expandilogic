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
var Race_1 = require("../Race");
var Planet_1 = require("../Planet");
var Benefit_1 = require("../Benefit");
var Geodens = /** @class */ (function (_super) {
    __extends(Geodens, _super);
    /**
     * Initialise the starting state of Geodens
     * @param name
     */
    function Geodens(name) {
        var _this = _super.call(this, name) || this;
        _this.setRaceType(Race_1.RaceType.Geodens);
        _this.setPlanetType(Planet_1.PlanetType.Orange);
        _this.techs = [1, 0, 0, 0, 0, 0];
        _this.getTechBenefit(new Benefit_1.Benefit(0 /* Now */, null, null, [new Benefit_1.Value(2, Benefit_1.Material.Ore)]));
        var ore = new Benefit_1.Benefit(4 /* Income */, null, null, [new Benefit_1.Value(1, Benefit_1.Material.Ore)]);
        var science = new Benefit_1.Benefit(4 /* Income */, null, null, [new Benefit_1.Value(1, Benefit_1.Material.Science)]);
        _this.income.push(ore);
        _this.income.push(science);
        return _this;
    }
    return Geodens;
}(Race_1.Race));
exports.Geodens = Geodens;
