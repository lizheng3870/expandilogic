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
var Baltaks = /** @class */ (function (_super) {
    __extends(Baltaks, _super);
    /**
     * Initialise the starting state of Taklons
     * @param name
     */
    function Baltaks(name) {
        var _this = _super.call(this, name) || this;
        _this.setRaceType(Race_1.RaceType.Baltaks);
        _this.setPlanetType(Planet_1.PlanetType.Yellow);
        _this.techs = [0, 0, 0, 1, 0, 0];
        _this.getTechBenefit(new Benefit_1.Benefit(0 /* Now */, null, null, [new Benefit_1.Value(1, Benefit_1.Material.GaiaFormer)]));
        _this.power.bowl2 = 2;
        var ore = new Benefit_1.Benefit(4 /* Income */, null, null, [new Benefit_1.Value(1, Benefit_1.Material.Ore)]);
        var science = new Benefit_1.Benefit(4 /* Income */, null, null, [new Benefit_1.Value(1, Benefit_1.Material.Science)]);
        _this.income.push(ore);
        _this.income.push(science);
        /**
         * Academy types for Baltaks
         */
        {
            var baltaksAcademies = [];
            var values = [new Benefit_1.Value(6, Benefit_1.Material.Gold), new Benefit_1.Value(6, Benefit_1.Material.Ore)];
            var benefit1 = new Benefit_1.Benefit(4 /* Income */, null, null, [new Benefit_1.Value(2, Benefit_1.Material.Science)]);
            var benefit2 = new Benefit_1.Benefit(6 /* Special */, null, null, [new Benefit_1.Value(4, Benefit_1.Material.Gold)]);
            var academy1 = new Structure_1.Structure(Structure_1.StructureType.Academy, values, 3, benefit1);
            var academy2 = new Structure_1.Structure(Structure_1.StructureType.Academy, values, 3, benefit2);
            baltaksAcademies.push(academy1);
            baltaksAcademies.push(academy2);
            _this.buildBoard.academies = baltaksAcademies;
        }
        return _this;
    }
    return Baltaks;
}(Race_1.Race));
exports.Baltaks = Baltaks;
