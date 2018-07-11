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
import { Race } from './Race';
import { Material } from './Benefit';
import { HexUtils } from 'react-hexgrid';
import { BuildCost, Cost } from './Cost';
import { SpecialPower } from './SpecialPower';
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player(name, raceType) {
        var _this = _super.call(this, raceType) || this;
        _this.initializeSpecialPowers();
        _this.name = name;
        _this.passed = false;
        // this.roundBooster = undefined;
        // this.planetType =
        _this.digCost = new Cost([new BuildCost(Material.Ore, 3)]);
        _this.gaiaFormingCost = new Cost([new BuildCost(Material.GaiaFormer, 1), new BuildCost(Material.Power, 6)]);
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
        var powerTypes = [0 /* QIC1 */,
            1 /* Dig1 */,
            2 /* SpecialRange3 */,
            3 /* Power4 */,
            4 /* QIC1Gold5 */,
            5 /* Ore3 */,
            6 /* Science3 */];
        for (var i = 0; i < powerTypes.length; i++) {
            var specialPower = new SpecialPower(powerTypes[i]);
            this.specialPowers.push(specialPower);
        }
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
            _super.prototype.onBenefit.call(this, benefit);
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
        var values = benefit.benefits;
        if (values.length === 1) {
            var value = values[0];
            if (value.quantity === 1 && value.material === Material.QIC) {
                this.specialPowers[0].activatePower();
            }
            if (value.quantity === 1 && value.material === Material.SpecialDig) {
                this.specialPowers[1].activatePower();
            }
            if (value.quantity === 3 && value.material === Material.SpecialRange) {
                this.specialPowers[2].activatePower();
            }
            if (value.quantity === 4 && value.material === Material.Power) {
                this.specialPowers[3].activatePower();
            }
            if (value.quantity === 3 && value.material === Material.Ore) {
                this.specialPowers[5].activatePower();
            }
            if (value.quantity === 3 && value.material === Material.Science) {
                this.specialPowers[6].activatePower();
            }
        }
        else if (values.length === 2) {
            this.specialPowers[4].activatePower();
        }
        console.log("no such special power");
        return;
    };
    /*
      @param
      here's what the function does
    */
    // cleanUp(player){ // this for caluclate techtile (federations) vp after round  for player
    // }
    Player.prototype.nearDistance = function (hex) {
        var min = 10000;
        for (var i = 0; i < this.planets.length; i++) {
            var d = HexUtils.distance(this.planets[i].hex, hex);
            if (d < min) {
                min = d;
            }
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
                console.log("checkPlanetDistance OK  but need QIC ");
                return true;
            }
        }
        return false;
    };
    return Player;
}(Race));
export { Player };
