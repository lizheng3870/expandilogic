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
var Nevlas = /** @class */ (function (_super) {
    __extends(Nevlas, _super);
    function Nevlas(name) {
        var _this = _super.call(this, name) || this;
        _this.setRaceType(Race_1.RaceType.Nevlas);
        _this.setPlanetType(Planet_1.PlanetType.White);
        _this.techs = [0, 0, 0, 0, 0, 1];
        _this.getTechBenefit(new Benefit_1.Benefit(4 /* Income */, null, null, [new Benefit_1.Value(1, Benefit_1.Material.Science)]));
        var ore = new Benefit_1.Benefit(4 /* Income */, null, null, [new Benefit_1.Value(1, Benefit_1.Material.Ore)]);
        var science = new Benefit_1.Benefit(4 /* Income */, null, null, [new Benefit_1.Value(1, Benefit_1.Material.Science)]);
        _this.income.push(ore);
        _this.income.push(science);
        _this.buildingLibSpecial();
        return _this;
    }
    Nevlas.prototype.buildingLibSpecial = function () {
        for (var i = 0; i < 3; i++)
            this.buildings.lab[i].benefit = new Benefit_1.Benefit(4 /* Income */, null, null, [new Benefit_1.Value(2, Benefit_1.Material.Power)]);
    };
    return Nevlas;
}(Race_1.Race));
exports.Nevlas = Nevlas;
