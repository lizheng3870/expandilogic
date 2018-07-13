"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Lab = require("lab");
var code_1 = require("code");
var Game_1 = require("../logic/Game");
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
    before(function () { });
    it('creates a game', function () {
        g = new Game_1.Game(1);
        code_1.expect(g.status).to.equal(Game_1.GameStatus.Open);
        code_1.expect(g.phase).to.equal(Game_1.Phase.Income);
        code_1.expect(g.players.length).to.equal(0);
    });
});
