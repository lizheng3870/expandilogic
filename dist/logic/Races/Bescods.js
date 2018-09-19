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
var Bescods = /** @class */ (function (_super) {
    __extends(Bescods, _super);
    /**
     * Initialise the starting state of Bescods
     * @param name
     */
    function Bescods(name) {
        var _this = _super.call(this, name) || this;
        _this.setRaceType(Race_1.RaceType.Bescods);
        _this.setPlanetType(Planet_1.PlanetType.Black);
        _this.ore = 4;
        _this.science = 1;
        var ore = new Benefit_1.Benefit(4 /* Income */, null, null, [new Benefit_1.Value(1, Benefit_1.Material.Ore)]);
        var science = new Benefit_1.Benefit(4 /* Income */, null, null, [new Benefit_1.Value(1, Benefit_1.Material.Science)]);
        _this.income.push(ore);
        _this.income.push(science);
        /**
         * Player specific buildboards
         * Note: For Bescods, Institute in updated from a Lab
         * Academies are updated from a station
         */
        var stations = [];
        var labs = [];
        // let academies: Structure[] = [];
        var institutes = [];
        // Stations
        for (var i = 1; i <= 4; i++) {
            var bescodStation = new Structure_1.Structure(Structure_1.StructureType.Station, [new Benefit_1.Value(3, Benefit_1.Material.Gold),
                new Benefit_1.Value(2, Benefit_1.Material.Ore)], 2, new Benefit_1.Benefit(4 /* Income */, null, null, [new Benefit_1.Value(1, Benefit_1.Material.Science)]));
            stations.push(bescodStation);
        }
        _this.buildBoard.stations = stations;
        // Labs 
        {
            var values_1 = [new Benefit_1.Value(5, Benefit_1.Material.Gold), new Benefit_1.Value(3, Benefit_1.Material.Ore)];
            var lab1 = new Structure_1.Structure(Structure_1.StructureType.Lab, values_1, 2, new Benefit_1.Benefit(4 /* Income */, null, null, [new Benefit_1.Value(3, Benefit_1.Material.Gold)]));
            labs.push(lab1);
            var lab2 = new Structure_1.Structure(Structure_1.StructureType.Station, values_1, 2, new Benefit_1.Benefit(4 /* Income */, null, null, [new Benefit_1.Value(4, Benefit_1.Material.Gold)]));
            labs.push(lab2);
            var lab3 = new Structure_1.Structure(Structure_1.StructureType.Station, values_1, 2, new Benefit_1.Benefit(4 /* Income */, null, null, [new Benefit_1.Value(5, Benefit_1.Material.Gold)]));
            labs.push(lab3);
        }
        // Academies
        // {
        //     let values: Value[] = [new Value(6, Material.Gold),  new Value(6, Material.Ore)];
        //     let academy1 = new Structure(StructureType.Academy, values, 3, new Benefit(Trigger.Income, null, null, [new Value(2, Material.Science)]));
        //     academies.push(academy1);
        //     let academy2 = new Structure(StructureType.Academy, values, 3, new Benefit(Trigger.Special, null, null, [new Value(1, Material.QIC)]));
        //     academies.push(academy2);
        //     this.buildBoard.academies = 
        // }
        //Institute
        var values = [new Benefit_1.Value(6, Benefit_1.Material.Gold), new Benefit_1.Value(4, Benefit_1.Material.Ore)];
        var benefit = new Benefit_1.Benefit(4 /* Income */, null, null, [new Benefit_1.Value(2, Benefit_1.Material.ExtraPower), new Benefit_1.Value(4, Benefit_1.Material.Power)]);
        var bescodInstitute = new Structure_1.Structure(Structure_1.StructureType.Institute, values, 3, benefit);
        institutes.push(bescodInstitute);
        _this.buildBoard.institutes = institutes;
        return _this;
    }
    return Bescods;
}(Race_1.Race));
exports.Bescods = Bescods;
