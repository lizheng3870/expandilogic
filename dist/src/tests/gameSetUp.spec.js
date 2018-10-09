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
var describe = lab.describe, it = lab.it, beforeEach = lab.beforeEach, before = lab.before;
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
        g.addPlayer(Player_1.CreatePlayer('yousong', Player_1.RaceType.Terrans));
        g.addPlayer(Player_1.CreatePlayer('nina', Player_1.RaceType.Lantids));
        code_1.expect(g.stateMachine.currentState).to.equal(Game_1.GameStatus.Open);
    });
    it('check game status 4 player  ', function () {
        g.addPlayer(Player_1.CreatePlayer('yousong', Player_1.RaceType.Terrans));
        g.addPlayer(Player_1.CreatePlayer('nina', Player_1.RaceType.Lantids));
        g.addPlayer(Player_1.CreatePlayer('yalei', Player_1.RaceType.Xenos));
        g.addPlayer(Player_1.CreatePlayer('rong', Player_1.RaceType.Gleens));
        code_1.expect(g.stateMachine.currentState).to.equal(Game_1.GameStatus.Setup);
    });
});
describe('Game SetUp Before Build First Structures Tests', function () {
    var g;
    beforeEach(function () {
        g = new Game_1.Game(1);
        g.addPlayer(Player_1.CreatePlayer('yousong', Player_1.RaceType.Terrans)); //blue
        g.addPlayer(Player_1.CreatePlayer('nina', Player_1.RaceType.Xenos)); //Yellow
        g.addPlayer(Player_1.CreatePlayer('yalei', Player_1.RaceType.Taklons)); //brown
        g.addPlayer(Player_1.CreatePlayer('rong', Player_1.RaceType.HadschHallas)); //red
    });
    it('check game status (GameStatus.Setup)  ', function () {
        code_1.expect(g.stateMachine.currentState).to.equal(Game_1.GameStatus.Setup);
    });
    it('check player planetType  ', function () {
        var player = g.getPlayer(0);
        code_1.expect(player.planetType).to.equal(Planet_1.PlanetType.Blue);
        player = g.getPlayer(1);
        code_1.expect(player.planetType).to.equal(Planet_1.PlanetType.Yellow);
        player = g.getPlayer(2);
        code_1.expect(player.planetType).to.equal(Planet_1.PlanetType.Brown);
        player = g.getPlayer(3);
        code_1.expect(player.planetType).to.equal(Planet_1.PlanetType.Red);
    });
    // it(`setup player's  ore, knowledge, gold`, () => {
    //   for(let player of g.players){
    //     playerTest(player);
    //   }
    // })
});
describe('Game SetUp Build First Structures Tests', function () {
    var g;
    before(function () {
        g = new Game_1.Game(1);
        g.addPlayer(Player_1.CreatePlayer('yousong', Player_1.RaceType.Terrans)); // blue
        g.addPlayer(Player_1.CreatePlayer('nina', Player_1.RaceType.Xenos)); //yellow
        g.addPlayer(Player_1.CreatePlayer('yalei', Player_1.RaceType.HadschHallas)); //red
        g.addPlayer(Player_1.CreatePlayer('rong', Player_1.RaceType.Nevlas)); //while
    });
    it('player(pid:0) build mine', function () {
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
        console.log(g.turn);
    });
    it('player(pid:1) build mine', function () {
        var request = new Request_1.Request();
        var hex = new Hex_1.Hex(2, 3, -5);
        //console.log(hex)
        request.type = Request_1.RequestType.FirstStructures;
        request.pid = 1;
        request.hex = hex;
        console.log(g.turn);
        g.processSetupFirstStructures(request);
        code_1.expect(g.board.hasPlanet(hex)).to.equal(true);
        var planet = g.board.getPlanet(hex);
        code_1.expect(planet.building).to.equal(Structure_1.StructureType.Mine);
        code_1.expect(planet.type).to.equal(Planet_1.PlanetType.Yellow);
        code_1.expect(planet.playerID).to.equal(1);
        var player = g.getPlayer(1);
        var mine = player.buildings.mines[0];
        code_1.expect(mine.status).to.equal(Structure_1.StructureStatus.Built);
    });
    it('player(pid:2) build mine', function () {
        var request = new Request_1.Request();
        var hex = new Hex_1.Hex(5, -2, -3);
        //console.log(hex)
        request.type = Request_1.RequestType.FirstStructures;
        request.pid = 2;
        request.hex = hex;
        g.processSetupFirstStructures(request);
        code_1.expect(g.board.hasPlanet(hex)).to.equal(true);
        var planet = g.board.getPlanet(hex);
        code_1.expect(planet.building).to.equal(Structure_1.StructureType.Mine);
        code_1.expect(planet.type).to.equal(Planet_1.PlanetType.Red);
        code_1.expect(planet.playerID).to.equal(2);
        var player = g.getPlayer(2);
        var mine = player.buildings.mines[0];
        code_1.expect(mine.status).to.equal(Structure_1.StructureStatus.Built);
    });
    it('player(pid:3) build mine', function () {
        var request = new Request_1.Request();
        var hex = new Hex_1.Hex(-5, 2, 3);
        //console.log(hex)
        request.type = Request_1.RequestType.FirstStructures;
        request.pid = 3;
        request.hex = hex;
        var player3 = g.getPlayer(3);
        g.processSetupFirstStructures(request);
        player3 = g.getPlayer(3);
        code_1.expect(g.board.hasPlanet(hex)).to.equal(true);
        var planet = g.board.getPlanet(hex);
        code_1.expect(planet.building).to.equal(Structure_1.StructureType.Mine);
        code_1.expect(planet.type).to.equal(Planet_1.PlanetType.White);
        code_1.expect(planet.playerID).to.equal(3);
        var player = g.getPlayer(3);
        var mine = player.buildings.mines[0];
        code_1.expect(mine.status).to.equal(Structure_1.StructureStatus.Built);
    });
    it('player(pid:3) build second mine', function () {
        var request = new Request_1.Request();
        var hex = new Hex_1.Hex(-6, 3, 3);
        //console.log(hex)
        request.type = Request_1.RequestType.FirstStructures;
        request.pid = 3;
        request.hex = hex;
        g.processSetupFirstStructures(request);
        code_1.expect(g.board.hasPlanet(hex)).to.equal(true);
        var planet = g.board.getPlanet(hex);
        code_1.expect(planet.building).to.equal(Structure_1.StructureType.Mine);
        code_1.expect(planet.type).to.equal(Planet_1.PlanetType.White);
        code_1.expect(planet.playerID).to.equal(3);
        var player = g.getPlayer(3);
        code_1.expect(player.buildings.mines[0].status).to.equal(Structure_1.StructureStatus.Built);
        code_1.expect(player.buildings.mines[1].status).to.equal(Structure_1.StructureStatus.Built);
        code_1.expect(player.buildings.mines[2].status).to.equal(Structure_1.StructureStatus.Unbuilt);
    });
    it('player(pid:2) build second mine', function () {
        var request = new Request_1.Request();
        var hex = new Hex_1.Hex(4, -1, -3);
        //console.log(hex)
        request.type = Request_1.RequestType.FirstStructures;
        request.pid = 2;
        request.hex = hex;
        g.processSetupFirstStructures(request);
        code_1.expect(g.board.hasPlanet(hex)).to.equal(true);
        var planet = g.board.getPlanet(hex);
        code_1.expect(planet.building).to.equal(Structure_1.StructureType.Mine);
        code_1.expect(planet.type).to.equal(Planet_1.PlanetType.Red);
        code_1.expect(planet.playerID).to.equal(2);
        var player = g.getPlayer(2);
        code_1.expect(player.buildings.mines[0].status).to.equal(Structure_1.StructureStatus.Built);
        code_1.expect(player.buildings.mines[1].status).to.equal(Structure_1.StructureStatus.Built);
        code_1.expect(player.buildings.mines[2].status).to.equal(Structure_1.StructureStatus.Unbuilt);
    });
    it('player(pid:1) build second mine', function () {
        var request = new Request_1.Request();
        var hex = new Hex_1.Hex(3, 3, -6);
        //console.log(hex)
        request.type = Request_1.RequestType.FirstStructures;
        request.pid = 1;
        request.hex = hex;
        g.processSetupFirstStructures(request);
        code_1.expect(g.board.hasPlanet(hex)).to.equal(true);
        var planet = g.board.getPlanet(hex);
        code_1.expect(planet.building).to.equal(Structure_1.StructureType.Mine);
        code_1.expect(planet.type).to.equal(Planet_1.PlanetType.Yellow);
        code_1.expect(planet.playerID).to.equal(1);
        var player = g.getPlayer(1);
        code_1.expect(player.buildings.mines[0].status).to.equal(Structure_1.StructureStatus.Built);
        code_1.expect(player.buildings.mines[1].status).to.equal(Structure_1.StructureStatus.Built);
        code_1.expect(player.buildings.mines[2].status).to.equal(Structure_1.StructureStatus.Unbuilt);
    });
    it('player(pid:0) build second mine', function () {
        var request = new Request_1.Request();
        var hex = new Hex_1.Hex(1, -1, 0);
        //console.log(hex)
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
        code_1.expect(player.buildings.mines[0].status).to.equal(Structure_1.StructureStatus.Built);
        code_1.expect(player.buildings.mines[1].status).to.equal(Structure_1.StructureStatus.Built);
        code_1.expect(player.buildings.mines[2].status).to.equal(Structure_1.StructureStatus.Unbuilt);
        code_1.expect(g.firstStructuresRound).to.equal(3);
    });
    it('check player get right Roundbooter ', function () {
        var request = new Request_1.Request();
        request.type = Request_1.RequestType.Roundbooter;
        request.pid = 0;
        request.roundBoosterID = 3;
        g.processRoundRooter(request);
        code_1.expect(g.players[0].roundBooster).to.equal(g.roundBoosters[3]);
    });
    it('check game status and after 4 players get Roundbooter ', function () {
        var request = new Request_1.Request();
        request.type = Request_1.RequestType.Roundbooter;
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
