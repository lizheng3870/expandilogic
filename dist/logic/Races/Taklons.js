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
var Taklons = /** @class */ (function (_super) {
    __extends(Taklons, _super);
    /**
     * Initialise the starting state of Taklons
     * @param name
     */
    function Taklons(name) {
        var _this = _super.call(this, name) || this;
        _this.setRaceType(Race_1.RaceType.Taklons);
        _this.setPlanetType(Planet_1.PlanetType.Brown);
        var ore = new Benefit_1.Benefit(4 /* Income */, null, null, [new Benefit_1.Value(1, Benefit_1.Material.Ore)]);
        var science = new Benefit_1.Benefit(4 /* Income */, null, null, [new Benefit_1.Value(1, Benefit_1.Material.Science)]);
        _this.income.push(ore);
        _this.income.push(science);
        return _this;
    }
    /**
     * Taklons has a power stone that changes the way
     * in which the powers move around when charging
     * - todo
     * - overrides the parent class method
     * @param charge
     */
    Taklons.prototype.chargePower = function (charge) {
    };
    return Taklons;
}(Race_1.Race));
exports.Taklons = Taklons;
