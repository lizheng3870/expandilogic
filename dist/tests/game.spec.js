"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Lab = require("lab");
var code_1 = require("code");
var Game_1 = require("../logic/Game");
var Player_1 = require("../logic/Player");
var Race_1 = require("../logic/Race");
var lab = Lab.script();
exports.lab = lab;
var describe = lab.describe, it = lab.it, before = lab.before;
describe('experiment', function () {
    before(function () { });
    it('verifies 1 equals 1', function () {
        code_1.expect(1).to.equal(1);
    });
});
describe('Basic Game Tests', function () {
    var g;
    before(function () {
        g = new Game_1.Game(1);
    });
    it('creates a game', function () {
        code_1.expect(g.status).to.equal(Game_1.GameStatus.Open);
        code_1.expect(g.phase).to.equal(Game_1.Phase.Income);
        code_1.expect(g.players.length).to.equal(0);
    });
    it('creates Player', function () {
        var p = new Player_1.Player('jon', Race_1.RaceType.Terrans);
        code_1.expect(p.planets.length).to.equal(0);
    });
    it('adds Player to game', function () {
        var p = new Player_1.Player('jon', Race_1.RaceType.Terrans);
        g.addPlayer(p);
        code_1.expect(g.players.length).to.equal(1);
    });
});
