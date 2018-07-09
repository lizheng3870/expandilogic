import { Action } from './Action';
import Exchange from './Exchange';
import { MapBoard } from './MapBoard';
import RoundBooster from './RoundBooster';
import TechBoard from './TechBoard';
var Game = /** @class */ (function () {
    function Game(gid) {
        this.round = 1;
        this.players = [];
        this.playerNum = 0;
        this.turn = 0; // start from 0;
        this.phase = 0; // 0 wait for roundbooter 1 after roundbooter calculate income, 2 wait for player 3 end of round
        this.status = 0; // 0 waiting 0  1 processind 2 end
        this.board = new MapBoard();
        this.techBoard = new TechBoard();
        this.passed = []; // how many  players passed
        this.roundBoosters = [];
        this.loadRoundBooster();
        this.exchange = new Exchange();
    }
    Game.prototype.addPlayer = function (player) {
        if (this.playerNum === 4) {
            return false;
        }
        else {
            this.players[this.playerNum] = player;
            player.pid = this.playerNum;
            this.playerNum++;
            if (this.playerNum === 4) {
                this.status = 1;
                this.start();
            }
            return true;
        }
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
    // whatNext(){
    //
    // }
    Game.prototype.endRound = function () {
        this.CleanUPPhase();
        this.round++;
        this.turn = 0;
        for (var i = 0; i < 4; i++) {
            this.players[i].passed = false;
        }
    };
    Game.prototype.newRound = function () {
        // this.exchange.clear();
        this.IncomePhase();
    };
    Game.prototype.IncomePhase = function () {
        for (var i = 0; i < 4; i++) {
            this.calculateIncomeAtBeginOfRound(this.players[i]);
        }
    };
    Game.prototype.calculateIncomeAtBeginOfRound = function (player) {
        player.income.doIncome(player);
    };
    // public GaiaPhase(){
    //
    // }
    //
    // public CleanUPPhase(){
    //
    // }
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
//# sourceMappingURL=Game.js.map