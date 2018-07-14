"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Lab = require("lab");
var code_1 = require("code");
var Game_1 = require("../logic/Game");
var Player_1 = require("../logic/Player");
var Race_1 = require("../logic/Race");
var lab = Lab.script();
exports.lab = lab;
var describe = lab.describe, it = lab.it, before = lab.before, beforeEach = lab.beforeEach;
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
        code_1.expect(g.status).to.equal(Game_1.GameStatus.Open);
        code_1.expect(g.phase).to.equal(Game_1.Phase.Income);
        code_1.expect(g.players.length).to.equal(0);
    });
    it('creates Player', function () {
        // a player should have no planets when it's first created
        var p = new Player_1.Player('jon', Race_1.RaceType.Terrans);
        code_1.expect(p.planets.length).to.equal(0);
    });
    it('creates Player without Race', function () {
        // a player should have no planets when it's first created
        var p = new Player_1.Player('jon');
        code_1.expect(p.planets.length).to.equal(0);
    });
    it('adds Player to game', function () {
        // when you add a player to a game, the game should have one player
        var p = new Player_1.Player('jon', Race_1.RaceType.Terrans);
        g.addPlayer(p);
        code_1.expect(g.players.length).to.equal(1);
    });
    it("doesn't allow adding five Players to game", function () {
        g.addPlayer(new Player_1.Player('yousong'));
        g.addPlayer(new Player_1.Player('nina'));
        g.addPlayer(new Player_1.Player('yalei'));
        g.addPlayer(new Player_1.Player('rong'));
        try {
            g.addPlayer(new Player_1.Player('jon'));
        }
        catch (e) {
            code_1.expect(g.players.length).to.equal(4);
        }
        code_1.expect(g.players.length).to.equal(4);
    });
    it("doesn't allow adding two Players of the same race", function () {
        g.addPlayer(new Player_1.Player('yousong', Race_1.RaceType.Terrans));
        try {
            g.addPlayer(new Player_1.Player('nina', Race_1.RaceType.Terrans));
        }
        catch (e) {
            code_1.expect(g.players.length).to.equal(1);
        }
        code_1.expect(g.players.length).to.equal(1);
    });
});
