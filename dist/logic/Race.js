"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Planet_1 = require("./Planet");
var Federation_1 = require("./Federation");
var Benefit_1 = require("./Benefit");
var BuildingLib_1 = require("./BuildingLib");
var Hex_1 = require("./Hex");
var Structure_1 = require("./Structure");
var SpecialPower_1 = require("./SpecialPower");
/**
 * 14 Factions for Gaia project
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
})(RaceType = exports.RaceType || (exports.RaceType = {}));
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
    function Race(name) {
        this.power = {
            bowl1: 2,
            bowl2: 4,
            bowl3: 0,
            gaia: 0
        };
        this.sectors = 0; // How many sectors I have built on
        this.satellites = 0;
        this.passiveActionOn = true;
        //The special powers - Orange one time benefit
        this.specialPowers = [];
        /**
         *
         * This buildBoard holds the benefits that are unlocked at each step
         * All buildings are stored on the BuildBoard and set to true when built
         */
        this.buildBoard = {
            mines: [],
            stations: [],
            institutes: [],
            labs: [],
            academies: []
        };
        // The permanent board incomes
        this.income = [];
        this.gaiaFormingCost = 6;
        this.digCost = 3;
        //Player Resources
        this.vp = 10;
        this.gold = 15;
        this.ore = 4;
        this.science = 3;
        this.qic = 1;
        this.power.bowl1 = 2;
        this.power.bowl2 = 4;
        this.power.bowl3 = 0;
        this.power.gaia = 0;
        //Player Milestones
        this.gaiaformer = 0;
        this.numGaia = 0;
        this.range = 1;
        this.specialDig = 0;
        this.specialRange = 0;
        // - todo - initialize number of planets
        // - todo - initialize number of federations
        //Initialize  from player
        this.initializeSpecialPowers();
        this.name = name;
        this.planets = [];
        this.numGaia = 0;
        this.techs = [0, 0, 0, 0, 0, 0];
        this.techTiles = [];
        this.federations = [];
        this.pid = -1; // pid is player id for example 0 1 2 3
        this.gaiaProjectPlanets = [];
        // this.nowBenefits = [];
        // this.incomeBenefits = [];
        this.techBenefits = [];
        this.techTileBenefits = [];
        this.roundTileBenefits = [];
        this.roundBoosterBenefits = [];
        this.federationBenefits = [];
        //  this.planetType = this.getPlantType(raceType);
        this.buildings = new BuildingLib_1.BuildingLib();
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
        this.buildBoard.mines = this.buildings.mines;
        this.buildBoard.stations = this.buildings.station;
        this.buildBoard.labs = this.buildings.lab;
        this.buildBoard.academies = this.buildings.academies;
        this.buildBoard.institutes = this.buildings.institute;
    };
    // /**
    //  * Adds now benefits collected during game play
    //  * Note: Not on buildBoard
    //  * @param nowBenefit
    //  */
    // public addNowBenefits(nowBenefit: Benefit) {
    //     this.nowBenefits.push(nowBenefit);
    // }
    // /**
    //  * Adds income benefits collected during game play
    //  * Note: Not on buildBoard
    //  * @param incomeBenefit
    //  */
    // public addIncomeBenefits(incomeBenefit: Benefit) {
    //     this.incomeBenefits.push(incomeBenefit);
    // }
    // /**
    //  * Adds special benefits collected during game play
    //  * Note: Not on buildBoard
    //  */
    // public addSpecialBenefits(specialBenefit: Benefit) {
    //     this.specialBenefits.push(specialBenefit);
    // }
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
    /**
     * Add a new Extra power to bowl1
     * @param extra
     */
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
    // spend qic
    Race.prototype.spendQic = function (charge) {
        if (this.qic < charge) {
            throw new Error("SPEND QIC ERROR: " + charge + " is greater than " + this.qic);
        }
        this.qic -= charge;
    };
    // todo reseachArea
    Race.prototype.reseachArea = function () {
    };
    /**
     * initiallize the lib of special powers
     */
    Race.prototype.initializeSpecialPowers = function () {
        var powerTypes = ["QIC1         " /* QIC1 */,
            "Dig1         " /* Dig1 */,
            "SpecialRange3" /* SpecialRange3 */,
            "Power4       " /* Power4 */,
            "QIC1Gold5    " /* QIC1Gold5 */,
            "Ore3         " /* Ore3 */,
            "Science3     " /* Science3 */];
        for (var i = 0; i < powerTypes.length; i++) {
            var specialPower = new SpecialPower_1.SpecialPower(powerTypes[i]);
            this.specialPowers.push(specialPower);
        }
    };
    // /*
    // * Add the benefit into the benefit array by the trigger,
    // * notice: this is only add them into the array, the benefit has not been used yet
    // * input: benefit
    // * output: add the benefit into the array
    // * @yalei
    // */
    // public getBenefit(benefit: Benefit){
    //   if(benefit.trigger === Trigger.Income){
    //     this.incomeBenefits.push(benefit);
    //   }
    //   if(benefit.trigger === Trigger.Now){
    //     this.nowBenefits.push(benefit);
    //     // since it is now, so we call the onBenefit at once;
    //     this.onBenefit(benefit);
    //   }
    //   if(benefit.trigger === Trigger.Special){
    //     this.activateSpecialPower(benefit);
    //   }
    // }
    /**
     * get the benefit from tech
     * @param benefit
     */
    Race.prototype.getTechBenefit = function (benefit) {
        this.techBenefits.push(benefit);
        if (benefit.trigger === 0 /* Now */) {
            this.onBenefit(benefit);
        }
        if (benefit.trigger === 6 /* Special */) {
            this.activateSpecialPower(benefit);
        }
    };
    /**
     * get the benefit from tech tile
     * @param benefit
     */
    Race.prototype.getTechTileBenefit = function (benefit) {
        this.techTileBenefits.push(benefit);
        if (benefit.trigger === 0 /* Now */) {
            this.onBenefit(benefit);
        }
        if (benefit.trigger === 6 /* Special */) {
            this.activateSpecialPower(benefit);
        }
    };
    /**
     * get the benefit from the round tile
     * @param benefit
     */
    Race.prototype.getRoundTileBenefit = function (benefit) {
        this.roundTileBenefits.push(benefit);
        if (benefit.trigger === 0 /* Now */) {
            this.onBenefit(benefit);
        }
        if (benefit.trigger === 6 /* Special */) {
            this.activateSpecialPower(benefit);
        }
    };
    /**
     * get the benefit from round booster
     * @param benefit
     */
    Race.prototype.getRoundBoosterBenefit = function (benefit) {
        this.roundBoosterBenefits.push(benefit);
        if (benefit.trigger === 0 /* Now */) {
            this.onBenefit(benefit);
        }
        if (benefit.trigger === 6 /* Special */) {
            this.activateSpecialPower(benefit);
        }
    };
    /**
     * get the benefit from federation
     * @param benefit
     */
    Race.prototype.getFedrationBenefit = function (benefit) {
        this.federationBenefits.push(benefit);
        if (benefit.trigger === 0 /* Now */) {
            this.onBenefit(benefit);
        }
        if (benefit.trigger === 6 /* Special */) {
            this.activateSpecialPower(benefit);
        }
    };
    /**
     * put the federation token into account and put the benefit inside of it into the benefit account
     * @param fed
     */
    Race.prototype.getSpecialFedration = function (fed) {
        var federation = new Federation_1.Federation();
        federation.token = fed;
        this.federations.push(federation);
        this.getFedrationBenefit(fed.benefit);
    };
    /**
     * search all the benefit array to find the benefit having the trigger
     * then call it onBenefit
     * if the trigger is build, we need to check if the building type is right
     * @param trigger the trigger you want to call
     * @param buildingType if the trigger is build, this is neccessary. If not, this should be null
     */
    Race.prototype.triggerBenefit = function (trigger, buildingType) {
        var _this = this;
        this.income.forEach(function (b) {
            if (b.trigger === trigger) {
                if (trigger !== 3 /* Build */) {
                    _this.onBenefit(b);
                }
                else {
                    if (b.object === buildingType) {
                        _this.onBenefit(b);
                    }
                }
            }
        });
        this.techBenefits.forEach(function (b) {
            if (b.trigger === trigger) {
                if (trigger !== 3 /* Build */) {
                    _this.onBenefit(b);
                }
                else {
                    if (b.object === buildingType) {
                        _this.onBenefit(b);
                    }
                }
            }
        });
        this.techTileBenefits.forEach(function (b) {
            if (b.trigger === trigger) {
                if (trigger !== 3 /* Build */) {
                    _this.onBenefit(b);
                }
                else {
                    if (b.object === buildingType) {
                        _this.onBenefit(b);
                    }
                }
            }
        });
        this.roundTileBenefits.forEach(function (b) {
            if (b.trigger === trigger) {
                if (trigger !== 3 /* Build */) {
                    _this.onBenefit(b);
                }
                else {
                    if (b.object === buildingType) {
                        _this.onBenefit(b);
                    }
                }
            }
        });
        this.roundBoosterBenefits.forEach(function (b) {
            if (b.trigger === trigger) {
                if (trigger !== 3 /* Build */) {
                    _this.onBenefit(b);
                }
                else {
                    if (b.object === buildingType) {
                        _this.onBenefit(b);
                    }
                }
            }
        });
        this.federationBenefits.forEach(function (b) {
            if (b.trigger === trigger) {
                if (trigger !== 3 /* Build */) {
                    _this.onBenefit(b);
                }
                else {
                    if (b.object === buildingType) {
                        _this.onBenefit(b);
                    }
                }
            }
        });
    };
    /**
     * Get the number of how many different types of planet you have occupied
     */
    Race.prototype.getPlanetTypes = function () {
        var temp = [];
        for (var i = 0; i < this.planets.length; i++) {
            var type = this.planets[i].type;
            if (temp.indexOf(type) === -1)
                temp.push(type);
        }
        return temp.length;
    };
    /**
     * the function which will activate the benefit
     * and store it in the private data member
     * @param benefit
     */
    Race.prototype.onBenefit = function (benefit) {
        var values = benefit.values;
        var i = 0;
        var value;
        var times = 1;
        // asign the times
        if (benefit.count === Benefit_1.Count.Sectors) {
            times = this.getSectors();
        }
        if (benefit.count === Benefit_1.Count.Mines) { } // times = num of mine
        if (benefit.count === Benefit_1.Count.TradingStations) { } // times = num of station
        if (benefit.count === Benefit_1.Count.Labs) { }
        if (benefit.count === Benefit_1.Count.BigBuildings) { }
        if (benefit.count === Benefit_1.Count.Feds) {
            times = this.federations.length;
        }
        if (benefit.count === Benefit_1.Count.PlanetTypes) {
            times = this.getPlanetTypes();
        }
        if (benefit.count === Benefit_1.Count.Satellites) {
            times = this.satellites;
        }
        if (benefit.count === Benefit_1.Count.Gaia) {
            times = this.getGaiaNum();
        }
        for (; i < values.length; i++) {
            value = values[i];
            if (value.material === Benefit_1.Material.Gold) {
                this.gold += value.quantity * times;
            }
            if (value.material === Benefit_1.Material.Ore) {
                this.ore += value.quantity * times;
            }
            if (value.material === Benefit_1.Material.Science) {
                this.science += value.quantity * times;
            }
            if (value.material === Benefit_1.Material.QIC) {
                this.qic += value.quantity * times;
            }
            if (value.material === Benefit_1.Material.ExtraPower) {
                this.power.bowl1 += value.quantity * times;
            }
            if (value.material === Benefit_1.Material.Power) {
                this.chargePower(value.quantity * times);
            }
            if (value.material === Benefit_1.Material.Dig) {
                this.specialDig += value.quantity * times;
            }
            if (value.material === Benefit_1.Material.VP) {
                this.vp += value.quantity * times;
            }
            if (value.material === Benefit_1.Material.SpecialRange) {
                this.specialRange += value.quantity * times;
            }
            if (value.material === Benefit_1.Material.GaiaFormer) {
                this.gaiaformer += value.quantity * times;
            }
        }
        if (this.gold > 30)
            this.gold = 30;
    };
    /**
     * Activate the special power which has this benefit
     * Orange base tech tile
     * @param benefit
     */
    Race.prototype.activateSpecialPower = function (benefit) {
        var values = benefit.values;
        if (values.length === 1) {
            var value = values[0];
            if (value.quantity === 1 && value.material === Benefit_1.Material.QIC) {
                this.specialPowers[0].activatePower();
            }
            if (value.quantity === 1 && value.material === Benefit_1.Material.Dig) {
                this.specialPowers[1].activatePower();
            }
            if (value.quantity === 3 && value.material === Benefit_1.Material.SpecialRange) {
                this.specialPowers[2].activatePower();
            }
            if (value.quantity === 4 && value.material === Benefit_1.Material.Power) {
                this.specialPowers[3].activatePower();
            }
            if (value.quantity === 3 && value.material === Benefit_1.Material.Ore) {
                this.specialPowers[5].activatePower();
            }
            if (value.quantity === 3 && value.material === Benefit_1.Material.Science) {
                this.specialPowers[6].activatePower();
            }
        }
        else if (values.length === 2) {
            this.specialPowers[4].activatePower();
        }
        console.log("no such special power");
        return;
    };
    /**
     * turn off the special power if the tech tile is covered
     * @param spt
     */
    Race.prototype.turnOffSpecialPower = function (spt) {
        if (spt === 'QIC1         ')
            this.specialPowers[0].turnOffPower();
        if (spt === 'Dig1         ')
            this.specialPowers[1].turnOffPower();
        if (spt === 'SpecialRange3')
            this.specialPowers[2].turnOffPower();
        if (spt === 'Power4       ')
            this.specialPowers[3].turnOffPower();
        if (spt === 'QIC1Gold5    ')
            this.specialPowers[4].turnOffPower();
        if (spt === 'Ore3         ')
            this.specialPowers[5].turnOffPower();
        if (spt === 'Science3     ')
            this.specialPowers[6].turnOffPower();
    };
    /**
     * Print out the status of special powers
     */
    Race.prototype.printSpecialPower = function () {
        for (var i = 0; i < this.specialPowers.length; i++) {
            var temp = this.specialPowers[i];
            console.log("index: " + i + "; effect: " + temp.id + "; ifGet: " + temp.ifGet + "; ifUsable: " + temp.ifUsable);
        }
    };
    /**
     * Use the special power
     * @param id
     */
    Race.prototype.useSpecialPower = function (id) {
        if (!this.specialPowers[id].ifGet) {
            console.log("special power not get");
            return false;
        }
        if (!this.specialPowers[id].ifUsable) {
            console.log("special power used this round, please wait for the next round");
            return false;
        }
        this.onBenefit(this.specialPowers[id].benefit);
        this.specialPowers[id].ifUsable = false;
        return true;
    };
    /**
     * Check distance of the Hex
     * @param hex
     */
    Race.prototype.nearDistance = function (hex) {
        var min = 10000;
        for (var i = 0; i < this.planets.length; i++) {
            var d = hex.distance(this.planets[i].loc);
            if (d < min)
                min = d;
        }
        return min;
    };
    /**
     *
     * @param hex
     */
    Race.prototype.checkPlanetDistance = function (hex) {
        var distance = this.nearDistance(hex);
        if (this.range + this.specialRange >= distance) {
            return true;
        }
        else {
            if (this.range + this.specialRange + this.qic * 2 >= distance) {
                console.log("checkPanetDistance OK  but need QIC ");
                return true;
            }
        }
        return false;
    };
    /**
     * Get the cost to terraform
     */
    Race.prototype.terraformingCost = function () {
        return this.digCost;
    };
    /**
     * Get the next available Mine
     * Used in Action.ts
     */
    Race.prototype.getAvalibleMine = function () {
        for (var _i = 0, _a = this.buildings.mines; _i < _a.length; _i++) {
            var mine = _a[_i];
            if (mine.status === Structure_1.StructureStatus.Unbuilt)
                return mine;
        }
        return null;
    };
    /**
     * Get the next available station
     * Used in Action.ts
     */
    Race.prototype.getAvalibleStation = function () {
        for (var _i = 0, _a = this.buildings.station; _i < _a.length; _i++) {
            var s = _a[_i];
            if (s.status === Structure_1.StructureStatus.Unbuilt)
                return s;
        }
        return null;
    };
    /**
     * Get the next available lab
     * Used in Action.ts
     */
    Race.prototype.getAvalibleLab = function () {
        for (var _i = 0, _a = this.buildings.lab; _i < _a.length; _i++) {
            var l = _a[_i];
            if (l.status === Structure_1.StructureStatus.Unbuilt)
                return l;
        }
        return null;
    };
    /**
     * Get the next available Institute
     * Used in Action.ts
     */
    Race.prototype.getAvalibleInstitute = function () {
        for (var _i = 0, _a = this.buildings.institute; _i < _a.length; _i++) {
            var i = _a[_i];
            if (i.status === Structure_1.StructureStatus.Unbuilt)
                return i;
        }
        return null;
    };
    /**
     * Get the next available Academy
     * Used in Action.ts
     */
    Race.prototype.getAvalibleAcademies = function () {
        for (var _i = 0, _a = this.buildings.academies; _i < _a.length; _i++) {
            var a = _a[_i];
            if (a.status === Structure_1.StructureStatus.Unbuilt)
                return a;
        }
        return null;
    };
    /**
     * Get back last built mine
     * Used in Action.ts
     */
    Race.prototype.getLastBuiltMine = function () {
        var last = null;
        for (var _i = 0, _a = this.buildings.mines; _i < _a.length; _i++) {
            var mine = _a[_i];
            if (mine.status === Structure_1.StructureStatus.Built)
                last = mine;
        }
        return last;
    };
    /**
     * Get back last built station
     * Used in Action.ts
     */
    Race.prototype.getLastBuiltStation = function () {
        var last = null;
        for (var _i = 0, _a = this.buildings.station; _i < _a.length; _i++) {
            var s = _a[_i];
            if (s.status === Structure_1.StructureStatus.Unbuilt)
                last = s;
        }
        return last;
    };
    /**
     * Get back the last built Lab
     */
    Race.prototype.getLastBuiltLab = function () {
        var last = null;
        for (var _i = 0, _a = this.buildings.lab; _i < _a.length; _i++) {
            var l = _a[_i];
            if (l.status === Structure_1.StructureStatus.Unbuilt)
                last = l;
        }
        return last;
    };
    /**
     * Checks if the player can afford to build a Mine
     */
    Race.prototype.AffordMine = function () {
        var mine = this.getAvalibleMine();
        if (mine == null)
            return false;
        return this.haveResouces(mine.cost);
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
    /**
     * Checks if the player has the particular resource
     */
    Race.prototype.haveResouce = function (value) {
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
    /**
     * Subtract the resource from the player
     * @param value
     */
    Race.prototype.payResouce = function (value) {
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
    /**
     * Check if the player has the resources
     * @param values
     */
    Race.prototype.haveResouces = function (values) {
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
    /**
     * Pay the resource
     */
    Race.prototype.payResouces = function (values) {
        for (var _i = 0, values_2 = values; _i < values_2.length; _i++) {
            var value = values_2[_i];
            if (this.payResouce(value) === false)
                return false;
        }
        return true;
    };
    /**
     *  terraforming will cost an ore quantity according tech level
     */
    Race.prototype.startGaiaProjectCost = function () {
        return this.gaiaFormingCost;
    };
    /**
     * Check if the player has sufficient power materials
     * to start a Gaia project
     */
    Race.prototype.checkPowerForGaiaProject = function () {
        if (this.power.bowl1 + this.power.bowl2 + this.power.bowl3 >= this.startGaiaProjectCost()) {
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * Checks if the player has sufficient power materials to
     * form a federation
     * @param satellite
     */
    Race.prototype.checkPowerForFederation = function (satellite) {
        if (this.power.bowl1 + this.power.bowl2 + this.power.bowl3 >= satellite) {
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * Transfers powers into the Gaia bowl
     */
    Race.prototype.transferGaiaPower = function () {
        var cost = this.startGaiaProjectCost();
        this.takePowersAwayFromBowl(cost);
        this.power.gaia += cost;
    };
    /**
     * Take away power materials for each Sattellite
     * @param satellite
     */
    Race.prototype.discardPowersToBuildSatellites = function (satellite) {
        this.takePowersAwayFromBowl(satellite);
    };
    /**
     * Remove power materials from the power bowls
     */
    Race.prototype.takePowersAwayFromBowl = function (cost) {
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
    Race.prototype.getTrigerBenefit = function (trigger) {
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
    /**
     * Trigger the benefit when a person passes
     */
    Race.prototype.onPassBenefit = function () {
        // let benefits = this.getTrigerBenefit(Trigger.Pass);
        // for(const benefit of benefits){
        //   this.onBenefit(benefit);
        // }
        this.triggerBenefit(5 /* Pass */, null);
    };
    /**
     * Planets that the player can reach/access
     * @param board
     */
    Race.prototype.accessiblePlanets = function (board) {
        var plants = [];
        //  console.log(board.spaces);
        for (var _i = 0, _a = this.planets; _i < _a.length; _i++) {
            var planet = _a[_i];
            var range = this.range + this.specialRange;
            var neighborings = Hex_1.Hex.rangeHexs(planet.loc, range);
            for (var _b = 0, neighborings_1 = neighborings; _b < neighborings_1.length; _b++) {
                var hex = neighborings_1[_b];
                if (board.hasPlanet(hex)) {
                    var planet_1 = board.getPlanet(hex);
                    if (planet_1.playerID === -1) {
                        plants.push(planet_1);
                        //console.log(planet);
                    }
                }
            }
        }
    };
    /**
     * Calculate the Income benefits for each player
     * during the income phase
     * - unfinished
     */
    Race.prototype.calculateIncomeBenefit = function () {
        // // for default income for race board
        // let benefits = this.incomes;
        // //roundBooster
        this.roundBoosterBenefits = [];
        var list = this.roundBooster.benefit;
        for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
            var benefit = list_1[_i];
            this.getRoundBoosterBenefit(benefit);
        }
        // console.log(this.name)
        // console.log("before income");
        // console.log(this.gold +" gold vs ore "+ this.ore);
        this.triggerBenefit(4 /* Income */, null);
        // console.log(this.gold +" gold vs ore "+ this.ore);
        // console.log("after income");
        // for title do not need remove previous for it income by fraction
        // see detail code of tech
    };
    /**
     * Get as a JsonData Structure
     */
    Race.prototype.getJsonData = function () {
        return {
            name: this.name,
            type: this.raceType,
            gold: this.gold,
            ore: this.ore,
            vp: this.vp,
            science: this.science,
            qic: this.qic,
            bowl1: this.power.bowl1,
            bowl2: this.power.bowl2,
            bowl3: this.power.bowl3,
        };
    };
    /**
     * get the number of mines player build
     * @author yousong
     */
    Race.prototype.getMineNum = function () {
        var count = 0;
        for (var _i = 0, _a = this.buildings.mines; _i < _a.length; _i++) {
            var mine = _a[_i];
            if (mine.status === Structure_1.StructureStatus.Built)
                count++;
        }
        return count;
    };
    /**
     * Get the number of stations built
     */
    Race.prototype.getStationNum = function () {
        var count = 0;
        for (var _i = 0, _a = this.buildings.station; _i < _a.length; _i++) {
            var s = _a[_i];
            if (s.status === Structure_1.StructureStatus.Built)
                count++;
        }
        return count;
    };
    /**
     * Get the number of labs built
     */
    Race.prototype.getLabNum = function () {
        var count = 0;
        for (var _i = 0, _a = this.buildings.lab; _i < _a.length; _i++) {
            var s = _a[_i];
            if (s.status === Structure_1.StructureStatus.Built)
                count++;
        }
        return count;
        return 0;
    };
    /**
     * return the number of Institutions and Academies
     * notice: two kinds of structure
     */
    Race.prototype.getBigBuildingNum = function () {
        var count = 0;
        for (var _i = 0, _a = this.buildings.institute; _i < _a.length; _i++) {
            var s = _a[_i];
            if (s.status === Structure_1.StructureStatus.Built)
                count++;
        }
        for (var _b = 0, _c = this.buildings.academies; _b < _c.length; _b++) {
            var s = _c[_b];
            if (s.status === Structure_1.StructureStatus.Built)
                count++;
        }
        return count;
    };
    /**
     * Replace normal tech tile with the advanced tech tile
     */
    Race.prototype.removeTechtile = function (techId) {
        var index = 0;
        var found = false;
        for (var _i = 0, _a = this.techTiles; _i < _a.length; _i++) {
            var techTile = _a[_i];
            if (techTile.techId === techId) {
                found = true;
                break;
            }
            index++;
        }
        if (found) {
            this.techTiles.splice(index, 1); //remove this techtile
        }
    };
    /**
     * Check if the player has the tech tile
     * @param techId
     */
    Race.prototype.hasTechTileID = function (techId) {
        for (var _i = 0, _a = this.techTiles; _i < _a.length; _i++) {
            var techTile = _a[_i];
            if (techTile.techId === techId) {
                return true;
            }
        }
        return false;
    };
    /**
     * GaiaPhase operation
     */
    Race.prototype.GaiaPhase = function () {
        this.power.bowl1 += this.power.gaia;
        for (var _i = 0, _a = this.gaiaProjectPlanets; _i < _a.length; _i++) {
            var planet = _a[_i];
            planet.type = Planet_1.PlanetType.Gaia;
        }
        this.gaiaProjectPlanets = [];
    };
    /**
     * Get method for sectors
     */
    Race.prototype.getSectors = function () {
        return this.sectors;
    };
    /**
     * Get number of gaia planets conquered
     */
    Race.prototype.getGaiaNum = function () {
        var count = 0;
        for (var _i = 0, _a = this.planets; _i < _a.length; _i++) {
            var planet = _a[_i];
            if (planet.type === Planet_1.PlanetType.Gaia) {
                count++;
            }
        }
        return count;
    };
    /**
     * Count the federation buildings
     */
    Race.prototype.getFedarationBuildings = function () {
        var count = 0;
        for (var _i = 0, _a = this.federations; _i < _a.length; _i++) {
            var federation = _a[_i];
            count += federation.planets.length;
        }
        return count;
    };
    /**
     * Double check
     */
    Race.prototype.getBuildings = function () {
        return this.planets.length;
    };
    return Race;
}());
exports.Race = Race;
