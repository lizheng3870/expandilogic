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
var Itars = /** @class */ (function (_super) {
    __extends(Itars, _super);
    /**
     * Initialise the starting state of Itars
     * @param name
     */
    function Itars(name) {
        var _this = _super.call(this, name) || this;
        _this.setRaceType(Race_1.RaceType.Itars);
        _this.setPlanetType(Planet_1.PlanetType.White);
        _this.ore = 5;
        _this.power.bowl1 = 4;
        //Permanent Incomes
        var ore = new Benefit_1.Benefit(4 /* Income */, null, null, [new Benefit_1.Value(1, Benefit_1.Material.Ore)]);
        var science = new Benefit_1.Benefit(4 /* Income */, null, null, [new Benefit_1.Value(1, Benefit_1.Material.Science)]);
        var power = new Benefit_1.Benefit(4 /* Income */, null, null, [new Benefit_1.Value(1, Benefit_1.Material.ExtraPower)]);
        _this.income.push(ore);
        _this.income.push(science);
        _this.income.push(power);
        //Player specific Buildboards
        /**
        * Academy types on Faction Board
        */
        var itarsAcademy = [];
        {
            var values = [new Benefit_1.Value(6, Benefit_1.Material.Gold), new Benefit_1.Value(6, Benefit_1.Material.Ore)];
            var benefit1 = new Benefit_1.Benefit(4 /* Income */, null, null, [new Benefit_1.Value(3, Benefit_1.Material.Science)]);
            var benefit2 = new Benefit_1.Benefit(6 /* Special */, null, null, [new Benefit_1.Value(1, Benefit_1.Material.QIC)]);
            var academy1 = new Structure_1.Structure(Structure_1.StructureType.Academy, values, 3, benefit1);
            var academy2 = new Structure_1.Structure(Structure_1.StructureType.Academy, values, 3, benefit2);
            itarsAcademy.push(academy1);
            itarsAcademy.push(academy2);
        }
        _this.buildBoard.academies = itarsAcademy;
        return _this;
    }
    return Itars;
}(Race_1.Race));
exports.Itars = Itars;
