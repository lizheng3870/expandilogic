"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Lab = require("lab");
var code_1 = require("code");
var Game_1 = require("../logic/Game");
var Player_1 = require("../logic/Player");
var Request_1 = require("../logic/Request");
var Hex_1 = require("../logic/Hex");
var Action_1 = require("../logic/Action");
var Structure_1 = require("../logic/Structure");
var Store_1 = require("../logic/Store");
var Benefit_1 = require("../logic/Benefit");
var TechBoard_1 = require("../logic/TechBoard");
var lab = Lab.script();
exports.lab = lab;
var describe = lab.describe, it = lab.it, before = lab.before;
describe('Player Actions Tests', function () {
    var g;
    before(function () {
        g = new Game_1.Game(1);
        g.techBoard = new TechBoard_1.default(false);
        g.addPlayer(Player_1.CreatePlayer('yousong', Player_1.RaceType.Terrans)); // blue
        g.addPlayer(Player_1.CreatePlayer('nina', Player_1.RaceType.Xenos)); //yellow
        g.addPlayer(Player_1.CreatePlayer('yalei', Player_1.RaceType.HadschHallas)); //red
        g.addPlayer(Player_1.CreatePlayer('rong', Player_1.RaceType.Nevlas)); //while
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
            var hex = new Hex_1.Hex(-6, 3, 3);
            //console.log(hex)
            request_5.type = Request_1.RequestType.FirstStructures;
            request_5.pid = 3;
            request_5.hex = hex;
            g.processSetupFirstStructures(request_5);
        }
        {
            var request_6 = new Request_1.Request();
            var hex = new Hex_1.Hex(4, -1, -3);
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
            var hex = new Hex_1.Hex(4, 6, -10);
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
        request.hex = new Hex_1.Hex(1, -1, 0);
        g.processPlayerRequest(request);
        var player = g.getPlayer(request.pid);
        if (player === null) {
            code_1.expect(0).to.equal(1);
        }
        else {
            code_1.expect(player.name).to.equal("yousong");
            code_1.expect(g.turn).to.equal(1);
            code_1.expect(player.planets.length).to.equal(3);
            player.accessiblePlanets(g.board);
        }
    });
    it('nina player(pid:1) send a update mine structure to station request to Game', function () {
        var request = new Request_1.Request();
        request.type = Request_1.RequestType.Action;
        request.actionType = Action_1.ActionType.Upgrade;
        request.upgradeType = Request_1.UpgradeType.MineToStation;
        request.pid = 1;
        request.hex = new Hex_1.Hex(2, 3, -5);
        var player = g.getPlayer(request.pid);
        var beforeGold = player.gold;
        var beforeOre = player.ore;
        g.processPlayerRequest(request);
        code_1.expect(beforeGold - player.gold).to.equal(3);
        code_1.expect(beforeOre - player.ore).to.equal(2);
        if (player === null) {
            code_1.expect(0).to.equal(1);
        }
        else {
            code_1.expect(player.name).to.equal("nina");
            code_1.expect(g.turn).to.equal(2);
            code_1.expect(player.planets.length).to.equal(2);
            var planet = g.board.getPlanet(request.hex);
            code_1.expect(planet.building).to.equal(Structure_1.StructureType.Station);
            //player.accessiblePlanets(g.board);
        }
    });
    it('yalei player(yalei:2) send rearch action to Game', function () {
        var request = new Request_1.Request();
        request.type = Request_1.RequestType.Action;
        request.actionType = Action_1.ActionType.Research;
        request.techLane = Request_1.TechLaneType.Dig;
        request.pid = 2;
        //request.hex = new Hex(2, 3, -5);
        var player = g.getPlayer(request.pid);
        // change science
        player.science = 8;
        // default value
        code_1.expect(player.digCost).to.equal(3);
        code_1.expect(player.ore).to.equal(6);
        g.processPlayerRequest(request);
        // 0 ->1  add two ore
        code_1.expect(player.digCost).to.equal(3);
        code_1.expect(player.ore).to.equal(8);
        code_1.expect(player.name).to.equal("yalei");
        code_1.expect(g.turn).to.equal(3);
        // this.turn = 2
        g.turn = 2;
        g.processPlayerRequest(request);
        // 1 ->2  add two ore
        code_1.expect(player.ore).to.equal(8);
        code_1.expect(player.digCost).to.equal(2);
    });
    it('rong player(3) send reqest of QIC Action to Game', function () {
        var request = new Request_1.Request();
        request.type = Request_1.RequestType.Action;
        request.actionType = Action_1.ActionType.PowerAndQIC;
        request.storeMerchandiseType = Store_1.StoreMerchandiseType.Pw7sci3;
        request.pid = 3;
        //request.hex = new Hex(2, 3, -5);
        var player = g.getPlayer(request.pid);
        // change science
        player.power.bowl3 = 8;
        // default value
        code_1.expect(player.science).to.equal(5);
        code_1.expect(player.power.bowl3).to.equal(8);
        code_1.expect(player.power.bowl1).to.equal(2);
        g.processPlayerRequest(request);
        //
        code_1.expect(player.science).to.equal(8);
        code_1.expect(player.power.bowl3).to.equal(1);
        code_1.expect(player.power.bowl1).to.equal(9);
        code_1.expect(g.turn).to.equal(0);
    });
    it('yousong player(pid:0) send free action one ore to one gold request to Game', function () {
        var request = new Request_1.Request();
        request.type = Request_1.RequestType.Action;
        request.actionType = Action_1.ActionType.Free;
        request.freeExchangeItems = [Benefit_1.Material.Ore, Benefit_1.Material.Gold];
        request.freeExchangeTimes = 1;
        request.pid = 0;
        var player = g.getPlayer(request.pid);
        // change science
        // default value
        code_1.expect(player.ore).to.equal(4);
        code_1.expect(player.gold).to.equal(15);
        g.processPlayerRequest(request);
        //
        code_1.expect(player.ore).to.equal(3);
        code_1.expect(player.gold).to.equal(16);
        request.freeExchangeItems = [Benefit_1.Material.Power, Benefit_1.Material.Power];
        request.freeExchangeTimes = 2;
        request.pid = 0;
    });
    it('yousong player(pid:0) send free action discard bowl2 power to charge bowl2 => bowl3 request to Game', function () {
        var request = new Request_1.Request();
        request.type = Request_1.RequestType.Action;
        request.actionType = Action_1.ActionType.Free;
        request.freeExchangeItems = [Benefit_1.Material.Power, Benefit_1.Material.Power];
        request.freeExchangeTimes = 2;
        request.pid = 0;
        var player = g.getPlayer(request.pid);
        // default value
        code_1.expect(player.power.bowl1).to.equal(4);
        code_1.expect(player.power.bowl2).to.equal(4);
        code_1.expect(player.power.bowl3).to.equal(0);
        g.processPlayerRequest(request);
        //
        code_1.expect(player.power.bowl1).to.equal(4);
        code_1.expect(player.power.bowl2).to.equal(0);
        code_1.expect(player.power.bowl3).to.equal(2);
    });
    it('yousong player(pid:0) update mine to trade station', function () {
        var request = new Request_1.Request();
        request.type = Request_1.RequestType.Action;
        request.actionType = Action_1.ActionType.Upgrade;
        request.upgradeType = Request_1.UpgradeType.MineToStation;
        request.pid = 0;
        request.hex = new Hex_1.Hex(1, -1, 0);
        var player = g.getPlayer(request.pid);
        var beforeGold = player.gold;
        var beforeOre = player.ore;
        g.processPlayerRequest(request);
        var planet = g.board.getPlanet(request.hex);
        code_1.expect(planet.building).to.equal(Structure_1.StructureType.Station);
        // for neighbor or not neighbor is gold 3 /6 does no check, all is 3
        code_1.expect(beforeGold - player.gold).to.equal(3);
        code_1.expect(beforeOre - player.ore).to.equal(2);
    });
    it(' player(pid:1) trade station to Planetary Institute', function () {
        var request = new Request_1.Request();
        request.type = Request_1.RequestType.Action;
        request.actionType = Action_1.ActionType.Upgrade;
        request.upgradeType = Request_1.UpgradeType.StationToInstitute;
        request.pid = 1;
        request.hex = new Hex_1.Hex(2, 3, -5);
        var player = g.getPlayer(request.pid);
        // default value
        // expect(player.power.bowl1).to.equal(4)
        // expect(player.power.bowl2).to.equal(4)
        // expect(player.power.bowl3).to.equal(0)
        player.ore = 4; // ore not enough
        var beforeGold = player.gold;
        var beforeOre = player.ore;
        g.processPlayerRequest(request);
        var planet = g.board.getPlanet(request.hex);
        code_1.expect(planet.building).to.equal(Structure_1.StructureType.Institute);
        code_1.expect(beforeGold - player.gold).to.equal(6);
        code_1.expect(beforeOre - player.ore).to.equal(4);
    });
    it('player(pid:2) update mine to trade station', function () {
        var request = new Request_1.Request();
        request.type = Request_1.RequestType.Action;
        request.actionType = Action_1.ActionType.Upgrade;
        request.upgradeType = Request_1.UpgradeType.MineToStation;
        request.pid = 2;
        request.hex = new Hex_1.Hex(5, -2, -3);
        var player = g.getPlayer(request.pid);
        // default value
        // expect(player.power.bowl1).to.equal(4)
        // expect(player.power.bowl2).to.equal(4)
        // expect(player.power.bowl3).to.equal(0)
        // ore not enough
        var beforeGold = player.gold;
        var beforeOre = player.ore;
        g.processPlayerRequest(request);
        var planet = g.board.getPlanet(request.hex);
        code_1.expect(planet.building).to.equal(Structure_1.StructureType.Station);
        code_1.expect(beforeGold - player.gold).to.equal(3);
        code_1.expect(beforeOre - player.ore).to.equal(2);
    });
    it('player(3) update mine to trade station', function () {
        var request = new Request_1.Request();
        request.type = Request_1.RequestType.Action;
        request.actionType = Action_1.ActionType.Upgrade;
        request.upgradeType = Request_1.UpgradeType.MineToStation;
        request.pid = 3;
        request.hex = new Hex_1.Hex(-6, 3, 3);
        var player = g.getPlayer(request.pid);
        // default value
        // expect(player.power.bowl1).to.equal(4)
        // expect(player.power.bowl2).to.equal(4)
        // expect(player.power.bowl3).to.equal(0)
        // ore not enough
        var beforeGold = player.gold;
        var beforeOre = player.ore;
        g.processPlayerRequest(request);
        var planet = g.board.getPlanet(request.hex);
        code_1.expect(planet.building).to.equal(Structure_1.StructureType.Station);
        code_1.expect(beforeGold - player.gold).to.equal(3);
        code_1.expect(beforeOre - player.ore).to.equal(2);
    });
    it('yousong player(pid:0) update mine to trade station', function () {
        var request = new Request_1.Request();
        request.type = Request_1.RequestType.Action;
        request.actionType = Action_1.ActionType.Upgrade;
        request.upgradeType = Request_1.UpgradeType.MineToStation;
        request.pid = 0;
        request.hex = new Hex_1.Hex(0, 0, 0);
        var player = g.getPlayer(request.pid);
        player.ore = 10; // not enough
        var beforeGold = player.gold;
        var beforeOre = player.ore;
        g.processPlayerRequest(request);
        var planet = g.board.getPlanet(request.hex);
        code_1.expect(planet.building).to.equal(Structure_1.StructureType.Station);
        code_1.expect(beforeGold - player.gold).to.equal(3);
        code_1.expect(beforeOre - player.ore).to.equal(2);
    });
    it('player(1) update trade station to  lab', function () {
        var request = new Request_1.Request();
        request.type = Request_1.RequestType.Action;
        request.actionType = Action_1.ActionType.Upgrade;
        request.upgradeType = Request_1.UpgradeType.MineToStation;
        request.pid = 1;
        request.techTileID = 2;
        request.hex = new Hex_1.Hex(3, 3, -6);
        var player = g.getPlayer(request.pid);
        player.ore = 10; // not enough
        var beforeGold = player.gold;
        var beforeOre = player.ore;
        g.processPlayerRequest(request);
        var planet = g.board.getPlanet(request.hex);
        code_1.expect(planet.building).to.equal(Structure_1.StructureType.Station);
        code_1.expect(beforeGold - player.gold).to.equal(3);
        code_1.expect(beforeOre - player.ore).to.equal(2);
    });
    it('player(2) update trade station to lab', function () {
        var request = new Request_1.Request();
        request.type = Request_1.RequestType.Action;
        request.actionType = Action_1.ActionType.Upgrade;
        request.upgradeType = Request_1.UpgradeType.StationToLab;
        request.pid = 2;
        request.techTileID = 3;
        request.techLane = 3;
        request.hex = new Hex_1.Hex(5, -2, -3);
        var player = g.getPlayer(request.pid);
        //player.ore = 10 // not enough
        // console.log("before ore" +  player.ore)
        // console.log("before gold" +  player.gold)
        var beforeGold = player.gold;
        var beforeOre = player.ore;
        g.processPlayerRequest(request);
        var planet = g.board.getPlanet(request.hex);
        code_1.expect(planet.building).to.equal(Structure_1.StructureType.Lab);
        code_1.expect(beforeGold - player.gold).to.equal(5);
        code_1.expect(beforeOre - player.ore).to.equal(3);
    });
    it('player(3) update trade station to lab', function () {
        var request = new Request_1.Request();
        request.type = Request_1.RequestType.Action;
        request.actionType = Action_1.ActionType.Upgrade;
        request.upgradeType = Request_1.UpgradeType.StationToLab;
        request.pid = 3;
        request.techTileID = 4;
        request.techLane = 4;
        request.hex = new Hex_1.Hex(-6, 3, 3);
        var player = g.getPlayer(request.pid);
        //player.ore = 10 // not enough
        // console.log("before ore" +  player.ore)
        // console.log("before gold" +  player.gold)
        var beforeGold = player.gold;
        var beforeOre = player.ore;
        g.processPlayerRequest(request);
        var planet = g.board.getPlanet(request.hex);
        code_1.expect(planet.building).to.equal(Structure_1.StructureType.Lab);
        code_1.expect(beforeGold - player.gold).to.equal(5);
        code_1.expect(beforeOre - player.ore).to.equal(3);
    });
    it('player(0) update station to lab', function () {
        var request = new Request_1.Request();
        request.type = Request_1.RequestType.Action;
        request.actionType = Action_1.ActionType.Upgrade;
        request.upgradeType = Request_1.UpgradeType.StationToLab;
        request.pid = 0;
        request.hex = new Hex_1.Hex(0, 0, 0);
        request.techTileID = 1;
        request.techLane = 1;
        var player = g.getPlayer(request.pid);
        //player.ore = 10 // not enough
        var beforeGold = player.gold;
        var beforeOre = player.ore;
        var beforeQic = player.qic;
        g.processPlayerRequest(request);
        var planet = g.board.getPlanet(request.hex);
        code_1.expect(planet.building).to.equal(Structure_1.StructureType.Lab);
        code_1.expect(beforeGold - player.gold).to.equal(5);
        code_1.expect(beforeOre - player.ore).to.equal(3);
        code_1.expect(player.qic - beforeQic).to.equal(1); // techLane from 1 to
    });
    //
    it('player(1) pass test', function () {
        var request = new Request_1.Request();
        request.type = Request_1.RequestType.Action;
        request.actionType = Action_1.ActionType.Pass;
        request.pid = 1;
        request.roundBoosterID = 1;
        var player = g.getPlayer(request.pid);
        g.processPlayerRequest(request);
        code_1.expect(g.turn).to.equal(1); // for turn will not change but current player move to nextRound
    });
    it('player(2) update lab to Academy', function () {
        var request = new Request_1.Request();
        request.type = Request_1.RequestType.Action;
        request.actionType = Action_1.ActionType.Upgrade;
        request.upgradeType = Request_1.UpgradeType.LabToAcademy;
        request.pid = 2;
        request.techTileID = 8;
        request.techLane = 1;
        request.hex = new Hex_1.Hex(5, -2, -3);
        var player = g.getPlayer(request.pid);
        player.ore = 10; // not enough
        var beforeGold = player.gold;
        var beforeOre = player.ore;
        g.processPlayerRequest(request);
        var planet = g.board.getPlanet(request.hex);
        code_1.expect(planet.building).to.equal(Structure_1.StructureType.Academy);
        code_1.expect(beforeGold - player.gold).to.equal(6);
        code_1.expect(beforeOre - player.ore).to.equal(6);
    });
    it('player(3) pass test', function () {
        var request = new Request_1.Request();
        request.type = Request_1.RequestType.Action;
        request.actionType = Action_1.ActionType.Pass;
        request.pid = 3;
        request.roundBoosterID = 4;
        var player = g.getPlayer(request.pid);
        g.processPlayerRequest(request);
        code_1.expect(g.turn).to.equal(0); // for turn will not change but current player move to nextRound
    });
    it('player(0) pass test', function () {
        var request = new Request_1.Request();
        request.type = Request_1.RequestType.Action;
        request.actionType = Action_1.ActionType.Pass;
        request.pid = 0;
        request.roundBoosterID = 6;
        var player = g.getPlayer(request.pid);
        g.processPlayerRequest(request);
        code_1.expect(g.turn).to.equal(0); // for turn will not change but current player move to nextRound
    });
    it('player(2) pass test', function () {
        var request = new Request_1.Request();
        request.type = Request_1.RequestType.Action;
        request.actionType = Action_1.ActionType.Pass;
        request.pid = 2;
        request.roundBoosterID = 3;
        var player = g.getPlayer(request.pid);
        g.processPlayerRequest(request);
        code_1.expect(g.turn).to.equal(0); // for turn will not change but current player move to nextRound
        code_1.expect(g.round).to.equal(2);
    });
    // player 1 is first
    it('new Round player(1) pass ', function () {
        var request = new Request_1.Request();
        request.type = Request_1.RequestType.Action;
        request.actionType = Action_1.ActionType.Pass;
        request.pid = 1;
        request.roundBoosterID = 5;
        var player = g.getPlayer(request.pid);
        g.processPlayerRequest(request);
        code_1.expect(g.nextPlayerPid()).to.equal(3);
    });
    // player 1 is first
    it('new Round player(3) special action ', function () {
        var request = new Request_1.Request();
        request.type = Request_1.RequestType.Action;
        request.actionType = Action_1.ActionType.Special;
        request.specialActionSource = Request_1.SpecialActionSource.RoundBooster;
        request.pid = 3;
        var player = g.getPlayer(request.pid);
        g.processPlayerRequest(request);
        code_1.expect(player.specialRange).to.equal(3);
    });
    it('new Round player(3) pass ', function () {
        var request = new Request_1.Request();
        request.type = Request_1.RequestType.Action;
        request.actionType = Action_1.ActionType.Pass;
        request.roundBoosterID = 1;
        request.pid = 3;
        var player = g.getPlayer(request.pid);
        g.processPlayerRequest(request);
        code_1.expect(player.specialRange).to.equal(0);
        code_1.expect(g.nextPlayerPid()).to.equal(0);
    });
    it('new Round player(0) pass ', function () {
        var request = new Request_1.Request();
        request.type = Request_1.RequestType.Action;
        request.actionType = Action_1.ActionType.Pass;
        request.pid = 0;
        request.roundBoosterID = 0;
        //g.getRoundBooster()
        var player = g.getPlayer(request.pid);
        g.processPlayerRequest(request);
        code_1.expect(g.nextPlayerPid()).to.equal(2);
    });
    it('player(pid:2) send a build mine structure request to Game', function () {
        var request = new Request_1.Request();
        request.type = Request_1.RequestType.Action;
        request.actionType = Action_1.ActionType.BuildMine;
        request.pid = 2;
        request.hex = new Hex_1.Hex(-4, 1, 3);
        var player = g.getPlayer(request.pid);
        player.specialRange = 100; // just make player accsible to this location
        var neighbor = g.getPlayer(3);
        // console.log("before bowl1 " + neighbor.power.bowl1)
        //  console.log("before bowl2 " + neighbor.power.bowl2)
        //  console.log("before bowl3 " + neighbor.power.bowl3)
        code_1.expect(neighbor.power.bowl1).to.equal(5);
        code_1.expect(neighbor.power.bowl2).to.equal(8);
        code_1.expect(neighbor.power.bowl3).to.equal(1);
        g.processPlayerRequest(request);
        code_1.expect(g.nextPlayerPid()).to.equal(2);
        code_1.expect(neighbor.power.bowl1).to.equal(3);
        code_1.expect(neighbor.power.bowl2).to.equal(10);
        code_1.expect(neighbor.power.bowl3).to.equal(1);
        //
    });
    it('player(pid:2) check final scoring ', function () {
        var request = new Request_1.Request();
        request.type = Request_1.RequestType.Action;
        request.actionType = Action_1.ActionType.Pass;
        request.pid = 2;
        g.round = 6;
        var nina = g.getPlayer(1);
        nina.techs[1] = 4;
        nina.techs[2] = 5;
        var yousong = g.getPlayer(0);
        g.processPlayerRequest(request);
        //  console.log(g.dumpPlayers());
    });
});
