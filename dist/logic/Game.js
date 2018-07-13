"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Exchange_1 = require("./Exchange");
var MapBoard_1 = require("./MapBoard");
var TechBoard_1 = require("./TechBoard");
var Phase;
(function (Phase) {
    Phase[Phase["Income"] = 0] = "Income";
    Phase[Phase["Gaiaforming"] = 1] = "Gaiaforming";
    Phase[Phase["Actions"] = 2] = "Actions";
})(Phase || (Phase = {}));
var GameStatus;
(function (GameStatus) {
    GameStatus[GameStatus["Open"] = 0] = "Open";
    GameStatus[GameStatus["Setup"] = 1] = "Setup";
    GameStatus[GameStatus["Playing"] = 2] = "Playing";
    GameStatus[GameStatus["Scoring"] = 3] = "Scoring";
    GameStatus[GameStatus["Over"] = 4] = "Over";
})(GameStatus || (GameStatus = {}));
var Config;
(function (Config) {
    Config[Config["PlayerLimit"] = 4] = "PlayerLimit";
})(Config || (Config = {}));
var Game = /** @class */ (function () {
    function Game(gid) {
        this.round = 1;
        this.players = [];
        this.turn = 0; // start from 0;
        this.phase = Phase.Income;
        this.status = GameStatus.Open;
        this.board = new MapBoard_1.MapBoard();
        this.techBoard = new TechBoard_1.default();
        this.roundBoosters = [];
        this.exchange = new Exchange_1.Exchange();
    }
    Game.prototype.addPlayer = function (player) {
        if (this.players.length === Config.PlayerLimit) {
            return false;
        }
        else {
            this.players.push(player);
            player.pid = this.players.length - 1;
        }
        if (this.players.length === Config.PlayerLimit) {
            this.status = GameStatus.Setup;
            this.start();
        }
        return true;
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
        this.IncomePhase();
    };
    Game.prototype.IncomePhase = function () {
        for (var i = 0; i < 4; i++) {
            this.calculateIncome(this.players[i]);
        }
    };
    Game.prototype.calculateIncome = function (player) {
    };
    Game.prototype.display = function () {
        console.log(this.players);
    };
    return Game;
}());
exports.default = Game;
