"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Lab = require("lab");
var code_1 = require("code");
var Game_1 = require("../logic/Game");
var Player_1 = require("../logic/Player");
var lab = Lab.script();
exports.lab = lab;
var describe = lab.describe, it = lab.it, before = lab.before, beforeEach = lab.beforeEach;
//silence all console log
//console.log = function() {}
function powerTest(p, charge, bowl1, bowl2, bowl3) {
    p.chargePower(charge);
    code_1.expect(p.power.bowl1).to.equal(bowl1);
    code_1.expect(p.power.bowl2).to.equal(bowl2);
    code_1.expect(p.power.bowl3).to.equal(bowl3);
}
function setPower(p, bowl1, bowl2, bowl3) {
    if (bowl1 !== undefined) {
        p.power.bowl1 = bowl1;
    }
    if (bowl2 !== undefined) {
        p.power.bowl2 = bowl2;
    }
    if (bowl3 !== undefined) {
        p.power.bowl3 = bowl3;
    }
}
describe('experiment', function () {
    before(function () { });
    it('verifies 1 equals 1', function () {
        code_1.expect(1).to.equal(1);
    });
});
describe('Basic Game Tests', function () {
    var g;
    beforeEach(function () {
        g = new Game_1.Game(1);
    });
    it('creates a game', function () {
        // when you create a game, it should be OPEN, in INCOME PHASE, and have
        // zero players
        code_1.expect(g.stateMachine.currentState).to.equal(Game_1.GameStatus.Open);
        code_1.expect(g.players.length).to.equal(0);
    });
    it('creates Player', function () {
        // a player should have no planets when it's first created
        var p = Player_1.CreatePlayer('jon', Player_1.RaceType.Terrans);
        code_1.expect(p.planets.length).to.equal(0);
    });
    it('creates Player without Race', function () {
        // a player should have no planets when it's first created
        var p = Player_1.CreatePlayer('jon', Player_1.RaceType.Terrans);
        code_1.expect(p.planets.length).to.equal(0);
    });
    it('adds Player to game', function () {
        // when you add a player to a game, the game should have one player
        var p = Player_1.CreatePlayer('jon', Player_1.RaceType.Terrans);
        g.addPlayer(p);
        code_1.expect(g.players.length).to.equal(1);
    });
    it("doesn't allow adding five Players to game", function () {
        g.addPlayer(Player_1.CreatePlayer('yousong', Player_1.RaceType.Terrans));
        g.addPlayer(Player_1.CreatePlayer('nina', Player_1.RaceType.Xenos));
        g.addPlayer(Player_1.CreatePlayer('yalei', Player_1.RaceType.Lantids));
        g.addPlayer(Player_1.CreatePlayer('rong', Player_1.RaceType.Gleens));
        try {
            g.addPlayer(Player_1.CreatePlayer('jon', Player_1.RaceType.Ambas));
        }
        catch (e) {
            code_1.expect(g.players.length).to.equal(4);
        }
        code_1.expect(g.players.length).to.equal(4);
    });
    it("doesn't allow adding two Players of the same race", function () {
        g.addPlayer(Player_1.CreatePlayer('yousong', Player_1.RaceType.Terrans));
        try {
            g.addPlayer(Player_1.CreatePlayer('nina', Player_1.RaceType.Terrans));
        }
        catch (e) {
            code_1.expect(g.players.length).to.equal(1);
        }
        code_1.expect(g.players.length).to.equal(1);
    });
    // it('can go to the next turn', () => {  // only can not test turn without add roundBooster
    //     g.addPlayer(CreatePlayer('yousong', RaceType.Terrans));
    //     g.addPlayer(CreatePlayer('rong', RaceType.Ambas));
    //     g.addPlayer(CreatePlayer('yalei', RaceType.Baltaks));
    //     g.nextTurn();
    //     expect(g.turn).to.equal(1);
    //     })
    //
    // it('can go back to the turn 0', () => {
    //     g.addPlayer(CreatePlayer('yousong', RaceType.Terrans));
    //     g.addPlayer(CreatePlayer('rong', RaceType.Ambas));
    //     g.addPlayer(CreatePlayer('yalei', RaceType.Baltaks));
    //     g.nextTurn();
    //     g.nextTurn();
    //     g.nextTurn();
    //     expect(g.turn).to.equal(0);
    // })
    //
    // it('can go to the next round when all the player pass', () => {
    //     g.nextTurn();
    //     expect(g.turn).to.equal(0);
    //     expect(g.round).to.equal(2); //turn starts at 0, round at 1
    // })
});
describe('Power tests', function () {
    var p;
    beforeEach(function () {
        p = Player_1.CreatePlayer('jon', Player_1.RaceType.Terrans);
    });
    it('begins each player with the normal default power', function () {
        powerTest(p, 0, 4, 4, 0);
    });
    it('properly charges power', function () {
        powerTest(p, 2, 2, 6, 0);
    });
    it('properly charges power with overflow', function () {
        setPower(p, 0, 1, 0);
        powerTest(p, 2, 0, 0, 1);
    });
    it('properly charges power', function () {
        setPower(p, 1, 1, 1);
        powerTest(p, 3, 0, 0, 3);
    });
    it('properly charges power', function () {
        setPower(p, 4, 0, 0);
        powerTest(p, 6, 0, 2, 2);
    });
    it('properly charges power', function () {
        setPower(p, 3, 0, 0);
        powerTest(p, 3, 0, 3, 0);
    });
    it('properly charges power', function () {
        setPower(p, 3, 3, 3);
        powerTest(p, 10, 0, 0, 9);
    });
    it('properly charges power', function () {
        setPower(p, 5, 0, 0);
        powerTest(p, 10, 0, 0, 5);
    });
    it('properly charges power when all full', function () {
        setPower(p, 0, 0, 3);
        powerTest(p, 4, 0, 0, 3);
    });
    it('properly charges power when first bowl empty', function () {
        setPower(p, 0, 3, 3);
        powerTest(p, 4, 0, 0, 6);
    });
    it('properly charges max', function () {
        setPower(p, 1, 0, 0);
        powerTest(p, 4, 0, 0, 1);
    });
    it('adds power', function () {
        p.addPower(2);
        code_1.expect(p.power.bowl1).to.equal(6);
    });
});
