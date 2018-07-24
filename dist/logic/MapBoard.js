"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Hex_1 = require("./Hex");
exports.Hex = Hex_1.Hex;
var Planet_1 = require("./Planet");
var Game_1 = require("./Game");
var Structure_1 = require("./Structure");
var Space = /** @class */ (function () {
    function Space(hex) {
        this.hex = hex;
        this.planet = null;
        this.feded = false;
    }
    Space.spiral = function (center, radius) {
        var hexs = Hex_1.Hex.spiral(center, radius);
        //console.log("center" + center.toString())
        var spaces = [];
        for (var _i = 0, hexs_1 = hexs; _i < hexs_1.length; _i++) {
            var hex = hexs_1[_i];
            spaces.push(new Space(hex));
        }
        //console.log(spaces)
        return spaces;
    };
    Space.prototype.setPlanetType = function (type) {
        this.planet = new Planet_1.Planet(this.hex, type);
    };
    return Space;
}());
var MapBoard = /** @class */ (function () {
    function MapBoard(size) {
        if (size === void 0) { size = 10; }
        this.size = size;
        this.spaces = [];
        this.planets = [];
        this.planetsMap = new Map();
        this.spacesMap = new Map();
        //  generate the tiles
        // place planets on tiles
        // randomly arrange the tiles into an acceptable configuration
        // (no two planets of the same type adjacent, except TransDim)
        this.setup(Game_1.Config.PlayerLimit);
    }
    MapBoard.prototype.getPlanet = function (hex) {
        // if there's a planet in that spot, return it to the caller
        // otherwise return void or maybe throw an exception
        var key = hex.q + '_' + hex.r + '_' + hex.s;
        var planet = this.planetsMap.get(key);
        if (planet === undefined || planet === null) {
            throw new Error("getPlanet error not planet at hex " + hex.toString());
        }
        else
            return planet;
    };
    MapBoard.prototype.getHex = function (q, r) {
        return new Hex_1.Hex(q, r, -q - r);
    };
    // setup map for player
    MapBoard.prototype.setup = function (playerNumber) {
        var centers = [];
        centers[0] = this.getHex(0, 0);
        centers[1] = this.getHex(2, 3);
        centers[2] = this.getHex(5, -2);
        centers[3] = this.getHex(-5, 2);
        centers[4] = this.getHex(-3, 5);
        centers[5] = this.getHex(-8, 7);
        centers[6] = this.getHex(7, 1);
        centers[7] = this.getHex(4, 6);
        centers[8] = this.getHex(-1, 8);
        centers[9] = this.getHex(-6, 10);
        var spaces0 = Space.spiral(centers[0], 2);
        spaces0[0].setPlanetType(Planet_1.PlanetType.Blue);
        spaces0[1].setPlanetType(Planet_1.PlanetType.Blue);
        spaces0[2].setPlanetType(Planet_1.PlanetType.Blue);
        spaces0[3].setPlanetType(Planet_1.PlanetType.Blue);
        spaces0[4].setPlanetType(Planet_1.PlanetType.Blue);
        spaces0[5].setPlanetType(Planet_1.PlanetType.Orange);
        spaces0[8].setPlanetType(Planet_1.PlanetType.Red);
        //console.log(spaces0)
        //this.randomRotation(spaces0);
        var spaces1 = Space.spiral(centers[1], 2);
        spaces1[0].setPlanetType(Planet_1.PlanetType.Yellow);
        spaces1[1].setPlanetType(Planet_1.PlanetType.Yellow);
        spaces1[2].setPlanetType(Planet_1.PlanetType.Yellow);
        spaces1[3].setPlanetType(Planet_1.PlanetType.Yellow);
        spaces1[4].setPlanetType(Planet_1.PlanetType.Yellow);
        spaces1[5].setPlanetType(Planet_1.PlanetType.Orange);
        // spaces1[8].setPlanetType(PlanetType.Red);
        // this.randomRotation(spaces1);
        //
        var spaces2 = Space.spiral(centers[2], 2);
        spaces2[0].setPlanetType(Planet_1.PlanetType.Red);
        spaces2[1].setPlanetType(Planet_1.PlanetType.Red);
        spaces2[2].setPlanetType(Planet_1.PlanetType.Red);
        spaces2[3].setPlanetType(Planet_1.PlanetType.Red);
        spaces2[4].setPlanetType(Planet_1.PlanetType.Red);
        spaces2[5].setPlanetType(Planet_1.PlanetType.Orange);
        spaces2[8].setPlanetType(Planet_1.PlanetType.Red);
        //
        //
        // this.randomRotation(spaces2);
        var spaces3 = Space.spiral(centers[3], 2);
        //  console.log(spaces3)
        spaces3[0].setPlanetType(Planet_1.PlanetType.White);
        spaces3[1].setPlanetType(Planet_1.PlanetType.White);
        spaces3[2].setPlanetType(Planet_1.PlanetType.White);
        spaces3[3].setPlanetType(Planet_1.PlanetType.White);
        spaces3[4].setPlanetType(Planet_1.PlanetType.White);
        spaces3[5].setPlanetType(Planet_1.PlanetType.White);
        spaces3[8].setPlanetType(Planet_1.PlanetType.White);
        //
        // this.randomRotation(spaces3)
        //
        //
        // var spaces4 = Space.spiral(centers[4], 2);
        //
        // this.randomRotation(spaces4)
        //
        // var spaces5 = Space.spiral(centers[5], 2);
        //
        // this.randomRotation(spaces5);
        //
        //
        // var spaces6 = Space.spiral(centers[6], 2);
        //
        // this.randomRotation(spaces6);
        //
        //
        // var spaces7 = Space.spiral(centers[7], 2);
        //
        // this.randomRotation(spaces7)
        //
        //
        // var spaces8 = Space.spiral(centers[8], 2);
        //
        // this.randomRotation(spaces8)
        //
        // var spaces9 = Space.spiral(centers[9], 2);
        //
        // this.randomRotation(spaces9)
        //
        var spaces = spaces0.concat(spaces1);
        spaces = spaces.concat(spaces2);
        spaces = spaces.concat(spaces3);
        // spaces = spaces.concat(spaces4);
        // spaces = spaces.concat(spaces5);
        // spaces = spaces.concat(spaces6);
        // spaces = spaces.concat(spaces7);
        // spaces = spaces.concat(spaces8);
        // spaces = spaces.concat(spaces9);
        this.spaces = spaces;
        for (var _i = 0, spaces_1 = spaces; _i < spaces_1.length; _i++) {
            var space = spaces_1[_i];
            var hex = space.hex;
            var key = hex.q + '_' + hex.r + '_' + hex.s;
            this.planetsMap.set(key, space.planet);
            this.spacesMap.set(key, space);
            if (space.planet != null)
                this.planets.push(space.planet);
        }
        return spaces;
    };
    MapBoard.prototype.randomRotation = function (spaces) {
        // return  no rotation
        var value = Math.floor(Math.random() * 6);
        for (var i = 0; i < value; i++) {
            spaces = this.spacesRotation(spaces);
        }
    };
    MapBoard.prototype.spacesRotation = function (spaces) {
        var spacesRotation = [];
        for (var i = 0; i < spaces.length; i++) {
            spacesRotation[i] = this.getRotationHex(spaces[i]);
        }
        return spacesRotation;
    };
    MapBoard.prototype.getRotationHex = function (s) {
        var a = s.hex;
        var hex = new Hex_1.Hex(-a.s, -a.q, -a.r);
        s.hex = hex;
        return s;
    };
    /*
     *  todo
     *  update mind to station, for hasNeighboring for 3 Gold or 6 Gold
     *  hex is location pid, is playerID
     */
    MapBoard.prototype.hasNeighboring = function (hex, playerID) {
        var neighborsHex = Hex_1.Hex.spiral(hex, 2); // distance = 2 as neighbor
        for (var _i = 0, neighborsHex_1 = neighborsHex; _i < neighborsHex_1.length; _i++) {
            var h = neighborsHex_1[_i];
            var planet = this.getPlanet(h);
            if (planet !== null && planet.playerID >= 0 && planet.playerID !== playerID) {
                return true;
            }
        }
        return false;
    };
    MapBoard.prototype.checkPlanetEmpty = function (hex) {
        var planet = this.getPlanet(hex);
        if (planet !== null && planet.playerID === -1)
            return true;
        else
            return false;
    };
    MapBoard.prototype.buildMine = function (hex, playerID) {
        var planet = this.getPlanet(hex);
        if (planet === null)
            return;
        planet.playerID = playerID;
        planet.building = Structure_1.StructureType.Mine;
    };
    MapBoard.prototype.hasPlanet = function (hex) {
        // if there's a planet in that spot, return it to the caller
        // otherwise return void or maybe throw an exception
        var key = hex.q + '_' + hex.r + '_' + hex.s;
        var planet = this.planetsMap.get(key);
        if (planet === undefined || planet === null) {
            return false;
        }
        else
            return true;
    };
    MapBoard.prototype.checkSpaceFeded = function (hexs) {
        for (var _i = 0, hexs_2 = hexs; _i < hexs_2.length; _i++) {
            var hex = hexs_2[_i];
            var key = hex.q + '_' + hex.r + '_' + hex.s;
            var space = this.spacesMap.get(key);
            if (space == null)
                return false;
            if (space.feded === true)
                return false;
        }
        return true;
    };
    MapBoard.prototype.markSpaceFeded = function (hexs) {
        for (var _i = 0, hexs_3 = hexs; _i < hexs_3.length; _i++) {
            var hex = hexs_3[_i];
            var key = hex.q + '_' + hex.r + '_' + hex.s;
            var space = this.spacesMap.get(key);
            if (space == null)
                return;
            space.feded = true;
        }
    };
    return MapBoard;
}());
exports.MapBoard = MapBoard;
