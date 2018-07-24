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
var Race_1 = require("./Race");
var Planet_1 = require("./Planet");
var Benefit_1 = require("./Benefit");
var BuildingLib_1 = require("./BuildingLib");
var Structure_1 = require("./Structure");
var RaceType;
(function (RaceType) {
    RaceType[RaceType["Terrans"] = 0] = "Terrans";
    RaceType[RaceType["Lantids"] = 1] = "Lantids";
    RaceType[RaceType["Xenos"] = 2] = "Xenos";
    RaceType[RaceType["Gleens"] = 3] = "Gleens";
    RaceType[RaceType["Taklons"] = 4] = "Taklons";
    RaceType[RaceType["Ambas"] = 5] = "Ambas";
    RaceType[RaceType["Nevlas"] = 6] = "Nevlas";
    RaceType[RaceType["Itars"] = 7] = "Itars";
    RaceType[RaceType["HadschHallas"] = 8] = "HadschHallas";
    RaceType[RaceType["Ivits"] = 9] = "Ivits";
    RaceType[RaceType["Geodens"] = 10] = "Geodens";
    RaceType[RaceType["Baltaks"] = 11] = "Baltaks";
    RaceType[RaceType["Firaks"] = 12] = "Firaks";
    RaceType[RaceType["Bescods"] = 13] = "Bescods";
})(RaceType = exports.RaceType || (exports.RaceType = {}));
// export type Player = Terrans | Lantids | Xenos,
// Gleens,
// Taklons,
// Ambas,
// Nevlas,
// Itars,
// HadschHallas,
// Ivits,
// Geodens,
// Baltaks,
// Firaks,
// Bescods,
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player(name, raceType) {
        var _this = _super.call(this) || this;
        _this.gaiaFormingCost = 6;
        _this.digCost = 3;
        _this.initializeSpecialPowers();
        _this.name = name;
        _this.race = raceType;
        _this.planets = [];
        _this.numGaia = 0;
        _this.techs = [0, 0, 0, 0, 0, 0];
        _this.techTiles = [];
        _this.federations = [];
        _this.pid = -1; // pid is player id for example 0 1 2 3
        _this.nowBenefits = [];
        _this.incomeBenefits = [];
        _this.planetType = _this.getPlantType(raceType);
        _this.buildings = new BuildingLib_1.BuildingLib(raceType);
        return _this;
    }
    // map race type to plant types
    Player.prototype.getPlantType = function (raceType) {
        if (raceType === RaceType.Terrans || raceType === RaceType.Lantids)
            return Planet_1.PlanetType.Blue;
        if (raceType === RaceType.Xenos || raceType === RaceType.Gleens)
            return Planet_1.PlanetType.Yellow;
        if (raceType === RaceType.Taklons || raceType === RaceType.Ambas)
            return Planet_1.PlanetType.Brown;
        if (raceType === RaceType.HadschHallas || raceType === RaceType.Ivits)
            return Planet_1.PlanetType.Red;
        if (raceType === RaceType.Nevlas || raceType === RaceType.Itars)
            return Planet_1.PlanetType.White;
        if (raceType === RaceType.Geodens || raceType === RaceType.Baltaks)
            return Planet_1.PlanetType.Orange;
        if (raceType === RaceType.Firaks || raceType === RaceType.Bescods)
            return Planet_1.PlanetType.Black;
        if (raceType === RaceType.Nevlas || raceType === RaceType.Itars)
            return Planet_1.PlanetType.White;
        return Planet_1.PlanetType.Blue;
    };
    /**
     * initiallize the lib of special powers
     */
    Player.prototype.initializeSpecialPowers = function () {
    };
    /*
    * Add the benefit into the benefit array by the trigger,
    * notice: this is only add them into the array, the benefit has not been used yet
    * input: benefit
    * output: add the benefit into the array
    * @yalei
    */
    Player.prototype.getBenefit = function (benefit) {
        if (benefit.trigger === 4 /* Income */) {
            this.incomeBenefits.push(benefit);
        }
        if (benefit.trigger === 0 /* Now */) {
            this.nowBenefits.push(benefit);
            // since it is now, so we call the onBenefit at once;
            this.onBenefit(benefit);
        }
        if (benefit.trigger === 6 /* Special */) {
            this.activateSpecialPower(benefit);
        }
    };
    /**
     * the function which will add the amount of resource into players class
     * @param benefit
     */
    Player.prototype.onBenefit = function (benefit) {
        var values = benefit.values;
        var i = 0;
        var value;
        for (; i < values.length; i++) {
            value = values[i];
            if (value.material === Benefit_1.Material.Gold) {
                this.gold += value.quantity;
            }
            if (value.material === Benefit_1.Material.Ore) {
                this.ore += value.quantity;
            }
            if (value.material === Benefit_1.Material.Science) {
                this.science += value.quantity;
            }
            if (value.material === Benefit_1.Material.QIC) {
                this.qic += value.quantity;
            }
            if (value.material === Benefit_1.Material.ExtraPower) {
                this.power.bowl1 += value.quantity;
            }
            if (value.material === Benefit_1.Material.Power) {
                this.chargePower(value.quantity);
            }
            if (value.material === Benefit_1.Material.Dig) { /*lets discuss this part later --- by yalei*/ }
            if (value.material === Benefit_1.Material.VP) {
                this.vp += value.quantity;
            }
            // if(value.material === Material.SpecialDig){ /*what is the special dig? ---by yalei*/ }
            if (value.material === Benefit_1.Material.SpecialRange) {
                this.specialRange += value.quantity;
            }
            if (value.material === Benefit_1.Material.GaiaFormer) {
                this.gaiaformer += value.quantity;
            }
        }
        if (this.gold > 30)
            this.gold = 30;
    };
    /**
     * activate the special power which has this benefit
     * @param benefit
     */
    Player.prototype.activateSpecialPower = function (benefit) {
    };
    Player.prototype.nearDistance = function (hex) {
        var min = 10000;
        for (var i = 0; i < this.planets.length; i++) {
            var d = hex.distance(this.planets[i].loc);
            if (d < min)
                min = d;
        }
        return min;
    };
    Player.prototype.checkPlanetDistance = function (hex) {
        var distance = this.nearDistance(hex);
        if (this.range >= distance) {
            return true;
        }
        else {
            if (this.range + this.qic * 2 >= distance) {
                console.log("checkPanetDistance OK  but need QIC ");
                return true;
            }
        }
        return false;
    };
    // terraforming will cost ore according tech level
    Player.prototype.terraformingCost = function () {
        //// TODO:
        return 3;
    };
    Player.prototype.getAvalibleMine = function () {
        for (var _i = 0, _a = this.buildings.mines; _i < _a.length; _i++) {
            var mine = _a[_i];
            if (mine.status === Structure_1.StructureStatus.Unbuilt)
                return mine;
        }
        return null;
    };
    Player.prototype.getAvalibleStation = function () {
        for (var _i = 0, _a = this.buildings.station; _i < _a.length; _i++) {
            var s = _a[_i];
            if (s.status === Structure_1.StructureStatus.Unbuilt)
                return s;
        }
        return null;
    };
    Player.prototype.getAvalibleLab = function () {
        for (var _i = 0, _a = this.buildings.lab; _i < _a.length; _i++) {
            var l = _a[_i];
            if (l.status === Structure_1.StructureStatus.Unbuilt)
                return l;
        }
        return null;
    };
    Player.prototype.getAvalibleInstitute = function () {
        for (var _i = 0, _a = this.buildings.institute; _i < _a.length; _i++) {
            var i = _a[_i];
            if (i.status === Structure_1.StructureStatus.Unbuilt)
                return i;
        }
        return null;
    };
    Player.prototype.getAvalibleAcademies = function () {
        for (var _i = 0, _a = this.buildings.academies; _i < _a.length; _i++) {
            var a = _a[_i];
            if (a.status === Structure_1.StructureStatus.Unbuilt)
                return a;
        }
        return null;
    };
    Player.prototype.getLastBuiltMine = function () {
        var last = null;
        for (var _i = 0, _a = this.buildings.mines; _i < _a.length; _i++) {
            var mine = _a[_i];
            if (mine.status === Structure_1.StructureStatus.Built)
                last = mine;
        }
        return last;
    };
    Player.prototype.getLastBuiltStation = function () {
        var last = null;
        for (var _i = 0, _a = this.buildings.station; _i < _a.length; _i++) {
            var s = _a[_i];
            if (s.status === Structure_1.StructureStatus.Unbuilt)
                last = s;
        }
        return last;
    };
    Player.prototype.getLastBuiltLab = function () {
        var last = null;
        for (var _i = 0, _a = this.buildings.lab; _i < _a.length; _i++) {
            var l = _a[_i];
            if (l.status === Structure_1.StructureStatus.Unbuilt)
                last = l;
        }
        return last;
    };
    Player.prototype.AffordMine = function () {
        var mine = this.getAvalibleMine();
        if (mine == null)
            return false;
        return this.haveResouces(mine.cost);
        // for(const value : mine.values){
        //
        //
        // }
    };
    /*
    Gold,
    Ore,
    Science,
    QIC,
    Power, // charge power
    ExtraPower,
    VP,
    Dig, // you can buy the dig chance from the store
    SpecialRange, // some special power or round booster can give you temporary range
    GaiaFormer, /
    */
    Player.prototype.haveResouce = function (value) {
        if (value.material === Benefit_1.Material.Gold) {
            return value.quantity <= this.gold;
        }
        if (value.material === Benefit_1.Material.Ore) {
            return value.quantity <= this.ore;
        }
        if (value.material === Benefit_1.Material.Science) {
            return value.quantity <= this.science;
        }
        if (value.material === Benefit_1.Material.QIC) {
            return value.quantity <= this.qic;
        }
        if (value.material === Benefit_1.Material.VP) {
            return value.quantity <= this.vp;
        }
        if (value.material === Benefit_1.Material.GaiaFormer) {
            return value.quantity <= this.gaiaformer;
        }
        return false;
    };
    Player.prototype.payResouce = function (value) {
        if (value.material === Benefit_1.Material.Gold) {
            this.gold -= value.quantity;
            return true;
        }
        if (value.material === Benefit_1.Material.Ore) {
            this.ore -= value.quantity;
            return true;
        }
        if (value.material === Benefit_1.Material.Science) {
            this.science -= value.quantity;
            return true;
        }
        if (value.material === Benefit_1.Material.QIC) {
            this.qic -= value.quantity;
            return true;
        }
        if (value.material === Benefit_1.Material.VP) {
            this.vp -= value.quantity;
            return true;
        }
        if (value.material === Benefit_1.Material.GaiaFormer) {
            this.gaiaformer -= value.quantity;
            return true;
        }
        return false;
    };
    Player.prototype.haveResouces = function (values) {
        for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
            var value = values_1[_i];
            if (this.haveResouce(value) === false) {
                console.log("can not afford sources:");
                console.log(value);
                return false;
            }
        }
        return true;
    };
    Player.prototype.payResouces = function (values) {
        for (var _i = 0, values_2 = values; _i < values_2.length; _i++) {
            var value = values_2[_i];
            if (this.payResouce(value) === false)
                return false;
        }
        return true;
    };
    // terraforming will cost ore according tech level
    Player.prototype.startGaiaProjectCost = function () {
        //// TODO:
        return 6;
    };
    Player.prototype.checkPowerForGaiaProject = function () {
        if (this.power.bowl1 + this.power.bowl2 + this.power.bowl3 >= this.startGaiaProjectCost()) {
            return true;
        }
        else {
            return false;
        }
    };
    Player.prototype.checkPowerForFederation = function (satellite) {
        if (this.power.bowl1 + this.power.bowl2 + this.power.bowl3 >= satellite) {
            return true;
        }
        else {
            return false;
        }
    };
    Player.prototype.transferGaiaPower = function () {
        var cost = this.startGaiaProjectCost();
        this.takePowersAwayFromBowl(cost);
    };
    // used in Federation
    Player.prototype.discardPowersToBuildSatellites = function (satellite) {
        this.takePowersAwayFromBowl(satellite);
    };
    Player.prototype.takePowersAwayFromBowl = function (cost) {
        var amount = cost;
        if (cost > this.power.bowl1) {
            amount = this.power.bowl1;
        }
        this.power.bowl1 -= amount;
        cost -= amount;
        // now do bowl2 -> bowl3
        amount = cost;
        if (cost > this.power.bowl2) {
            amount = this.power.bowl2;
        }
        this.power.bowl2 -= amount;
        cost -= amount;
        if (cost > 0) { // previous check is true, so defintely have enough power to take away
            this.power.bowl2 -= cost;
        }
    };
    /*
    * Add the benefit into the benefit array by the trigger,
    * notice: this is only add them into the array, the benefit has not been used yet
    * input: benefit
    * output: add the benefit into the array
    * @yalei
    */
    Player.prototype.getTrigerBenefit = function (trigger) {
        var result = [];
        if (trigger === 5 /* Pass */) {
            var benefits = this.roundBooster.benefit;
            for (var _i = 0, benefits_1 = benefits; _i < benefits_1.length; _i++) {
                var benefit = benefits_1[_i];
                if (benefit.trigger === 5 /* Pass */) {
                    result.push(benefit);
                }
            }
        }
        return result;
    };
    Player.prototype.onPassBenefit = function () {
        var benefits = this.getTrigerBenefit(5 /* Pass */);
        for (var _i = 0, benefits_2 = benefits; _i < benefits_2.length; _i++) {
            var benefit = benefits_2[_i];
            this.onBenefit(benefit);
        }
    };
    Player.prototype.accessiblePlanets = function () {
        // let hexs : Hex[] = []
        // for(let planet of this.planets){
        //   let neighborings = Hex
        //
        // }
    };
    return Player;
}(Race_1.Race));
exports.Player = Player;
