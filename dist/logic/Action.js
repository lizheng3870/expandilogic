"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import {Hex} from "./Hex";
var Request_1 = require("./Request");
var Structure_1 = require("./Structure");
var Planet_1 = require("./Planet");
/**
 * Types of actions that a player can make on his turn
 * Not including free actions
 */
var ActionType;
(function (ActionType) {
    ActionType[ActionType["BuildMine"] = 0] = "BuildMine";
    ActionType[ActionType["Gaia"] = 1] = "Gaia";
    ActionType[ActionType["Upgrade"] = 2] = "Upgrade";
    ActionType[ActionType["Federate"] = 3] = "Federate";
    ActionType[ActionType["Research"] = 4] = "Research";
    ActionType[ActionType["PowerAndQIC"] = 5] = "PowerAndQIC";
    ActionType[ActionType["Special"] = 6] = "Special";
    ActionType[ActionType["Free"] = 7] = "Free";
    ActionType[ActionType["Pass"] = 8] = "Pass";
})(ActionType || (ActionType = {}));
exports.ActionType = ActionType;
/**
 * Action class considers factors relating to making an action
 */
var Action = /** @class */ (function () {
    function Action(game, player, request) {
        this.game = game;
        this.request = request;
        this.board = game.board;
        this.player = player;
        //  this.check = true;
        this.message = "undefined";
    }
    Action.prototype.checkValid = function () {
        //if(this.checkCurrentTurnPlayer() === false)return false;
        if (this.request.actionType === ActionType.BuildMine) {
            return this.buildMineCheck();
        }
        if (this.request.actionType === ActionType.Gaia) {
            return this.checkGaiaProject();
        }
        if (this.request.actionType === ActionType.Upgrade) {
            return this.checkUpdateBuilding();
        }
        if (this.request.actionType === ActionType.Federate) {
            return this.checkFederation();
        }
        if (this.request.actionType === ActionType.Research) {
            return this.checkResearch();
        }
        if (this.request.actionType === ActionType.PowerAndQIC) {
            return this.checkPowerAndQIC();
        }
        if (this.request.actionType === ActionType.Special) {
            return this.checkSpecial();
        }
        if (this.request.actionType === ActionType.Free) {
            return this.checkFree();
        }
        if (this.request.actionType === ActionType.Pass) {
            return this.checkPass();
        }
        return false;
        //
        // if(this.request.actionType === ActionType.Special){
        //   return
        // }
        //
        // if(this.request.actionType === ActionType.Pass){
        //   return
        // }
        return true;
    };
    Action.prototype.checkUpdateBuilding = function () {
        var planet = this.board.getPlanet(this.request.hex);
        if (planet.playerID !== this.player.pid) {
            console.log("you do not own this planet");
            return false;
        }
        var hasNeighboring = this.board.hasNeighboring(this.request.hex, this.player.pid);
        // check planet building type
        if (this.request.upgradeType === Request_1.UpgradeType.MineToStation) {
            if (planet.building === Structure_1.StructureType.Mine)
                return true;
            else
                return false;
        }
        if (this.request.upgradeType === Request_1.UpgradeType.StationToInstitute ||
            this.request.upgradeType === Request_1.UpgradeType.StationToLab) {
            if (planet.building === Structure_1.StructureType.Station)
                return true;
            else
                return false;
        }
        if (this.request.upgradeType === Request_1.UpgradeType.LabToAcademy) {
            if (planet.building === Structure_1.StructureType.Lab)
                return true;
            else
                return false;
        }
        // check afford
        if (this.request.upgradeType === Request_1.UpgradeType.MineToStation) {
            var station = this.player.getAvalibleStation();
            if (station === null)
                return false;
            return this.player.haveResouces(station.cost);
        }
        if (this.request.upgradeType === Request_1.UpgradeType.StationToInstitute) {
            var institute = this.player.getAvalibleInstitute();
            if (institute === null)
                return false;
            return this.player.haveResouces(institute.cost);
        }
        if (this.request.upgradeType === Request_1.UpgradeType.StationToLab) {
            var lab = this.player.getAvalibleLab();
            if (lab === null)
                return false;
            return this.player.haveResouces(lab.cost);
        }
        if (this.request.upgradeType === Request_1.UpgradeType.LabToAcademy) {
            var academy = this.player.getAvalibleAcademies();
            if (academy === null)
                return false;
            return this.player.haveResouces(academy.cost);
        }
        return false; // execute to here is wrong
    };
    Action.prototype.checkGaiaProject = function () {
        // page 11
        if (this.player.gaiaformer === 0) {
            console.log("gaiaformer not available");
            return false;
        }
        var planet = this.board.getPlanet(this.request.hex);
        // Transdim
        if (planet.type !== Planet_1.PlanetType.Transdim) {
            console.log("not  Transdim  can not start gaia project ");
            return false;
        }
        if (this.player.checkPlanetDistance(this.request.hex) === false) {
            console.log("checkPlanetDistance error ");
            return false;
        }
        if (this.player.checkPowerForGaiaProject() === false) {
            console.log("checkPowerForGaiaProject error ");
            return false;
        }
        return true;
    };
    Action.prototype.checkFederation = function () {
        // check any space of path used as federation before
        if (this.board.checkSpaceFeded(this.request.path) === true)
            return false;
        var power = 0; // total power value of at least seven
        var satellite = 0;
        for (var _i = 0, _a = this.request.path; _i < _a.length; _i++) {
            var hex = _a[_i];
            if (this.board.hasPlanet(hex)) {
                var planet = this.board.getPlanet(hex);
                // Satellites cannot be placed on planets
                if (planet.playerID !== this.player.pid)
                    return false; //player does not own planet buiding
                if (planet.building === Structure_1.StructureType.Mine) {
                    power++;
                }
                if (planet.building === Structure_1.StructureType.Station || planet.building === Structure_1.StructureType.Lab) {
                    power += 2;
                }
                if (planet.building === Structure_1.StructureType.Institute || planet.building === Structure_1.StructureType.Academy) {
                    power += 3;
                }
            }
            else {
                satellite++;
            }
        }
        if (this.player.checkPowerForFederation(satellite) === false)
            return false;
        if (power < 7)
            return false;
        else
            return true;
    };
    Action.prototype.checkResearch = function () {
        if (this.player.science < 4)
            return false;
        //todo talk with yalei
        return true;
    };
    Action.prototype.checkPowerAndQIC = function () {
        //todo
        return true;
    };
    Action.prototype.checkSpecial = function () {
        //todo
        return true;
    };
    Action.prototype.checkFree = function () {
        //todo
        return true;
    };
    Action.prototype.checkPass = function () {
        return true;
    };
    // public checkCurrentTurnPlayer(){
    //   let currentPlayer = this.game.players[this.game.turn];
    //   if(currentPlayer.pid === this.player.pid)return true;
    //   else return false;
    // }
    //
    Action.prototype.doAction = function () {
        //if(this.checkCurrentTurnPlayer() === false)return
        if (this.request.actionType === ActionType.BuildMine) {
            this.buildMine();
        }
        if (this.request.actionType === ActionType.Gaia) {
            this.startGaiaProject();
        }
        if (this.request.actionType === ActionType.Upgrade) {
            this.updateBuilding();
        }
        if (this.request.actionType === ActionType.Federate) {
            this.FormFederation();
        }
        if (this.request.actionType === ActionType.Federate) {
            this.FormFederation();
        }
        if (this.request.actionType === ActionType.Research) {
            this.Research();
        }
    };
    Action.prototype.buildMine = function () {
        var planet = this.board.getPlanet(this.request.hex);
        this.board.buildMine(this.request.hex, this.player.pid);
        // Habitability
        if (planet.type === Planet_1.PlanetType.Gaia) { // Gaia need one Q.I.C.
            this.player.qic -= 1;
        }
        else {
            // The seven colored planet types must first be terraformed
            var terraforming = planet.terraformingCalculate(this.player.planetType);
            var needOres = terraforming * this.player.terraformingCost();
            this.player.ore -= needOres;
        }
        // cost of mine
        var mine = this.player.getAvalibleMine();
        if (mine == null)
            return; // never happen just satisfy tsc
        this.player.payResouces(mine.cost); // for already check so not check again
        mine.status = Structure_1.StructureStatus.Built;
        // player has this plenet
        this.player.planets.push(planet);
        this.message = "built mine successfully";
    };
    /**
     * Checks if the player can undertake this action
     */
    // Needs to check if player has any mines available on faction board
    // It is empty (i.e., has no structures on it).
    // It is accessible from one of your planets.
    // It is habitable to your faction.
    // If the planet is not habitable, you must pay any costs required to make it habitable
    Action.prototype.buildMineCheck = function () {
        if (this.checkMineAvailability() &&
            this.checkEmpty() &&
            this.checkAccessible() &&
            this.checkHabitable() &&
            this.player.AffordMine()) {
            return true;
        }
        else {
            return false;
        }
    };
    Action.prototype.checkMineAvailability = function () {
        if (this.player.getAvalibleMine() == null) {
            this.message = "getAvalibleMine failed ";
            return false;
        }
        else
            return true;
    };
    Action.prototype.checkEmpty = function () {
        if (this.board.checkPlanetEmpty(this.request.hex)) {
            return true;
        }
        else {
            this.message = "checkPlanetEmpty failed ";
            return false;
        }
    };
    Action.prototype.checkAccessible = function () {
        // Distance from one of the existing planets
        if (this.player.checkPlanetDistance(this.request.hex)) {
            return true;
        }
        else {
            this.message = "checkAccessible failed ";
            return false;
        }
    };
    Action.prototype.checkHabitable = function () {
        var planet = this.board.getPlanet(this.request.hex);
        if (planet === null)
            return false;
        var terraforming = planet.terraformingCalculate(this.player.planetType);
        var needOres = terraforming * this.player.terraformingCost();
        if (this.player.ore >= needOres) {
            return true;
        }
        else {
            this.message = "checkHabitable failed ";
            return false;
        }
    };
    Action.prototype.startGaiaProject = function () {
        if (this.checkGaiaProject() === false)
            return;
        this.player.gaiaformer--;
        this.player.transferGaiaPower();
    };
    Action.prototype.updateBuilding = function () {
        if (this.checkUpdateBuilding() === false)
            return;
        // check planet building type
        var last = null;
        if (this.request.upgradeType === Request_1.UpgradeType.MineToStation) {
            last = this.player.getLastBuiltMine();
        }
        if (this.request.upgradeType === Request_1.UpgradeType.StationToInstitute ||
            this.request.upgradeType === Request_1.UpgradeType.StationToLab) {
            last = this.player.getLastBuiltStation();
        }
        if (this.request.upgradeType === Request_1.UpgradeType.LabToAcademy) {
            last = this.player.getLastBuiltLab();
        }
        if (last) {
            last.status = Structure_1.StructureStatus.Unbuilt;
        }
        var planet = this.board.getPlanet(this.request.hex);
        // check afford
        if (this.request.upgradeType === Request_1.UpgradeType.MineToStation) {
            var station = this.player.getAvalibleStation();
            if (station === null)
                return;
            this.player.payResouces(station.cost);
            planet.building = Structure_1.StructureType.Station;
        }
        if (this.request.upgradeType === Request_1.UpgradeType.StationToInstitute) {
            var institute = this.player.getAvalibleInstitute();
            if (institute === null)
                return;
            this.player.payResouces(institute.cost);
            planet.building = Structure_1.StructureType.Institute;
        }
        if (this.request.upgradeType === Request_1.UpgradeType.StationToLab) {
            var lab = this.player.getAvalibleLab();
            if (lab === null)
                return;
            this.player.payResouces(lab.cost);
            planet.building = Structure_1.StructureType.Lab;
        }
        if (this.request.upgradeType === Request_1.UpgradeType.LabToAcademy) {
            var academy = this.player.getAvalibleAcademies();
            if (academy === null)
                return;
            this.player.payResouces(academy.cost);
            planet.building = Structure_1.StructureType.Academy;
        }
    };
    Action.prototype.FormFederation = function () {
        if (this.checkFederation() === false)
            return;
        this.board.markSpaceFeded(this.request.path);
        var satellite = 0;
        for (var _i = 0, _a = this.request.path; _i < _a.length; _i++) {
            var hex = _a[_i];
            if (this.board.hasPlanet(hex)) {
                // this must own by player
            }
            else {
                satellite++;
            }
        }
        this.player.discardPowersToBuildSatellites(satellite);
    };
    Action.prototype.Research = function () {
        //todo
    };
    Action.prototype.powerAndQIC = function () {
        //todo
    };
    Action.prototype.special = function () {
        //todo
        return true;
    };
    Action.prototype.free = function () {
        //todo
        return true;
    };
    Action.prototype.pass = function () {
        this.game.currentPlayerPass(this.request);
    };
    //
    //    public pass(){
    //      this.player.passed = true;
    //      this.game.passed++;
    //    }
    //
    Action.prototype.chargePower = function () {
    };
    return Action;
}());
exports.Action = Action;
