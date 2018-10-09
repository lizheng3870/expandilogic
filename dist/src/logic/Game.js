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
var Store_1 = require("./Store");
var Federation_1 = require("./Federation");
var GFirebase_1 = require("./GFirebase");
var GameStatus;
(function (GameStatus) {
    GameStatus[GameStatus["Open"] = 0] = "Open";
    GameStatus[GameStatus["Setup"] = 1] = "Setup";
    GameStatus[GameStatus["Playing"] = 2] = "Playing";
    GameStatus[GameStatus["Income"] = 3] = "Income";
    GameStatus[GameStatus["Gaiaforming"] = 4] = "Gaiaforming";
    GameStatus[GameStatus["Actions"] = 5] = "Actions";
    GameStatus[GameStatus["CleanUp"] = 6] = "CleanUp";
    GameStatus[GameStatus["Scoring"] = 7] = "Scoring";
    GameStatus[GameStatus["Over"] = 8] = "Over";
})(GameStatus || (GameStatus = {}));
exports.GameStatus = GameStatus;
var Config;
(function (Config) {
    Config[Config["PlayerLimit"] = 4] = "PlayerLimit";
})(Config = exports.Config || (exports.Config = {}));
var Game = /** @class */ (function () {
    function Game(gid) {
        var _this = this;
        this.players = [];
        this.nextRound = []; // passed player will go here for next round
        this.benefits = [];
        // console.log(`creating game ${gid}`)
        this.gid = gid;
        this.round = 1; // first round is 1
        this.turn = 0; // start from 0;
        //     this.status = GameStatus.Open
        this.board = new MapBoard_1.MapBoard();
        this.exchange = new Exchange_1.Exchange();
        this.scoringBoard = new ScoringBoard_1.ScoringBoard();
        this.roundBoosters = [];
        this.federationlib = new Federation_1.FederationLib();
        this.playernum = 0;
        // now for test, we set the boolean to false, so the tech tile position will not be random
        // and the advanced tech tile would also stay in the same position
        // in real game, the boolean should be true
        this.techBoard = new TechBoard_1.default(false, this.federationlib.getDigLaneSpeicalFederationToken());
        this.loadRoundBooster();
        this.firstStructuresRound = 0;
        this.store = new Store_1.Store();
        this.stateMachine = new TypeState_1.TypeState.FiniteStateMachine(GameStatus.Open);
        this.stateMachine.from(GameStatus.Open).to(GameStatus.Setup);
        this.stateMachine.from(GameStatus.Setup).to(GameStatus.Playing);
        this.stateMachine.from(GameStatus.Playing).to(GameStatus.Income);
        this.stateMachine.from(GameStatus.Income).to(GameStatus.Gaiaforming);
        this.stateMachine.from(GameStatus.Gaiaforming).to(GameStatus.Actions);
        this.stateMachine.from(GameStatus.Actions).to(GameStatus.Actions);
        this.stateMachine.from(GameStatus.Actions).to(GameStatus.CleanUp);
        this.stateMachine.from(GameStatus.CleanUp).to(GameStatus.Playing);
        this.stateMachine.from(GameStatus.Actions).to(GameStatus.Scoring); // final score, after all player passes
        this.stateMachine.from(GameStatus.Scoring).to(GameStatus.Over);
        this.stateMachine.on(GameStatus.Setup, function (from) {
            _this.setup();
        });
        this.stateMachine.on(GameStatus.Income, function (from) {
            _this.IncomePhase();
            _this.stateMachine.go(GameStatus.Gaiaforming);
        });
        this.stateMachine.on(GameStatus.Gaiaforming, function (from) {
            _this.GaiaPhase();
            _this.stateMachine.go(GameStatus.Actions);
        });
        // this.stateMachine.on(GameStatus.Actions, (from: GameStatus)=>{
        //  //  this.IncomePhase();
        // })
        this.stateMachine.on(GameStatus.CleanUp, function (from) {
            // after Clean-Up to play new game
            _this.stateMachine.go(GameStatus.Playing);
        });
        this.stateMachine.on(GameStatus.Scoring, function (from) {
            _this.finalScore();
            _this.stateMachine.go(GameStatus.Over);
        });
    }
    Game.prototype.setPlayerNum = function (playernum) {
        this.playernum = playernum;
    };
    Game.prototype.addPlayerNew = function (name, raceType) {
        // if(raceType === RaceType.Terrans){ //blue
        //   let player = new Terrans(name);
        // }
        //
        //
        // if(raceType === RaceType.Xenos ){
        //       let player = new Xenos(name);
        // }
        //
        //
        // if(raceType === RaceType.HadschHallas){
        //     let player = new Xenos(HadschHallas);
        // }
        //
        // if(raceType === RaceType.Nevlas){
        //     let player = new Xenos(Nevlas);
        // }
        // return  this.addPlayer(player);
        return true;
    };
    Game.prototype.addPlayer = function (player) {
        if (this.players.length === Config.PlayerLimit) {
            throw new Error("Config.PlayerLimit (" + Config.PlayerLimit + ") reached");
        }
        else {
            //check for another player of the same race
            var sameRace = this.players.findIndex(function (p) { return p.raceType === player.raceType; });
            if (player.raceType !== null && sameRace !== -1) {
                throw new Error("a player already exists with that raceType: " + player.raceType + "/" + this.players[sameRace]);
            }
            this.players.push(player);
            player.pid = this.players.length - 1;
        }
        if (this.players.length === this.playernum) {
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
        this.turn++;
        if (this.turn >= this.players.length) {
            this.turn = 0;
        }
    };
    Game.prototype.endRound = function () {
        this.round++;
        this.turn = 0;
        var tmp = this.players;
        this.players = this.nextRound;
        this.nextRound = tmp;
        // action = > playing
        if (this.round === 7) {
            this.stateMachine.go(GameStatus.Scoring);
        }
        else {
            this.stateMachine.go(GameStatus.CleanUp);
        }
    };
    Game.prototype.newRound = function () {
        if (this.stateMachine.currentState === GameStatus.Over) {
            console.log("game over winer " + this.players[0].name);
            return;
        }
        this.stateMachine.go(GameStatus.Income);
    };
    Game.prototype.IncomePhase = function () {
        for (var i = 0; i < this.players.length; i++) {
            this.calculateIncome(this.players[i]);
        }
    };
    Game.prototype.GaiaPhase = function () {
        for (var i = 0; i < this.players.length; i++) {
            this.players[i].GaiaPhase();
        }
    };
    Game.prototype.calculateIncome = function (player) {
        player.calculateIncomeBenefit();
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
            console.log("current Player pid: " + currentPlayer.pid + ", curren turn : " + this.turn);
            return false;
        }
        else {
            return true;
        }
    };
    Game.prototype.nextPlayerPid = function () {
        var currentPlayer = this.players[this.turn];
        return currentPlayer.pid;
    };
    Game.prototype.getRoundBooster = function () {
        for (var _i = 0, _a = this.roundBoosters; _i < _a.length; _i++) {
            var item = _a[_i];
            console.log("id  " + item.id + "   valid " + item.valid);
        }
    };
    Game.prototype.processRoundRooter = function (request) {
        if (this.checkTurn(request.pid) === false)
            return;
        if (this.stateMachine.currentState !== GameStatus.Setup) {
            console.log("this.stateMachine.currentState = " + this.stateMachine.currentState);
            console.log("Expect " + GameStatus.Setup);
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
            return false;
        var player = this.getPlayer(request.pid);
        if (request.type === Request_1.RequestType.FirstStructures) {
            // check planet exist
            if (this.board.hasPlanet(request.hex) === false) {
                console.log("planet is not exist");
                return false;
            }
            var planet = this.board.getPlanet(request.hex);
            var mine = player.getAvalibleMine();
            if (mine === null)
                return false;
            //console.log(player.pid+ "   >>player.planetType  >>  " + player.planetType)
            //console.log("planet.type" + planet.type)
            // put mine on planet
            if (planet.type === player.planetType) {
                this.board.buildMine(request.hex, player.pid);
                mine.status = Structure_1.StructureStatus.Built;
                player.planets.push(planet);
            }
            else {
                console.log("planetType error");
                return false;
            }
        }
        if (this.firstStructuresRound === 0)
            this.firstStructuresRound = 1;
        if (this.firstStructuresRound === 1) {
            this.turn++;
            if (this.turn >= this.players.length) {
                this.turn = this.players.length; // not pid = 4 , just -- than pid = 3
                this.firstStructuresRound = 2;
            }
        }
        if (this.firstStructuresRound === 2) {
            this.turn--;
            if (this.turn <= 0) {
                this.turn = 0;
                this.firstStructuresRound = 3;
            }
        }
        return true;
    };
    Game.prototype.processPlayerRequest = function (request) {
        this.checkTurn(request.pid);
        var player = this.players[this.turn];
        var action = new Action_1.Action(this, player, request);
        if (action.checkValid()) {
            console.log(111);
            action.doAction();
            console.log(222);
            if (request.actionType === Action_1.ActionType.Free || request.actionType === Action_1.ActionType.Special ||
                (request.actionType === Action_1.ActionType.PowerAndQIC && request.techLane === Request_1.TechLaneType.Dig)) {
                // can not to next turn
            }
            else if (request.actionType === Action_1.ActionType.Pass) {
                // in this case turn will not change but current player move to nextRound
                if (this.players.length === 0) {
                    this.endRound();
                    this.newRound();
                }
                // just not turn ++
                if (this.turn >= this.players.length) {
                    this.turn = 0;
                }
                this.clearSpecialDigOrRange(player);
            }
            else {
                this.clearSpecialDigOrRange(player);
                this.nextTurn();
            }
        }
        else {
            console.log("action failed"); // send message to client player
            console.log(action.message);
        }
    };
    Game.prototype.clearSpecialDigOrRange = function (player) {
        player.specialDig = 0;
        player.specialRange = 0;
    };
    Game.prototype.currentPlayerPass = function (request) {
        var player = this.players[this.turn];
        var prevRoundBoosterId = player.roundBooster.id;
        player.onPassBenefit();
        if (this.round !== 6) { // final round not need  roundBoosterID
            var roundBoosterId = request.roundBoosterID;
            if (this.roundBoosters[roundBoosterId].valid === true) {
                player.roundBooster = this.roundBoosters[roundBoosterId];
                this.roundBoosters[roundBoosterId].valid = false;
                this.roundBoosters[prevRoundBoosterId].valid = true;
            }
            else {
                throw new Error("RoundRooter used by other user");
            }
        }
        // remove player from players to nextRound
        this.players.splice(this.turn, 1);
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
    Game.prototype.getPlayer2 = function (pid) {
        for (var _i = 0, _a = this.players; _i < _a.length; _i++) {
            var player = _a[_i];
            console.log(" id " + player.pid);
            //if(player.pid === pid)return player;
        }
        for (var _b = 0, _c = this.nextRound; _b < _c.length; _b++) {
            var player = _c[_b];
            console.log("nextround id " + player.pid);
            //if(player.pid === pid)return player;
        }
        //throw new Error(`getPlayer error for pid is error`)
    };
    Game.prototype.trigerRoundScoringBenefit = function (triger, type) {
        var benefit = this.scoringBoard.roundBenefits[this.round - 1];
        if (triger === benefit.trigger && type === benefit.object) { // only check two fields is enough
            this.players[this.turn].onBenefit(benefit);
        }
        // such action also triger techtile or roundBooster benefits;
        this.players[this.turn].triggerBenefit(triger, type);
    };
    Game.prototype.finalScore = function () {
        // scoring Board
        this.scoringBoardFinal();
        this.techBoardFinalScoring();
        this.ResourceFinalScoring();
        this.players.sort(function (a, b) {
            return b.vp - a.vp;
        });
        console.log("final score");
        for (var _i = 0, _a = this.players; _i < _a.length; _i++) {
            var player = _a[_i];
            console.log("player " + player.name + " (pid:" + player.pid + ")  vp " + player.vp);
        }
    };
    Game.prototype.ResourceFinalScoring = function () {
        for (var _i = 0, _a = this.players; _i < _a.length; _i++) {
            var player = _a[_i];
            player.vp += Math.floor(player.science / 3);
            player.vp += Math.floor(player.ore / 3);
            player.vp += Math.floor(player.gold / 3);
        }
    };
    Game.prototype.techBoardFinalScoring = function () {
        for (var _i = 0, _a = this.players; _i < _a.length; _i++) {
            var player = _a[_i];
            var count = 0;
            for (var _b = 0, _c = player.techs; _b < _c.length; _b++) {
                var level = _c[_b];
                if (level >= 3) {
                    count++;
                }
            }
            player.vp += 4 * count;
            //console.log(4 * count+ " tech vp add to "+ player.name)
        }
    };
    Game.prototype.scoringBoardFinal = function () {
        this.getFinalCountPlayers(this.scoringBoard.finalCounts[0]);
        // for(let player of this.players){
        //   console.log(player.pid + "  " + player.name + "   score "+ player.sortByValue)
        // }
        this.players[0].vp + 18;
        this.players[0].vp + 12;
        this.players[0].vp + 6;
        // final second count
        this.getFinalCountPlayers(this.scoringBoard.finalCounts[1]);
        // for(let player of this.players){
        //   console.log(player.pid + "  " + player.name + "   score "+ player.sortByValue)
        // }
        this.players[0].vp + 18;
        this.players[0].vp + 12;
        this.players[0].vp + 6;
    };
    Game.prototype.getFinalCountPlayers = function (count) {
        for (var _i = 0, _a = this.players; _i < _a.length; _i++) {
            var player = _a[_i];
            if (count === ScoringBoard_1.FinalCount.Sectors) {
                player.sortByValue = player.getSectors();
            }
            if (count === ScoringBoard_1.FinalCount.Buildings) {
                player.sortByValue = player.getBuildings();
            }
            if (count === ScoringBoard_1.FinalCount.FederationBuildings) {
                player.sortByValue = player.getFedarationBuildings();
            }
            if (count === ScoringBoard_1.FinalCount.PlanetTypes) {
                player.sortByValue = player.getPlanetTypes();
            }
            if (count === ScoringBoard_1.FinalCount.Gaia) {
                player.sortByValue = player.getGaiaNum();
            }
            if (count === ScoringBoard_1.FinalCount.Satellites) {
                player.sortByValue = player.satellites;
            }
        }
        this.players.sort(function (a, b) {
            return b.sortByValue - a.sortByValue;
        });
    };
    Game.prototype.clearSaveGame = function () {
        var itemsRef = GFirebase_1.default.database().ref('game/' + this.gid + '/mapboard');
        itemsRef.set("");
        var itemsRef2 = GFirebase_1.default.database().ref('game/' + this.gid + '/players');
        itemsRef2.set("");
        var itemsRef3 = GFirebase_1.default.database().ref('game/' + this.gid + '/status');
        itemsRef3.set("");
    };
    Game.prototype.saveGame = function () {
        var itemsRef = GFirebase_1.default.database().ref('game/' + this.gid + '/mapboard');
        itemsRef.set(this.board.dumpSpace());
        var itemsRef2 = GFirebase_1.default.database().ref('game/' + this.gid + '/players');
        itemsRef2.set(this.dumpPlayers());
        var itemsRef3 = GFirebase_1.default.database().ref('game/' + this.gid + '/status');
        itemsRef3.set(this.stateMachine.currentState);
    };
    Game.prototype.dumpPlayers = function () {
        var data = [];
        for (var _i = 0, _a = this.players; _i < _a.length; _i++) {
            var player = _a[_i];
            data.push(player.getJsonData());
        }
        return data;
    };
    return Game;
}());
exports.Game = Game;
