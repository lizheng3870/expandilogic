"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Benefit_1 = require("./Benefit");
/**
 * Race base class. Every race shares similar base
 * initialization aspects which are included here
 * race will have income from many places, including
 * build board
 * permanent income from build board
 * tech tiles
 * round boosters
 * tech tracks
 *
 */
var Race = /** @class */ (function () {
    function Race() {
        this.power = {
            bowl1: 2,
            bowl2: 4,
            bowl3: 0,
            gaia: 0
        };
        // This buildBoard holds the benefits that are unlocked at each step
        this.buildBoard = {
            mines: [],
            stations: [],
            institutes: [],
            labs: [],
            academies: []
        };
        //Player Resources
        this.vp = 10;
        this.gold = 15;
        this.ore = 4;
        this.science = 3;
        this.qic = 1;
        // - todo - some factions have different power bowl starting points
        //Player Milestones
        this.gaiaformer = 0;
        this.numGaia = 0;
        this.range = 1;
        // - todo - initialize number of planets
        // - todo - initialize number of federations
    }
    /**
     * Set player RaceType
     * @param race
     */
    Race.prototype.setRaceType = function (race) {
        this.raceType = race;
        // Set up the buildboard for that player
        this.setUpBuildBoard();
    };
    /**
     * Set player buildBoard
     */
    Race.prototype.setUpBuildBoard = function () {
        this.addMines();
        this.addStations();
    };
    /**
     * AddMines for buildBoard
     */
    Race.prototype.addMines = function () {
        var item = false;
        var playerBenefit1 = new Benefit_1.Benefit(4 /* Income */, null, Benefit_1.BuildingType.Mine, [new Benefit_1.Value(1, Benefit_1.Material.Ore)]);
        var playerBenefit2 = new Benefit_1.Benefit(4 /* Income */, null, Benefit_1.BuildingType.Mine, [new Benefit_1.Value(0, Benefit_1.Material.Ore)]);
        var mine1 = { built: item, benefit: playerBenefit1 };
        var mine2 = { built: item, benefit: playerBenefit2 };
        for (var i = 1; i <= 8; i++) {
            if (i === 3) {
                this.buildBoard.mines.push(mine2);
            }
            this.buildBoard.mines.push(mine1);
        }
    };
    /**
     * Add Trading Stations for buildboard
     */
    Race.prototype.addStations = function () {
    };
    /**
     * Adds now benefits collected during game play
     * Note: Not on buildBoard
     * @param nowBenefit
     */
    Race.prototype.addNowBenefits = function (nowBenefit) {
        this.nowBenefits.push(nowBenefit);
    };
    /**
     * Adds income benefits collected during game play
     * Note: Not on buildBoard
     * @param incomeBenefit
     */
    Race.prototype.addIncomeBenefits = function (incomeBenefit) {
        this.incomeBenefits.push(incomeBenefit);
    };
    /**
     * Adds special benefits collected during game play
     * Note: Not on buildBoard
     */
    Race.prototype.addSpecialBenefits = function (specialBenefit) {
        this.specialBenefits.push(specialBenefit);
    };
    /**
     * Set player Planet type
     * @param playerPlanet
     */
    Race.prototype.setPlanetType = function (playerPlanet) {
        this.planetType = playerPlanet;
    };
    /*
        use the "charge power" mechanic to push
        power aka energy around the bowl system
        gaia bowl and "burning power" mechanics are
        handled in other methods
    */
    Race.prototype.chargePower = function (charge) {
        var amount = charge;
        // move the lesser of the amount to charge or all of bowl 1
        // this will also work when there's zero in bowl 1
        if (charge > this.power.bowl1) {
            amount = this.power.bowl1;
        }
        this.power.bowl2 += amount;
        this.power.bowl1 -= amount;
        charge -= amount;
        // now do bowl2 -> bowl3
        amount = charge;
        if (charge > this.power.bowl2) {
            amount = this.power.bowl2;
        }
        this.power.bowl3 += amount;
        this.power.bowl2 -= amount;
        charge -= amount;
    };
    Race.prototype.addPower = function (extra) {
        this.power.bowl1 += extra;
    };
    /*
    * spend the power to get something
    * this function only consume power
    * @yalei;
    */
    Race.prototype.spendPower = function (charge) {
        if (this.power.bowl3 < charge) {
            throw new Error("SPEND POWER ERROR: " + charge + " is greater than " + this.power.bowl3);
        }
        this.power.bowl3 -= charge;
        this.power.bowl1 += charge;
    };
    // todo reseachArea
    Race.prototype.reseachArea = function () {
    };
    return Race;
}());
exports.Race = Race;
