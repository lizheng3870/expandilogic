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
var Ivits = /** @class */ (function (_super) {
    __extends(Ivits, _super);
    /**
     * Initialise the starting state of Ivits
     * @param name
     */
    function Ivits(name) {
        var _this = _super.call(this, name) || this;
        _this.setRaceType(Race_1.RaceType.Ivits);
        _this.setPlanetType(Planet_1.PlanetType.Red);
        _this.techs = [0, 0, 0, 0, 0, 0];
        /**
         * Permanent Incomes
         */
        var ore = new Benefit_1.Benefit(4 /* Income */, null, null, [new Benefit_1.Value(1, Benefit_1.Material.Ore)]);
        var science = new Benefit_1.Benefit(4 /* Income */, null, null, [new Benefit_1.Value(1, Benefit_1.Material.Science)]);
        var qic = new Benefit_1.Benefit(4 /* Income */, null, null, [new Benefit_1.Value(1, Benefit_1.Material.QIC)]);
        _this.income.push(ore);
        _this.income.push(science);
        _this.income.push(qic);
        //Player specific buildboards
        var ivitsInstitutes = [];
        var values = [];
        var benefit = new Benefit_1.Benefit(4 /* Income */, null, null, [new Benefit_1.Value(4, Benefit_1.Material.Power), new Benefit_1.Value(1, Benefit_1.Material.ExtraPower)]);
        var institute = new Structure_1.Structure(Structure_1.StructureType.Institute, values, 3, benefit);
        ivitsInstitutes.push(institute);
        _this.buildBoard.institutes = ivitsInstitutes;
        return _this;
    }
    return Ivits;
}(Race_1.Race));
exports.Ivits = Ivits;
