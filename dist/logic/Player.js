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
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player(name, raceType) {
        var _this = _super.call(this, raceType) || this;
        _this.name = name;
        _this.passed = false;
        // this.roundBooster = undefined;
        // this.planetType =
        _this.digCost = new Cost([new BuildCost(Material.Ore, 3)]);
        _this.gaiaFormingCost = new Cost([new BuildCost(Material.GaiaFormer, 1), new BuildCost(Material.GaiaFormingPower, 6)]);
        _this.planets = [];
        _this.numGaia = 0;
        _this.techs = [];
        _this.techTiles = [];
        _this.federations = [];
        _this.pid = -1; // pid is player id for example 0 1 2 3
        return _this;
    }
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
//# sourceMappingURL=Player.js.map