"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Benefit_1 = require("./Benefit");
var FederationTokenType;
(function (FederationTokenType) {
    FederationTokenType[FederationTokenType["vp12"] = 0] = "vp12";
    FederationTokenType[FederationTokenType["vp8qic1"] = 1] = "vp8qic1";
    FederationTokenType[FederationTokenType["vp8pw2"] = 2] = "vp8pw2";
    FederationTokenType[FederationTokenType["vp7ore2"] = 3] = "vp7ore2";
    FederationTokenType[FederationTokenType["vp7gold6"] = 4] = "vp7gold6";
    FederationTokenType[FederationTokenType["vp6Sci2"] = 5] = "vp6Sci2";
    FederationTokenType[FederationTokenType["ore1Sci1gold2"] = 6] = "ore1Sci1gold2"; // id 6
})(FederationTokenType || (FederationTokenType = {}));
exports.FederationTokenType = FederationTokenType;
var FederationToken = /** @class */ (function () {
    function FederationToken(type) {
        this.used = false;
        this.type = type;
        if (type === FederationTokenType.vp12) {
            this.used = true;
            this.benefit = new Benefit_1.Benefit(0 /* Now */, null, null, [new Benefit_1.Value(12, Benefit_1.Material.VP)]);
        }
        if (type === FederationTokenType.vp8qic1) {
            this.benefit = new Benefit_1.Benefit(0 /* Now */, null, null, [new Benefit_1.Value(8, Benefit_1.Material.VP), new Benefit_1.Value(1, Benefit_1.Material.QIC)]);
        }
        if (type === FederationTokenType.vp8pw2) {
            this.benefit = new Benefit_1.Benefit(0 /* Now */, null, null, [new Benefit_1.Value(8, Benefit_1.Material.VP), new Benefit_1.Value(2, Benefit_1.Material.Power)]);
        }
        if (type === FederationTokenType.vp7ore2) {
            this.benefit = new Benefit_1.Benefit(0 /* Now */, null, null, [new Benefit_1.Value(7, Benefit_1.Material.VP), new Benefit_1.Value(2, Benefit_1.Material.Ore)]);
        }
        if (type === FederationTokenType.vp7gold6) {
            this.benefit = new Benefit_1.Benefit(0 /* Now */, null, null, [new Benefit_1.Value(7, Benefit_1.Material.VP), new Benefit_1.Value(6, Benefit_1.Material.Gold)]);
        }
        if (type === FederationTokenType.vp6Sci2) {
            this.benefit = new Benefit_1.Benefit(0 /* Now */, null, null, [new Benefit_1.Value(6, Benefit_1.Material.VP), new Benefit_1.Value(2, Benefit_1.Material.Science)]);
        }
        if (type === FederationTokenType.ore1Sci1gold2) {
            this.benefit = new Benefit_1.Benefit(0 /* Now */, null, null, [new Benefit_1.Value(2, Benefit_1.Material.Gold), new Benefit_1.Value(1, Benefit_1.Material.Science), new Benefit_1.Value(1, Benefit_1.Material.Ore)]);
        }
    }
    /**
     * for output to screen purpose. return a readable string
     */
    FederationToken.prototype.getFedName = function () {
        if (this.type === FederationTokenType.vp12)
            return "12 VP";
        if (this.type === FederationTokenType.vp8qic1)
            return "8 VP, 1 qic";
        if (this.type === FederationTokenType.vp8pw2)
            return "8 VP, 2 power";
        if (this.type === FederationTokenType.vp7ore2)
            return "7 VP, 2 ore";
        if (this.type === FederationTokenType.vp7gold6)
            return "7 VP, 6 gold";
        if (this.type === FederationTokenType.vp6Sci2)
            return "6 VP, 2 science";
        if (this.type === FederationTokenType.ore1Sci1gold2)
            return "1 ore, 2 gold, 1 science";
        return "invalid federation type";
    };
    return FederationToken;
}());
exports.FederationToken = FederationToken;
var Federation = /** @class */ (function () {
    function Federation() {
        this.used = false;
        // /**
        //  * select planets, then form a federation.
        //  * TODO: mark planets as used in a federation, so that they can't be used in a 2nd federation
        //  * TODO: satellites?
        //  * @param planets1
        //  * @param fedName
        //  */
        // public formFederation(planets1:Planet[], player: Player){
        //   this.addPlanets(planets1);
        //   if(this.getTotalPower() >= 7){
        //     player.getFedrationBenefit(this.benefit);
        //   }
        //   return "unable to form federation because power < 7"
        // }
        // //add planets used in a federation
        // public addPlanets(planets1:Planet[]){
        //   for(let i = 0; i < planets1.length; i++){
        //     this.planets.push(planets1[i]);
        //   }
        // }
        // use the federation to go into the top spot on a tech track
        // public spend (){
        //   if (this.used){
        //     throw new Error ("can't spend a federation twice");
        //   } else {
        //     this.used = true;
        //   }
        // }
        // /**
        //  * when buy a specific stuff in the store, the grey fed can turn green
        //  */
        // public turnGreen(){
        //   this.used = false;
        // }
        //
        // // return the total number of buildings in the federation
        // public getTotalBuildings(): number{
        //   return this.planets.length;
        // }
        // public getTotalPower(): number{
        //   let sum = 0;
        //   this.planets.forEach(p => {
        //     sum += p.buildingPower();
        //   })
        //   return sum;
        // }
    }
    return Federation;
}());
exports.Federation = Federation;
var FederationLib = /** @class */ (function () {
    function FederationLib(random) {
        if (random === void 0) { random = true; }
        this.tokens = [];
        this.load(random);
    }
    FederationLib.prototype.load = function (random) {
        var specialID = 0;
        if (random)
            specialID = Math.floor(Math.random() * 6);
        for (var j = 0; j < 6; j++) {
            for (var i = 0; i < 3; i++) {
                if (j === specialID) {
                    this.specialOne = new FederationToken(j);
                }
                else {
                    this.tokens.push(new FederationToken(j));
                }
            }
        }
        this.gleensFed = new FederationToken(6);
    };
    FederationLib.prototype.hasFederationToken = function (type) {
        for (var _i = 0, _a = this.tokens; _i < _a.length; _i++) {
            var token = _a[_i];
            if (token.type === type)
                return true;
        }
        return false;
    };
    // public hasDigLaneSpeicalFederationToken(){
    //   return this.specialOne.length > 0
    // }
    FederationLib.prototype.getFederationToken = function (type) {
        var found = false;
        var index = 0;
        for (var _i = 0, _a = this.tokens; _i < _a.length; _i++) {
            var token = _a[_i];
            if (token.type === type) {
                found = true;
                break;
            }
            index++;
        }
        var tmp = null;
        // console.log(found + " *************************** " + index + " *** " + this.tokens[index]);
        if (found) {
            tmp = this.tokens[index];
            this.tokens.splice(index, 1);
        }
        return tmp;
    };
    FederationLib.prototype.getDigLaneSpeicalFederationToken = function () {
        // let tmp = this.specialOne[0];
        // this.specialOne.splice(0, 1);
        // return tmp;
        return this.specialOne;
    };
    return FederationLib;
}());
exports.FederationLib = FederationLib;
