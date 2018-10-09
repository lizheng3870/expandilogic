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
var Ambas = /** @class */ (function (_super) {
    __extends(Ambas, _super);
    /**
     * Initialise the starting state of Ambas
     * @param name
     */
    function Ambas(name) {
        var _this = _super.call(this, name) || this;
        _this.setRaceType(Race_1.RaceType.Ambas);
        _this.setPlanetType(Planet_1.PlanetType.Brown);
        _this.techs = [0, 1, 0, 0, 0, 0];
        _this.getTechBenefit(new Benefit_1.Benefit(0 /* Now */, null, null, [new Benefit_1.Value(1, Benefit_1.Material.QIC)]));
        var ore = new Benefit_1.Benefit(4 /* Income */, null, null, [new Benefit_1.Value(2, Benefit_1.Material.Ore)]);
        var science = new Benefit_1.Benefit(4 /* Income */, null, null, [new Benefit_1.Value(1, Benefit_1.Material.Science)]);
        _this.income.push(ore);
        _this.income.push(science);
        //Player specific buildboards
        var ambasInstitute = [];
        //Institute
        var values = [new Benefit_1.Value(6, Benefit_1.Material.Gold), new Benefit_1.Value(4, Benefit_1.Material.Ore)];
        var benefit = new Benefit_1.Benefit(4 /* Income */, null, null, [new Benefit_1.Value(2, Benefit_1.Material.ExtraPower), new Benefit_1.Value(4, Benefit_1.Material.Power)]);
        var raceInstitute = new Structure_1.Structure(Structure_1.StructureType.Institute, values, 3, benefit);
        ambasInstitute.push(raceInstitute);
        _this.buildBoard.institutes = ambasInstitute;
        return _this;
    }
    return Ambas;
}(Race_1.Race));
exports.Ambas = Ambas;
