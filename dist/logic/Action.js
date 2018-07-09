/**
 * Types of actions that a player can make on his turn
 * Not including free actions
 */
var ActionType;
(function (ActionType) {
    ActionType["Mine"] = "mine";
    ActionType["Gaia"] = "gaia";
    ActionType["Update"] = "update";
    ActionType["Federation"] = "federation";
    ActionType["Research"] = "research";
    ActionType["Special"] = "special";
    ActionType["Pass"] = "pass";
})(ActionType || (ActionType = {}));
/**
 * Action class considers factors relating to making an action
 */
var Action = /** @class */ (function () {
    function Action(game, board, action) {
        this.game = game;
        this.action = action;
        this.check = true;
        this.board = board;
    }
    Action.prototype.checkValid = function () {
        if (this.action === 'mine') {
            this.buildMineCheck();
            return this.check;
        }
        if (this.action === 'gaia') {
            return this.checkGaiaProject();
        }
        if (this.action === 'update') {
            return this.checkUpdateBuilding();
        }
        if (this.action === 'federation') {
            return;
        }
        if (this.action === 'research') {
            return;
        }
        if (this.action === 'special') {
            return;
        }
        if (this.action === 'pass') {
            return;
        }
        return true;
    };
    Action.prototype.checkUpdateBuilding = function () {
        var planet = this.board.getPlanet(this.action.hex);
        if (planet.pid !== this.player.pid) {
            console.log("you do not own this planet");
        }
        if (this.action.subtype === 1) { // Mine ➜ Trading Station
            if (this.planet.sid !== 0) { // this is mine
                console.log(" Mine ➜ Trading Station cost insufficient this.data.subType == 1 require mine type ");
                return false;
            }
            if (this.board.hasNeighboring(this.data.hex, player.pid)) {
                if (this.player.ore >= this.player.cost.station2.ore &&
                    this.player.gold >= this.player.cost.station2.gold) {
                    return true;
                }
                else {
                    console.log(" Mine ➜ Trading Station cost insufficient ");
                    return false;
                }
            }
            else {
                if (this.player.ore >= this.player.cost.station1.ore &&
                    this.player.gold >= this.player.cost.station1.gold) {
                    return true;
                }
                else {
                    console.log(" Mine ➜ Trading Station cost insufficient ");
                    return false;
                }
            }
        }
        // if(this.data.subType === 2){
        //
        // }
        //
        // if(this.data.subType === 3){
        //
        // }
        //
        // if(this.data.subType === 4){
        //
        // }
    };
    Action.prototype.checkGaiaProject = function () {
        // page 11
        if (this.player.gaiaformer === 0) {
            console.log("gaiaformer not available");
            return false;
        }
        var planet = this.board.getPlanet(this.data.hex);
        // Transdim
        if (planet.pid !== 8) {
            console.log("not  Transdim  can not start gaia project ");
            return false;
        }
        if (this.player.checkPlanetDistance(data.hex) === false) {
            console.log("checkPlanetDistance error ");
            return false;
        }
        if (this.player.checkPowerForGaiaProject() === false) {
            console.log("checkPowerForGaiaProject error ");
            return false;
        }
        return true;
    };
    Action.prototype.doAction = function () {
        if (this.data.type === 'mine') {
            this.buildMine();
        }
        if (this.data.type === "update") {
            if (this.data.subType === 1) {
                if (this.board.hasNeighboring(this.data.hex, player.pid)) {
                    this.player.ore -= this.player.cost.station2.ore;
                    this.player.gold -= this.player.cost.station2.gold;
                }
                else {
                    this.player.ore -= this.player.cost.station1.ore;
                    this.player.gold -= this.player.cost.station1.gold;
                }
                this.board.updateBuiding(hex, 1);
            }
        }
    };
    Action.prototype.buildMine = function () {
        if (buildMineCheck() === true) {
            var planet = this.board.getPlanet(this.data.hex);
            this.board.buildMine(this.data.location, this.player);
            var terraforming = planet.terraformingCalculate(this.player);
            var needOres = terraforming * this.player.cost.terraforming.ore;
            this.player.ore -= needOres;
            if (planet.pid === 7) { // Gaia
                this.player.QIC -= 1;
            }
            this.player.gold -= this.cost.mine.gold;
            this.player.ore -= this.cost.mine.ore;
            this.player.mine++;
            this.player.planets.push(planet);
            planet.playerID = this.player.pid;
        }
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
        if (this.checkMineAvailability() && this.checkEmpty() && this.checkAccessible() && this.checkHabitable() && this.checkResources()) {
            return true;
        }
        else {
            return false;
        }
    };
    Action.prototype.checkMineAvailability = function () {
        if (this.player.mine === 8) {
            return false;
        }
        else {
            return true;
        }
    };
    Action.prototype.checkEmpty = function () {
        return this.board.checkPlanetEmpty(this.data.hex);
    };
    Action.prototype.checkAccessible = function () {
        // Distance from one of the existing planets
        this.player.checkPlanetDistance(this.data.hex);
    };
    Action.prototype.pass = function () {
        this.player.passed = true;
        this.game.passed++;
    };
    Action.prototype.checkHabitable = function () {
        var planet = this.board.getPlanet(this.data.hex);
        var terraforming = planet.terraformingCalculate(this.player);
        var needOres = terraforming * this.player.cost.terraforming.ore;
        if (this.player.ore >= needOres) {
            return true;
        }
        else {
            return false;
        }
    };
    Action.prototype.checkResources = function () {
        if (this.gold >= this.cost.mine.gold && this.ore >= this.cost.mine.ore) {
            return true;
        }
        else {
            return false;
        }
    };
    return Action;
}());
export { Action };
//# sourceMappingURL=Action.js.map