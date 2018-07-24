"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Exchange_1 = require("./Exchange");
var MapBoard_1 = require("./MapBoard");
var TechBoard_1 = require("./TechBoard");
var ScoringBoard_1 = require("./ScoringBoard");
var RoundBooster_1 = require("./RoundBooster");
var Request_1 = require("./Request");
var TypeState_1 = require("TypeState");
var Action_1 = require("./Action");
var Structure_1 = require("./Structure");
var GameStatus;
(function (GameStatus) {
    GameStatus[GameStatus["Open"] = 0] = "Open";
    GameStatus[GameStatus["Setup"] = 1] = "Setup";
    GameStatus[GameStatus["Playing"] = 2] = "Playing";
    GameStatus[GameStatus["Income"] = 3] = "Income";
    GameStatus[GameStatus["Gaiaforming"] = 4] = "Gaiaforming";
    GameStatus[GameStatus["Actions"] = 5] = "Actions";
    GameStatus[GameStatus["Scoring"] = 6] = "Scoring";
    GameStatus[GameStatus["Over"] = 7] = "Over";
})(GameStatus || (GameStatus = {}));
exports.GameStatus = GameStatus;
var Config;
(function (Config) {
    Config[Config["PlayerLimit"] = 4] = "PlayerLimit";
})(Config = exports.Config || (exports.Config = {}));
var Game = /** @class */ (function () {
    // 0 : not into setup build first Structures
    // 1 normal:  0 1 2 3
    // 2 revserse:  3 2 1 0
    // 3 normal again
    function Game(gid) {
        var _this = this;
        this.players = [];
        this.nextRound = []; // passed player will go here for next round
        this.benefits = [];
        // console.log(`creating game ${gid}`)
        this.round = 1;
        this.turn = 0; // start from 0;
        //     this.status = GameStatus.Open
        this.board = new MapBoard_1.MapBoard();
        this.techBoard = new TechBoard_1.default();
        this.exchange = new Exchange_1.Exchange();
        this.scoringBoard = new ScoringBoard_1.default();
        this.roundBoosters = [];
        this.loadRoundBooster();
        this.firstStructuresRound = 0;
        this.stateMachine = new TypeState_1.TypeState.FiniteStateMachine(GameStatus.Open);
        this.stateMachine.from(GameStatus.Open).to(GameStatus.Setup);
        this.stateMachine.from(GameStatus.Setup).to(GameStatus.Playing);
        this.stateMachine.from(GameStatus.Playing).to(GameStatus.Income);
        this.stateMachine.from(GameStatus.Income).to(GameStatus.Gaiaforming);
        this.stateMachine.from(GameStatus.Gaiaforming).to(GameStatus.Actions);
        this.stateMachine.from(GameStatus.Actions).to(GameStatus.Actions);
        this.stateMachine.from(GameStatus.Actions).to(GameStatus.Scoring);
        this.stateMachine.from(GameStatus.Scoring).to(GameStatus.Playing);
        this.stateMachine.from(GameStatus.Scoring).to(GameStatus.Over);
        this.stateMachine.on(GameStatus.Setup, function (from) {
            _this.setup();
        });
        this.stateMachine.on(GameStatus.Income, function (from) {
            _this.IncomePhase();
            _this.stateMachine.go(GameStatus.Gaiaforming);
        });
        this.stateMachine.on(GameStatus.Gaiaforming, function (from) {
            // todo
            //  this.IncomePhase();
            _this.stateMachine.go(GameStatus.Actions);
        });
        this.stateMachine.on(GameStatus.Actions, function (from) {
            //  this.IncomePhase();
        });
    }
    Game.prototype.addPlayer = function (player) {
        if (this.players.length === Config.PlayerLimit) {
            throw new Error("Config.PlayerLimit (" + Config.PlayerLimit + ") reached");
        }
        else {
            // check for another player of the same race
            //  console.log(`${this.players.length} players`)
            var sameRace = this.players.findIndex(function (p) { return p.race === player.race; });
            if (player.race !== null && sameRace !== -1) {
                throw new Error("a player already exists with that raceType: " + player.race + "/" + this.players[sameRace]);
            }
            this.players.push(player);
            player.pid = this.players.length - 1;
        }
        if (this.players.length === Config.PlayerLimit) {
            // if we have the max number of players, automatically start the game
            this.stateMachine.go(GameStatus.Setup);
        }
        return true;
    };
    Game.prototype.setup = function () {
        // setup Game Board     Research Board and Federation Tokens  done when game creates both
        this.board.setup(this.players.length); // only test 4 players
        // Take all structures and Gaiaformers of your color on faction board. done when game creates player
        // Take one ore, one knowledge, and two credit markers  QIC.   done when game creates player
        // powder and level 0 on the research board.  done when creates player
        //   faction board  level 1 of a research area, calculate
        for (var _i = 0, _a = this.players; _i < _a.length; _i++) {
            var player = _a[_i];
            player.reseachArea();
        }
        // user send request for RoundRooter
    };
    Game.prototype.start = function () {
    };
    Game.prototype.nextTurn = function () {
        if (this.players.length === 0) {
            this.endRound();
            this.newRound();
        }
        else {
            this.turn++;
            if (this.turn >= this.players.length) {
                this.turn = 0;
            }
        }
    };
    Game.prototype.endRound = function () {
        this.round++;
        this.turn = 0;
        var tmp = this.players;
        this.players = this.nextRound;
        this.nextRound = tmp;
    };
    Game.prototype.newRound = function () {
        this.stateMachine.go(GameStatus.Income);
    };
    Game.prototype.IncomePhase = function () {
        for (var i = 0; i < 4; i++) {
            this.calculateIncome(this.players[i]);
        }
    };
    Game.prototype.calculateIncome = function (player) {
    };
    Game.prototype.loadRoundBooster = function () {
        for (var i = 0; i < 10; i++) {
            this.roundBoosters[i] = new RoundBooster_1.default(i);
        }
    };
    Game.prototype.checkTurn = function (playerID) {
        var currentPlayer = this.players[this.turn];
        if (currentPlayer.pid !== playerID) {
            var stack = new Error().stack;
            console.log(stack);
            console.log("not Player's turn pid: " + playerID + ", curren turn : " + this.turn);
            return false;
        }
        else {
            return true;
        }
    };
    Game.prototype.processRoundRooter = function (request) {
        if (this.checkTurn(request.pid) === false)
            return;
        if (this.stateMachine.currentState !== GameStatus.Setup) {
            throw new Error("processRoundRooter error for status not setup");
        }
        var player = this.getPlayer(request.pid);
        if (player === null)
            return;
        if (request.type === Request_1.RequestType.Roundbooter) {
            var roundBoosterId = request.roundBoosterID;
            if (player.roundBooster == null && this.roundBoosters[roundBoosterId].valid === true) {
                player.roundBooster = this.roundBoosters[roundBoosterId];
                this.roundBoosters[roundBoosterId].valid = false;
            }
            else {
                throw new Error("RoundRooter used by other user");
            }
            //send to all client;
            this.nextTurn();
            if (this.turn === 0) { // one round finished
                this.stateMachine.go(GameStatus.Playing);
                this.round = 1;
                this.newRound(); // round
            }
        }
    };
    //send to all client;
    Game.prototype.processSetupFirstStructures = function (request) {
        if (this.checkTurn(request.pid) === false)
            return;
        var player = this.getPlayer(request.pid);
        if (request.type === Request_1.RequestType.FirstStructures) {
            // check planet exist
            if (this.board.hasPlanet(request.hex) === false) {
                console.log("planet is not exist");
                return;
            }
            var planet = this.board.getPlanet(request.hex);
            // put mine on planet
            if (planet.type === player.planetType) {
                this.board.buildMine(request.hex, player.pid);
                var mine = player.getAvalibleMine();
                if (mine === null)
                    return;
                mine.status = Structure_1.StructureStatus.Built;
                player.planets.push(planet);
            }
            else {
                console.log("planetType error");
                return;
            }
        }
        if (this.firstStructuresRound === 0)
            this.firstStructuresRound = 1;
        if (this.firstStructuresRound === 1) {
            this.turn++;
            if (this.turn >= this.players.length) {
                this.turn = 4; // not pid = 4 , just -- than pid = 3
                this.firstStructuresRound = 2;
            }
        }
        if (this.firstStructuresRound === 2) {
            this.turn--;
            if (this.turn < 0) {
                this.turn = 0;
                this.firstStructuresRound = 3;
            }
        }
    };
    Game.prototype.processPlayerRequest = function (request) {
        this.checkTurn(request.pid);
        var player = this.players[this.turn];
        var action = new Action_1.Action(this, player, request);
        if (action.checkValid()) {
            action.doAction();
        }
        else {
            console.log("action failed"); // send message to client player
            console.log(action.message);
        }
    };
    Game.prototype.currentPlayerPass = function (request) {
        var player = this.players[this.turn];
        var prevRoundBoosterId = player.roundBooster.id;
        player.onPassBenefit();
        var roundBoosterId = request.roundBoosterID;
        if (this.roundBoosters[roundBoosterId].valid === true) {
            player.roundBooster = this.roundBoosters[roundBoosterId];
            this.roundBoosters[roundBoosterId].valid = false;
            this.roundBoosters[prevRoundBoosterId].valid = true;
        }
        else {
            throw new Error("RoundRooter used by other user");
        }
        // remove player from players to nextRound
        this.players.splice(this.turn - 1, 1);
        this.nextRound.push(player);
    };
    Game.prototype.getPlayer = function (pid) {
        for (var _i = 0, _a = this.players; _i < _a.length; _i++) {
            var player = _a[_i];
            if (player.pid === pid)
                return player;
        }
        for (var _b = 0, _c = this.nextRound; _b < _c.length; _b++) {
            var player = _c[_b];
            if (player.pid === pid)
                return player;
        }
        throw new Error("getPlayer error for pid is error");
    };
    return Game;
}());
exports.Game = Game;
