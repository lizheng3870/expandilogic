import { PlanetType } from './Planet';
import { BuildingLib } from './BuildingLib';
import { Material } from "./Benefit";
/**
 * Enum Racetype
 */
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
})(RaceType || (RaceType = {}));
/**
 * Race base class. Every race shares similar base
 * initialization aspects which are included here
 */
var Race = /** @class */ (function () {
    function Race(pid) {
        this.vp = 10;
        this.gold = 15;
        this.ore = 4;
        this.science = 3;
        this.qic = 1;
        this.power1 = 0;
        this.power2 = 0;
        this.power3 = 0;
        this.pid = pid;
        this.mine = 0;
        this.station = 0;
        this.institute = 0;
        this.lab = 0;
        this.academies = 0;
        this.gaiaformer = 0;
        this.range = 1; // how far you can jump
        this.specialRange = 0; // the bonus range from using QIC or Special Power;
    }
    /**
     * Initializes Racetype depending on selected Race.
     * Need to add tech level
     * @param race
     */
    Race.prototype.initialize = function (race) {
        this.buildingLib = new BuildingLib(race);
        if (race === RaceType.Terrans) {
            this.planetType = PlanetType.Blue;
        }
        if (race === RaceType.Lantids) {
            this.planetType = PlanetType.Blue;
            this.gold = 13;
        }
        if (race === RaceType.Xenos) {
            this.planetType = PlanetType.Yellow;
        }
        if (race === RaceType.Gleens) {
            this.planetType = PlanetType.Yellow;
            this.qic = 0;
        }
        if (race === RaceType.Taklons) {
            this.planetType = PlanetType.Brown;
        }
        if (race === RaceType.Ambas) {
            this.planetType = PlanetType.Brown;
        }
        if (race === RaceType.Itars) {
            this.planetType = PlanetType.White;
            this.ore = 5;
        }
        if (race === RaceType.Nevlas) {
            this.planetType = PlanetType.White;
            this.science = 2;
        }
        if (race === RaceType.HadschHallas) {
            this.planetType = PlanetType.White;
        }
        if (race === RaceType.Ivits) {
            this.planetType = PlanetType.White;
        }
        if (race === RaceType.Geodens) {
            this.planetType = PlanetType.Orange;
        }
        if (race === RaceType.Baltaks) {
            this.planetType = PlanetType.Orange;
        }
        if (race === RaceType.Bescods) {
            this.planetType = PlanetType.Black;
            this.science = 1;
        }
        if (race === RaceType.Firaks) {
            this.planetType = PlanetType.Black;
            this.ore = 3;
            this.science = 2;
        }
    };
    /*
    * Make the benefit come true;
    * input: the benefit
    * output: change the number of gold or ore of the race
    * @yalei
    */
    Race.prototype.onBenefit = function (benefit) {
        var values = benefit.benefits;
        var i = 0;
        var value;
        for (; i < values.length; i++) {
            value = values[i];
            if (value.material === Material.Gold) {
                this.gold += value.quantity;
            }
            if (value.material === Material.Ore) {
                this.ore += value.quantity;
            }
            if (value.material === Material.Science) {
                this.science += value.quantity;
            }
            if (value.material === Material.QIC) {
                this.qic += value.quantity;
            }
            if (value.material === Material.Power) {
                this.power1 += value.quantity;
            }
            if (value.material === Material.Power) {
                this.chargePower(value.quantity);
            }
            if (value.material === Material.Dig) { /*lets discuss this part later --- by yalei*/ }
            if (value.material === Material.VP) {
                this.vp += value.quantity;
            }
            if (value.material === Material.SpecialDig) { /*what is the special dig? ---by yalei*/ }
            if (value.material === Material.SpecialRange) {
                this.specialRange += value.quantity;
            }
            if (value.material === Material.GaiaFormer) {
                this.gaiaformer += value.quantity;
            }
        }
    };
    //  public planetType(): PlanetType {
    //   return
    //  }
    Race.prototype.chargePower = function (charge) {
        if (charge <= this.power1) {
            this.power1 -= charge;
            this.power2 += charge;
        }
        else {
            this.power2 += this.power1;
            charge -= this.power1;
            this.power1 = 0;
            if (charge <= this.power2) {
                this.power2 -= charge;
                this.power3 += charge;
            }
            else {
                this.power3 += this.power2;
                this.power2 = 0;
            }
        }
    };
    /*
    * spend the power to get something
    * this function only consume power
    * @yalei;
    */
    Race.prototype.spendPower = function (charge) {
        this.power3 -= charge;
        this.power1 += charge;
    };
    return Race;
}());
export { Race, RaceType };
/*
Race (Base Class)
    Points : <victory points>
    QIC : 1
    gold : 15
    ore: 4
    science : 3
    tech : {
        dig : 0
        nav : 1
        qic : 0
        gaia : 0
        resources : 0
        science : 0
    }
    range : 1 // how far you can jump
    digCost : 3 // how much to dig
    gaiaCost : 6 // how many power to put into gaia
    boardincome : { // how much income from the board
        ore : 3
        gold : 2
        science : 1
        power : 4
        morePower : 1
    }
    techTiles : [
        <list of TechTiles you have>
    ]
    bonusTile : <which BonusTile you have>
    federations : [
        <list of Federations you have>
    ]
    Ability: [
        <list of abilities>
    ]
    Power : {
        bowl1 : 2
        bowl2: 4
        bowl3 : 0
    }

/*
Federation:
    benefit
    status : ["green", "silver"]
Purchase :
    benefit
    cost
    status : ["available","purchased"]
Store : [
    <list of purchases>
]
TechTrack : {// keeps list of what TechTile is in what place
    // and maybe the benefit associated with each space
}

*/
//# sourceMappingURL=Race.js.map