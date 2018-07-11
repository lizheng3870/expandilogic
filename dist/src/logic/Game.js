import { Action } from './Action';
import { Exchange } from './Exchange';
import { MapBoard } from './MapBoard';
import RoundBooster from './RoundBooster';
import TechBoard from './TechBoard';
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
        this.board = new MapBoard();
        this.techBoard = new TechBoard();
        this.roundBoosters = [];
        this.exchange = new Exchange();
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
        // send message to all player
        // wait for take RoundBooter
    };
    Game.prototype.nextTurn = function () {
        console.log("current round " + this.round + " turn " + this.turn);
        if (this.passed === 4) {
            this.endRound();
            this.newRound();
        }
        if (this.turn === 3 && this.phase === 0 && this.round === 1) {
            this.phase = 1;
            this.IncomePhase();
            this.phase = 2;
        }
        this.turn++;
        if (this.turn === 4) {
            this.turn = 0;
        }
        var player = this.players[this.turn];
        if (player.passed) {
            this.nextTurn();
        }
    };
    Game.prototype.endRound = function () {
        this.round++;
        this.turn = 0;
        for (var i = 0; i < 4; i++) {
            this.players[i].passed = false;
        }
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
        player.income.doIncome(player);
    };
    Game.prototype.processRoundRooter = function (data) {
        if (this.phase !== 0) {
            console.log("error phase for processRoundRooter ");
        }
        var player = this.players[data.pid];
        if (data.type === 'roundbooter') {
            var roundBoosterId = data.roundBoosterID;
            if (player.roundBooster == null && this.roundBoosters[roundBoosterId].valid === true) {
                player.roundBooster = this.roundBoosters[roundBoosterId];
                this.roundBoosters[roundBoosterId].valid = false;
            }
        }
        // send to all client;
        this.nextTurn();
    };
    Game.prototype.processRequest = function (data) {
        // console.log(data);
        if (this.phase !== 2) {
            console.log("error phase for processRequest expect 2 real phase:  " + this.phase);
        }
        var player = this.players[data.pid];
        var action = new Action(this, this.board, player, data);
        if (player.pid !== this.turn) {
            console.log("pid error " + player.pid + "   " + this.turn);
            console.log(data);
            return false;
        }
        if (action.checkValid() === false) {
            console.log("checkvalid ");
            console.log(data);
            return false;
        }
        action.doAction();
        // send to all client;
        this.nextTurn();
    };
    Game.prototype.display = function () {
        console.log(this.players);
    };
    Game.prototype.loadRoundBooster = function () {
        for (var i = 0; i < 10; i++) {
            this.roundBoosters[i] = new RoundBooster(i);
        }
    };
    return Game;
}());
export default Game;
