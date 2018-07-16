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
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player(name, raceType) {
        if (raceType === void 0) { raceType = null; }
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
        return _this;
    }
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
            // super.onBenefit(benefit);
        }
        if (benefit.trigger === 6 /* Special */) {
            this.activateSpecialPower(benefit);
        }
    };
    /**
     * activate the special power which has this benefit
     * @param benefit
     */
    Player.prototype.activateSpecialPower = function (benefit) {
    };
    return Player;
}(Race_1.Race));
exports.Player = Player;
