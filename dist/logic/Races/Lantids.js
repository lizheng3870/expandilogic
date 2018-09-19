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
var Structure_1 = require("../Structure");
var Lantids = /** @class */ (function (_super) {
    __extends(Lantids, _super);
    /**
     * Initialize starting point for Lantids
     * @param name
     */
    function Lantids(name) {
        var _this = _super.call(this, name) || this;
        _this.setRaceType(Race_1.RaceType.Lantids);
        _this.setPlanetType(Planet_1.PlanetType.Blue);
        _this.gold = 13;
        //Permanent Incomes
        var ore = new Benefit_1.Benefit(4 /* Income */, null, null, [new Benefit_1.Value(1, Benefit_1.Material.Ore)]);
        var science = new Benefit_1.Benefit(4 /* Income */, null, null, [new Benefit_1.Value(1, Benefit_1.Material.Science)]);
        _this.income.push(ore);
        _this.income.push(science);
        _this.power.bowl1 = 4;
        _this.power.bowl2 = 0;
        //Player specific buildboards
        var lantidInstitutes = [];
        var values = [new Benefit_1.Value(6, Benefit_1.Material.Gold), new Benefit_1.Value(4, Benefit_1.Material.Ore)];
        var benefit = new Benefit_1.Benefit(4 /* Income */, null, null, [new Benefit_1.Value(4, Benefit_1.Material.Power)]);
        var institute = new Structure_1.Structure(Structure_1.StructureType.Institute, values, 3, benefit);
        lantidInstitutes.push(institute);
        _this.buildBoard.institutes = lantidInstitutes;
        return _this;
    }
    return Lantids;
}(Race_1.Race));
exports.Lantids = Lantids;
