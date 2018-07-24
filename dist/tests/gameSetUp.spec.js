"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Lab = require("lab");
var code_1 = require("code");
var Game_1 = require("../logic/Game");
var Player_1 = require("../logic/Player");
var Request_1 = require("../logic/Request");
var Hex_1 = require("../logic/Hex");
var Structure_1 = require("../logic/Structure");
var Planet_1 = require("../logic/Planet");
var lab = Lab.script();
exports.lab = lab;
var describe = lab.describe, it = lab.it, beforeEach = lab.beforeEach;
function playerTest(p) {
    // this.vp = 10;
    // this.gold = 15;
    // this.ore = 4;
    // this.science = 3;
    // this.qic = 1;
    code_1.expect(p.vp).to.equal(10);
    code_1.expect(p.gold).to.equal(15);
    code_1.expect(p.ore).to.equal(4);
    code_1.expect(p.science).to.equal(3);
    code_1.expect(p.qic).to.equal(1);
}
describe('Game Before Setup Tests', function () {
    var g;
    beforeEach(function () {
        g = new Game_1.Game(1);
    });
    it('check game status zero player  ', function () {
        code_1.expect(g.stateMachine.currentState).to.equal(Game_1.GameStatus.Open);
    });
    it('check game status two player  ', function () {
        g.addPlayer(new Player_1.Player('yousong', Player_1.RaceType.Terrans));
        g.addPlayer(new Player_1.Player('nina', Player_1.RaceType.Lantids));
        code_1.expect(g.stateMachine.currentState).to.equal(Game_1.GameStatus.Open);
    });
    it('check game status 4 player  ', function () {
        g.addPlayer(new Player_1.Player('yousong', Player_1.RaceType.Terrans));
        g.addPlayer(new Player_1.Player('nina', Player_1.RaceType.Lantids));
        g.addPlayer(new Player_1.Player('yalei', Player_1.RaceType.Xenos));
        g.addPlayer(new Player_1.Player('rong', Player_1.RaceType.Gleens));
        code_1.expect(g.stateMachine.currentState).to.equal(Game_1.GameStatus.Setup);
    });
});
describe('Game SetUp Before Build First Structures Tests', function () {
    var g;
    beforeEach(function () {
        g = new Game_1.Game(1);
        g.addPlayer(new Player_1.Player('yousong', Player_1.RaceType.Terrans)); //blue
        g.addPlayer(new Player_1.Player('nina', Player_1.RaceType.Xenos)); //Yellow
        g.addPlayer(new Player_1.Player('yalei', Player_1.RaceType.Taklons)); //brown
        g.addPlayer(new Player_1.Player('rong', Player_1.RaceType.HadschHallas)); //red
    });
    it('check game status (GameStatus.Setup)  ', function () {
        code_1.expect(g.stateMachine.currentState).to.equal(Game_1.GameStatus.Setup);
    });
    it('check player planetType  ', function () {
        var player = g.getPlayer(0);
        code_1.expect(player.planetType).to.equal(Planet_1.PlanetType.Blue);
        // player  = g.getPlayer(1);
        // expect(player.planetType).to.equal(PlanetType.Yellow)
        // player  = g.getPlayer(2);
        // expect(player.planetType).to.equal(PlanetType.Brown)
        // player  = g.getPlayer(3);
        // expect(player.planetType).to.equal(PlanetType.Red)
    });
    it("setup player's  ore, knowledge, gold", function () {
        for (var _i = 0, _a = g.players; _i < _a.length; _i++) {
            var player = _a[_i];
            playerTest(player);
        }
    });
});
describe('Game SetUp Build First Structures Tests', function () {
    var g;
    beforeEach(function () {
        g = new Game_1.Game(1);
        g.addPlayer(new Player_1.Player('yousong', Player_1.RaceType.Terrans)); // blue
        g.addPlayer(new Player_1.Player('nina', Player_1.RaceType.Xenos)); //yellow
        g.addPlayer(new Player_1.Player('yalei', Player_1.RaceType.HadschHallas)); //red
        g.addPlayer(new Player_1.Player('rong', Player_1.RaceType.Nevlas)); //while
    });
    it('player(pid:0->1->2->3) build mine', function () {
        var request = new Request_1.Request();
        var hex = new Hex_1.Hex(0, 0, 0);
        request.type = Request_1.RequestType.FirstStructures;
        request.pid = 0;
        request.hex = hex;
        g.processSetupFirstStructures(request);
        code_1.expect(g.board.hasPlanet(hex)).to.equal(true);
        var planet = g.board.getPlanet(hex);
        code_1.expect(planet.building).to.equal(Structure_1.StructureType.Mine);
        code_1.expect(planet.type).to.equal(Planet_1.PlanetType.Blue);
        code_1.expect(planet.playerID).to.equal(0);
        var player = g.getPlayer(0);
        var mine = player.buildings.mines[0];
        code_1.expect(mine.status).to.equal(Structure_1.StructureStatus.Built);
        {
            var request_1 = new Request_1.Request();
            var hex_1 = new Hex_1.Hex(2, 3, -5);
            //console.log(hex)
            request_1.type = Request_1.RequestType.FirstStructures;
            request_1.pid = 1;
            request_1.hex = hex_1;
            g.processSetupFirstStructures(request_1);
            code_1.expect(g.board.hasPlanet(hex_1)).to.equal(true);
            var planet_1 = g.board.getPlanet(hex_1);
            code_1.expect(planet_1.building).to.equal(Structure_1.StructureType.Mine);
            code_1.expect(planet_1.type).to.equal(Planet_1.PlanetType.Yellow);
            code_1.expect(planet_1.playerID).to.equal(1);
            var player_1 = g.getPlayer(1);
            var mine_1 = player_1.buildings.mines[0];
            code_1.expect(mine_1.status).to.equal(Structure_1.StructureStatus.Built);
        }
        {
            var request_2 = new Request_1.Request();
            var hex_2 = new Hex_1.Hex(5, -2, -3);
            //console.log(hex)
            request_2.type = Request_1.RequestType.FirstStructures;
            request_2.pid = 2;
            request_2.hex = hex_2;
            g.processSetupFirstStructures(request_2);
            code_1.expect(g.board.hasPlanet(hex_2)).to.equal(true);
            var planet_2 = g.board.getPlanet(hex_2);
            code_1.expect(planet_2.building).to.equal(Structure_1.StructureType.Mine);
            code_1.expect(planet_2.type).to.equal(Planet_1.PlanetType.Red);
            code_1.expect(planet_2.playerID).to.equal(2);
            var player_2 = g.getPlayer(2);
            var mine_2 = player_2.buildings.mines[0];
            code_1.expect(mine_2.status).to.equal(Structure_1.StructureStatus.Built);
        }
        {
            var request_3 = new Request_1.Request();
            var hex_3 = new Hex_1.Hex(-5, 2, 3);
            //console.log(hex)
            request_3.type = Request_1.RequestType.FirstStructures;
            request_3.pid = 3;
            request_3.hex = hex_3;
            var player3 = g.getPlayer(3);
            g.processSetupFirstStructures(request_3);
            player3 = g.getPlayer(3);
            code_1.expect(g.board.hasPlanet(hex_3)).to.equal(true);
            var planet_3 = g.board.getPlanet(hex_3);
            code_1.expect(planet_3.building).to.equal(Structure_1.StructureType.Mine);
            code_1.expect(planet_3.type).to.equal(Planet_1.PlanetType.White);
            code_1.expect(planet_3.playerID).to.equal(3);
            var player_3 = g.getPlayer(3);
            var mine_3 = player_3.buildings.mines[0];
            code_1.expect(mine_3.status).to.equal(Structure_1.StructureStatus.Built);
        }
        //reverse
        {
            var request_4 = new Request_1.Request();
            var hex_4 = new Hex_1.Hex(-4, 2, 2);
            //console.log(hex)
            request_4.type = Request_1.RequestType.FirstStructures;
            request_4.pid = 3;
            request_4.hex = hex_4;
            g.processSetupFirstStructures(request_4);
            code_1.expect(g.board.hasPlanet(hex_4)).to.equal(true);
            var planet_4 = g.board.getPlanet(hex_4);
            code_1.expect(planet_4.building).to.equal(Structure_1.StructureType.Mine);
            code_1.expect(planet_4.type).to.equal(Planet_1.PlanetType.White);
            code_1.expect(planet_4.playerID).to.equal(3);
            var player_4 = g.getPlayer(3);
            code_1.expect(player_4.buildings.mines[0].status).to.equal(Structure_1.StructureStatus.Built);
            code_1.expect(player_4.buildings.mines[1].status).to.equal(Structure_1.StructureStatus.Built);
            code_1.expect(player_4.buildings.mines[2].status).to.equal(Structure_1.StructureStatus.Unbuilt);
        }
        {
            var request_5 = new Request_1.Request();
            var hex_5 = new Hex_1.Hex(6, -2, -4);
            //console.log(hex)
            request_5.type = Request_1.RequestType.FirstStructures;
            request_5.pid = 2;
            request_5.hex = hex_5;
            g.processSetupFirstStructures(request_5);
            code_1.expect(g.board.hasPlanet(hex_5)).to.equal(true);
            var planet_5 = g.board.getPlanet(hex_5);
            code_1.expect(planet_5.building).to.equal(Structure_1.StructureType.Mine);
            code_1.expect(planet_5.type).to.equal(Planet_1.PlanetType.Red);
            code_1.expect(planet_5.playerID).to.equal(2);
            var player_5 = g.getPlayer(2);
            code_1.expect(player_5.buildings.mines[0].status).to.equal(Structure_1.StructureStatus.Built);
            code_1.expect(player_5.buildings.mines[1].status).to.equal(Structure_1.StructureStatus.Built);
            code_1.expect(player_5.buildings.mines[2].status).to.equal(Structure_1.StructureStatus.Unbuilt);
        }
        {
            var request_6 = new Request_1.Request();
            var hex_6 = new Hex_1.Hex(3, 3, -6);
            //console.log(hex)
            request_6.type = Request_1.RequestType.FirstStructures;
            request_6.pid = 1;
            request_6.hex = hex_6;
            g.processSetupFirstStructures(request_6);
            code_1.expect(g.board.hasPlanet(hex_6)).to.equal(true);
            var planet_6 = g.board.getPlanet(hex_6);
            code_1.expect(planet_6.building).to.equal(Structure_1.StructureType.Mine);
            code_1.expect(planet_6.type).to.equal(Planet_1.PlanetType.Yellow);
            code_1.expect(planet_6.playerID).to.equal(1);
            var player_6 = g.getPlayer(1);
            code_1.expect(player_6.buildings.mines[0].status).to.equal(Structure_1.StructureStatus.Built);
            code_1.expect(player_6.buildings.mines[1].status).to.equal(Structure_1.StructureStatus.Built);
            code_1.expect(player_6.buildings.mines[2].status).to.equal(Structure_1.StructureStatus.Unbuilt);
        }
        {
            var request_7 = new Request_1.Request();
            var hex_7 = new Hex_1.Hex(3, -1, -2);
            //console.log(hex)
            request_7.type = Request_1.RequestType.FirstStructures;
            request_7.pid = 0;
            request_7.hex = hex_7;
            g.processSetupFirstStructures(request_7);
            code_1.expect(g.board.hasPlanet(hex_7)).to.equal(true);
            var planet_7 = g.board.getPlanet(hex_7);
            code_1.expect(planet_7.building).to.equal(Structure_1.StructureType.Mine);
            code_1.expect(planet_7.type).to.equal(Planet_1.PlanetType.Blue);
            code_1.expect(planet_7.playerID).to.equal(0);
            var player_7 = g.getPlayer(0);
            code_1.expect(player_7.buildings.mines[0].status).to.equal(Structure_1.StructureStatus.Built);
            code_1.expect(player_7.buildings.mines[1].status).to.equal(Structure_1.StructureStatus.Built);
            code_1.expect(player_7.buildings.mines[2].status).to.equal(Structure_1.StructureStatus.Unbuilt);
            code_1.expect(g.firstStructuresRound).to.equal(3);
        }
    });
});
describe('Player RoundBooster Request Tests', function () {
    var g;
    beforeEach(function () {
        g = new Game_1.Game(1);
        g.addPlayer(new Player_1.Player('yousong', Player_1.RaceType.Terrans));
        g.addPlayer(new Player_1.Player('nina', Player_1.RaceType.Lantids));
        g.addPlayer(new Player_1.Player('yalei', Player_1.RaceType.Xenos));
        g.addPlayer(new Player_1.Player('rong', Player_1.RaceType.Gleens));
    });
    it('check player get right Roundbooter ', function () {
        var request = new Request_1.Request();
        request.type = Request_1.RequestType.Roundbooter;
        request.pid = 0;
        request.roundBoosterID = 3;
        g.processRoundRooter(request);
        code_1.expect(g.players[0].roundBooster).to.equal(g.roundBoosters[3]);
        request.type = Request_1.RequestType.Roundbooter;
        request.pid = 1;
        request.roundBoosterID = 4;
        g.processRoundRooter(request);
        code_1.expect(g.players[1].roundBooster).to.equal(g.roundBoosters[4]);
    });
    it('check game status and after 4 players get Roundbooter ', function () {
        var request = new Request_1.Request();
        request.type = Request_1.RequestType.Roundbooter;
        request.pid = 0;
        request.roundBoosterID = 3;
        g.processRoundRooter(request);
        code_1.expect(g.players[0].roundBooster).to.equal(g.roundBoosters[3]);
        request.pid = 1;
        request.roundBoosterID = 4;
        g.processRoundRooter(request);
        code_1.expect(g.players[1].roundBooster).to.equal(g.roundBoosters[4]);
        request.pid = 2;
        request.roundBoosterID = 0;
        g.processRoundRooter(request);
        code_1.expect(g.players[2].roundBooster).to.equal(g.roundBoosters[0]);
        request.pid = 3;
        request.roundBoosterID = 9;
        g.processRoundRooter(request);
        code_1.expect(g.players[3].roundBooster).to.equal(g.roundBoosters[9]);
        // jump from Setup to Playing or later stage
        code_1.expect(g.stateMachine.currentState).to.equal(Game_1.GameStatus.Actions);
    });
});
