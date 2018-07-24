"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Lab = require("lab");
var code_1 = require("code");
var Game_1 = require("../logic/Game");
var Player_1 = require("../logic/Player");
var Request_1 = require("../logic/Request");
var Hex_1 = require("../logic/Hex");
var Action_1 = require("../logic/Action");
var lab = Lab.script();
exports.lab = lab;
var describe = lab.describe, it = lab.it, before = lab.before;
describe('Player Actions Tests', function () {
    var g;
    before(function () {
        g = new Game_1.Game(1);
        g.addPlayer(new Player_1.Player('yousong', Player_1.RaceType.Terrans)); // blue
        g.addPlayer(new Player_1.Player('nina', Player_1.RaceType.Xenos)); //yellow
        g.addPlayer(new Player_1.Player('yalei', Player_1.RaceType.HadschHallas)); //red
        g.addPlayer(new Player_1.Player('rong', Player_1.RaceType.Nevlas)); //while
        // FirstStructures
        {
            var request_1 = new Request_1.Request();
            var hex = new Hex_1.Hex(0, 0, 0);
            request_1.type = Request_1.RequestType.FirstStructures;
            request_1.pid = 0;
            request_1.hex = hex;
            g.processSetupFirstStructures(request_1);
        }
        {
            var request_2 = new Request_1.Request();
            var hex = new Hex_1.Hex(2, 3, -5);
            //console.log(hex)
            request_2.type = Request_1.RequestType.FirstStructures;
            request_2.pid = 1;
            request_2.hex = hex;
            g.processSetupFirstStructures(request_2);
        }
        {
            var request_3 = new Request_1.Request();
            var hex = new Hex_1.Hex(5, -2, -3);
            //console.log(hex)
            request_3.type = Request_1.RequestType.FirstStructures;
            request_3.pid = 2;
            request_3.hex = hex;
            g.processSetupFirstStructures(request_3);
        }
        {
            var request_4 = new Request_1.Request();
            var hex = new Hex_1.Hex(-5, 2, 3);
            //console.log(hex)
            request_4.type = Request_1.RequestType.FirstStructures;
            request_4.pid = 3;
            request_4.hex = hex;
            var player3 = g.getPlayer(3);
            g.processSetupFirstStructures(request_4);
        }
        //reverse
        {
            var request_5 = new Request_1.Request();
            var hex = new Hex_1.Hex(-4, 2, 2);
            //console.log(hex)
            request_5.type = Request_1.RequestType.FirstStructures;
            request_5.pid = 3;
            request_5.hex = hex;
            g.processSetupFirstStructures(request_5);
        }
        {
            var request_6 = new Request_1.Request();
            var hex = new Hex_1.Hex(6, -2, -4);
            //console.log(hex)
            request_6.type = Request_1.RequestType.FirstStructures;
            request_6.pid = 2;
            request_6.hex = hex;
            g.processSetupFirstStructures(request_6);
        }
        {
            var request_7 = new Request_1.Request();
            var hex = new Hex_1.Hex(3, 3, -6);
            //console.log(hex)
            request_7.type = Request_1.RequestType.FirstStructures;
            request_7.pid = 1;
            request_7.hex = hex;
            g.processSetupFirstStructures(request_7);
        }
        {
            var request_8 = new Request_1.Request();
            var hex = new Hex_1.Hex(3, -1, -2);
            //console.log(hex)
            request_8.type = Request_1.RequestType.FirstStructures;
            request_8.pid = 0;
            request_8.hex = hex;
            g.processSetupFirstStructures(request_8);
        }
        var request = new Request_1.Request();
        request.type = Request_1.RequestType.Roundbooter;
        request.pid = 0;
        request.roundBoosterID = 3;
        g.processRoundRooter(request);
        request.pid = 1;
        request.roundBoosterID = 4;
        g.processRoundRooter(request);
        request.pid = 2;
        request.roundBoosterID = 0;
        g.processRoundRooter(request);
        request.pid = 3;
        request.roundBoosterID = 9;
        g.processRoundRooter(request);
    });
    it('check game status', function () {
        code_1.expect(g.stateMachine.currentState).to.equal(Game_1.GameStatus.Actions);
    });
    it('yousong player(pid:0) send a build mine structure request to Game', function () {
        var request = new Request_1.Request();
        request.type = Request_1.RequestType.Action;
        request.actionType = Action_1.ActionType.BuildMine;
        request.pid = 0;
        request.hex = new Hex_1.Hex(3, -2, -1);
        g.processPlayerRequest(request);
        var player = g.getPlayer(request.pid);
        if (player === null) {
            code_1.expect(0).to.equal(1);
        }
        else {
            // expect(player.name).to.equal("yousong")
            // console.log(g.turn)
            // expect(g.turn).to.equal(1)
            //
            // expect(player.planets.length).to.equal(1)
        }
    });
});
