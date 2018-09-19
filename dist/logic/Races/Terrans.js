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
var Terrans = /** @class */ (function (_super) {
    __extends(Terrans, _super);
    /**
     * Initialise the starting state of Terrans
     * @param name
     */
    function Terrans(name) {
        var _this = _super.call(this, name) || this;
        _this.setRaceType(Race_1.RaceType.Terrans);
        _this.setPlanetType(Planet_1.PlanetType.Blue);
        _this.techs = [0, 0, 0, 1, 0, 0];
        _this.gaiaformer = 1;
        _this.power.bowl1 = 4;
        //Permanent Incomes
        var ore = new Benefit_1.Benefit(4 /* Income */, null, null, [new Benefit_1.Value(1, Benefit_1.Material.Ore)]);
        var science = new Benefit_1.Benefit(4 /* Income */, null, null, [new Benefit_1.Value(1, Benefit_1.Material.Science)]);
        _this.income.push(ore);
        _this.income.push(science);
        return _this;
    }
    /**
     * Gaia Phase for Terrans goes straight into bowl 2
     */
    Terrans.prototype.GaiaPhase = function () {
        this.power.bowl2 += this.power.gaia;
        for (var _i = 0, _a = this.gaiaProjectPlanets; _i < _a.length; _i++) {
            var planet = _a[_i];
            planet.type = Planet_1.PlanetType.Gaia;
        }
        this.gaiaProjectPlanets = [];
    };
    return Terrans;
}(Race_1.Race));
exports.Terrans = Terrans;
