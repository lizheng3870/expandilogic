"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Lab = require("lab");
var code_1 = require("code");
var Game_1 = require("../logic/Game");
var Player_1 = require("../logic/Player");
var Request_1 = require("../logic/Request");
var Action_1 = require("../logic/Action");
var Store_1 = require("../logic/Store");
var TechBoard_1 = require("../logic/TechBoard");
var lab = Lab.script();
exports.lab = lab;
var describe = lab.describe, it = lab.it, before = lab.before;
describe('qic action test', function () {
    var g;
    before(function () {
        var playernum = 3;
        var race = new Array(playernum);
        g = new Game_1.Game(1);
        g.techBoard = new TechBoard_1.default(false);
        var i = 0;
        g.setPlayerNum(playernum);
        var numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
        var randomRace = shuffle(numbers);
        var numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        var randomRoundBoosterID = shuffle(numbers);
        while (g.players.length < playernum) {
            console.log(randomRace);
            console.log("Player" + i + " is" + randomRace[i]);
            g.addPlayer(Player_1.CreatePlayer('Play' + i, randomRace[i])); // random
            console.log("Player plant type: " + g.players[i].planetType + "Player's race type" + g.players[i].raceType);
            i++;
        }
        var playAvailablePlanetMap = new Map();
        var playAvailablePlanetList;
        for (var i_1 = 0; i_1 < g.board.planets.length; i_1++) {
            // console.log(g.board.planets[i]);
            for (var j = 0; j < g.players.length; j++) {
                if (g.board.planets[i_1].type == g.players[j].planetType) {
                    // console.log("Planet type: "+g.board.planets[i].type+ "Player plant type: "+  g.players[j].planetType+ "Player's race type" + g.players[j].raceType);
                    if (!playAvailablePlanetMap.has(j))
                        playAvailablePlanetList = new Array();
                    else {
                        playAvailablePlanetList = playAvailablePlanetMap.get(j);
                    }
                    playAvailablePlanetList.push(g.board.planets[i_1]);
                    playAvailablePlanetMap.set(j, playAvailablePlanetList);
                }
            }
        }
        for (var i_2 = 0; i_2 < g.players.length; i_2++) {
            console.log("Turn: " + g.turn);
            var request = new Request_1.Request();
            var current_player = g.turn % g.players.length;
            var player = g.players[current_player];
            var playerAvailabePlanet = playAvailablePlanetMap.get(current_player);
            var randomNum = Math.floor(Math.random() * playerAvailabePlanet.length);
            console.log("Random num is " + randomNum);
            var randomPlant = playerAvailabePlanet[randomNum];
            console.log("Player choose Planets " + randomPlant.type);
            var hex = randomPlant.loc;
            console.log("Planet's loc is " + hex);
            request.type = Request_1.RequestType.FirstStructures;
            request.pid = g.players[i_2].pid;
            request.hex = hex;
            g.processSetupFirstStructures(request);
        }
        //Revert Place Mines
        for (i = g.players.length - 1; i >= 0; i--) {
            //3210
            console.log("Turn: " + g.turn);
            var request = new Request_1.Request();
            var current_player = g.turn % g.players.length;
            var player = g.players[current_player];
            var playerAvailabePlanet = playAvailablePlanetMap.get(current_player);
            var hex = void 0;
            var randomNum = Math.floor(Math.random() * playerAvailabePlanet.length);
            console.log("Random num is " + randomNum);
            var randomPlant = playerAvailabePlanet[randomNum];
            console.log("Player choose Planets " + randomPlant.type);
            hex = randomPlant.loc;
            console.log("Planet's loc is " + hex);
            request.type = Request_1.RequestType.FirstStructures;
            request.pid = g.players[i].pid;
            request.hex = hex;
            g.processSetupFirstStructures(request);
        }
        console.log("End reverse");
        // console.log("Play0's Planets "+ g.players[0].planets)
        for (var i_3 = 0; i_3 < g.players.length; i_3++) {
            console.log("Turn: " + g.turn);
            //loop to pick random booster
            var request = new Request_1.Request();
            request.type = Request_1.RequestType.Roundbooter;
            request.pid = g.players[i_3].pid;
            ;
            request.roundBoosterID = randomRoundBoosterID[i_3];
            g.processRoundRooter(request);
            console.log("Player #" + request.pid + " pick roundBoosterID " + request.roundBoosterID);
        }
    });
    it('check game status', function () {
        code_1.expect(g.stateMachine.currentState).to.equal(Game_1.GameStatus.Actions);
    });
    it('power ore action test', function () {
        var current_player = 0;
        var player = g.players[current_player];
        var request = new Request_1.Request();
        request.type = Request_1.RequestType.Action;
        request.actionType = Action_1.ActionType.PowerAndQIC; // power and qic action
        request.pid = player.pid;
        //player.power.bowl3 = 10;
        request.storeMerchandiseType = Store_1.StoreMerchandiseType.Pw4ore2;
        console.log("Player #" + request.pid + " will do action " + request.actionType);
        console.log("*************************************");
        g.processPlayerRequest(request);
        console.log("******************see the benefit****************************");
        console.log(player);
    });
    it('power glod action test', function () {
        var current_player = 0;
        var player = g.players[current_player];
        var request = new Request_1.Request();
        request.type = Request_1.RequestType.Action;
        request.actionType = Action_1.ActionType.PowerAndQIC; // power and qic action
        request.pid = player.pid;
        // player.power.bowl3 = 6;
        request.storeMerchandiseType = Store_1.StoreMerchandiseType.Pw4gold7;
        console.log("Player #" + request.pid + " will do action " + request.actionType);
        console.log("*************************************");
        g.processPlayerRequest(request);
        console.log("******************see the benefit****************************");
        console.log(player);
    });
    it('qic vp action test', function () {
        var current_player = 0;
        var player = g.players[current_player];
        player.qic += 4;
        var request = new Request_1.Request();
        request.type = Request_1.RequestType.Action;
        request.actionType = Action_1.ActionType.PowerAndQIC; // power and qic action
        request.pid = player.pid;
        request.storeMerchandiseType = Store_1.StoreMerchandiseType.qic2vp;
        console.log("Player #" + request.pid + " will do action " + request.actionType);
        console.log("*************************************");
        g.processPlayerRequest(request);
        console.log("******************see the benefit****************************");
        console.log(player);
    });
    it('qic feneration action test', function () {
        var current_player = 0;
        var player = g.players[current_player];
        player.qic += 4;
        var request = new Request_1.Request();
        request.type = Request_1.RequestType.Action;
        request.actionType = Action_1.ActionType.PowerAndQIC; // power and qic action
        request.pid = player.pid;
        request.storeMerchandiseType = Store_1.StoreMerchandiseType.qic3fed;
        if (!new Action_1.Action(g, player, request).checkValid()) {
            console.log("Player #" + request.pid + " will do action " + request.actionType);
            console.log("*************************************");
            g.processPlayerRequest(request);
            console.log("******************see the benefit****************************");
            // console.log(player)
        }
    });
    it('qic techtile action test', function () {
        var current_player = 0;
        var player = g.players[current_player];
        player.qic += 4;
        console.log(player);
        var request = new Request_1.Request();
        request.type = Request_1.RequestType.Action;
        request.actionType = Action_1.ActionType.PowerAndQIC; // power and qic action
        request.pid = player.pid;
        request.storeMerchandiseType = Store_1.StoreMerchandiseType.qic4tile;
        if (!new Action_1.Action(g, player, request).checkValid()) {
            console.log("Player #" + request.pid + " will do action " + request.actionType);
            console.log("*************************************");
            g.processPlayerRequest(request);
            console.log("******************see the benefit****************************");
            // console.log(player)
        }
    });
    function shuffle(o) {
        for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x)
            ;
        return o;
    }
    ;
});
