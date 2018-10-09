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
        this.centers = centers;
        var spaces0 = Space.spiral(centers[0], 2);
        //spaces0[0].setPlanetType(PlanetType.Blue);
        //spaces0[2].setPlanetType(PlanetType.Transdim);
        spaces0[4].setPlanetType(Planet_1.PlanetType.Blue);
        spaces0[6].setPlanetType(Planet_1.PlanetType.Brown);
        spaces0[9].setPlanetType(Planet_1.PlanetType.Red);
        spaces0[10].setPlanetType(Planet_1.PlanetType.Orange);
        spaces0[12].setPlanetType(Planet_1.PlanetType.Transdim);
        spaces0[18].setPlanetType(Planet_1.PlanetType.Yellow);
        // spaces0[5].setPlanetType(PlanetType.White);
        //  spaces0[8].setPlanetType(PlanetType.Red);
        // console.log(spaces0)
        // this.randomRotation(spaces0);
        var spaces1 = Space.spiral(centers[1], 2);
        // spaces1[0].setPlanetType(PlanetType.Yellow);
        spaces1[3].setPlanetType(Planet_1.PlanetType.White);
        spaces1[6].setPlanetType(Planet_1.PlanetType.Gaia);
        spaces1[8].setPlanetType(Planet_1.PlanetType.Blue);
        spaces1[9].setPlanetType(Planet_1.PlanetType.Yellow);
        spaces1[12].setPlanetType(Planet_1.PlanetType.Black);
        spaces1[15].setPlanetType(Planet_1.PlanetType.Transdim);
        //  spaces1[1].setPlanetType(PlanetType.Yellow);
        //  spaces1[2].setPlanetType(PlanetType.Gaia);
        //  spaces1[3].setPlanetType(PlanetType.Yellow);
        //  spaces1[4].setPlanetType(PlanetType.Transdim);
        //  spaces1[5].setPlanetType(PlanetType.White);
        //  spaces1[8].setPlanetType(PlanetType.Red);
        // this.randomRotation(spaces1);
        //
        var spaces2 = Space.spiral(centers[2], 2);
        //spaces2[0].setPlanetType(PlanetType.Red);
        spaces2[6].setPlanetType(Planet_1.PlanetType.Gaia);
        spaces2[8].setPlanetType(Planet_1.PlanetType.Orange);
        spaces2[9].setPlanetType(Planet_1.PlanetType.Yellow);
        spaces2[12].setPlanetType(Planet_1.PlanetType.Red);
        spaces2[13].setPlanetType(Planet_1.PlanetType.Transdim);
        spaces2[15].setPlanetType(Planet_1.PlanetType.White);
        // spaces2[1].setPlanetType(PlanetType.Red);
        // spaces2[3].setPlanetType(PlanetType.Gaia);
        // spaces2[5].setPlanetType(PlanetType.White);
        // spaces2[8].setPlanetType(PlanetType.Transdim);
        //
        //
        // this.randomRotation(spaces2);
        var spaces3 = Space.spiral(centers[3], 2);
        //  console.log(spaces3)
        // spaces3[0].setPlanetType(PlanetType.White);
        spaces3[3].setPlanetType(Planet_1.PlanetType.Gaia);
        spaces3[6].setPlanetType(Planet_1.PlanetType.Yellow);
        spaces3[7].setPlanetType(Planet_1.PlanetType.Blue);
        spaces3[8].setPlanetType(Planet_1.PlanetType.Red);
        spaces3[13].setPlanetType(Planet_1.PlanetType.Transdim);
        spaces3[14].setPlanetType(Planet_1.PlanetType.Transdim);
        // spaces3[1].setPlanetType(PlanetType.White);
        // spaces3[3].setPlanetType(PlanetType.Transdim);
        // spaces3[4].setPlanetType(PlanetType.Red);
        // spaces3[5].setPlanetType(PlanetType.Yellow);
        // spaces3[8].setPlanetType(PlanetType.Gaia);
        //
        // this.randomRotation(spaces3)
        //
        //
        var spaces4 = Space.spiral(centers[4], 2);
        spaces4[1].setPlanetType(Planet_1.PlanetType.Brown);
        spaces4[4].setPlanetType(Planet_1.PlanetType.White);
        spaces4[8].setPlanetType(Planet_1.PlanetType.Red);
        spaces4[10].setPlanetType(Planet_1.PlanetType.Transdim);
        spaces4[12].setPlanetType(Planet_1.PlanetType.Yellow);
        spaces4[15].setPlanetType(Planet_1.PlanetType.Black);
        spaces4[16].setPlanetType(Planet_1.PlanetType.Orange);
        // spaces4[0].setPlanetType(PlanetType.Gaia);
        // spaces4[2].setPlanetType(PlanetType.Red);
        //
        // this.randomRotation(spaces4)
        //
        var spaces5 = Space.spiral(centers[5], 2);
        //  spaces5[7].setPlanetType(PlanetType.Yellow);
        spaces5[1].setPlanetType(Planet_1.PlanetType.Black);
        spaces5[3].setPlanetType(Planet_1.PlanetType.Gaia);
        spaces5[7].setPlanetType(Planet_1.PlanetType.Brown);
        spaces5[13].setPlanetType(Planet_1.PlanetType.White);
        spaces5[14].setPlanetType(Planet_1.PlanetType.Transdim);
        spaces5[16].setPlanetType(Planet_1.PlanetType.Orange);
        //   spaces5[3].setPlanetType(PlanetType.Red);
        //  spaces5[4].setPlanetType(PlanetType.Gaia);
        //
        // this.randomRotation(spaces5);
        //
        //
        var spaces6 = Space.spiral(centers[6], 2);
        //  spaces6[3].setPlanetType(PlanetType.Yellow);
        spaces6[2].setPlanetType(Planet_1.PlanetType.Gaia);
        spaces6[4].setPlanetType(Planet_1.PlanetType.Blue);
        spaces6[6].setPlanetType(Planet_1.PlanetType.Brown);
        spaces6[10].setPlanetType(Planet_1.PlanetType.Transdim);
        spaces6[11].setPlanetType(Planet_1.PlanetType.Yellow);
        spaces6[14].setPlanetType(Planet_1.PlanetType.Transdim);
        //  spaces6[4].setPlanetType(PlanetType.Transdim);
        //
        // this.randomRotation(spaces6);
        //
        //
        var spaces7 = Space.spiral(centers[7], 2);
        //  spaces7[3].setPlanetType(PlanetType.Yellow);
        spaces7[1].setPlanetType(Planet_1.PlanetType.Gaia);
        spaces7[3].setPlanetType(Planet_1.PlanetType.Gaia);
        spaces7[5].setPlanetType(Planet_1.PlanetType.Red);
        spaces7[9].setPlanetType(Planet_1.PlanetType.Black);
        spaces7[14].setPlanetType(Planet_1.PlanetType.Brown);
        spaces7[17].setPlanetType(Planet_1.PlanetType.Transdim);
        //  spaces7[4].setPlanetType(PlanetType.Transdim);
        // spaces7[0].setPlanetType(PlanetType.Blue);
        //
        // this.randomRotation(spaces7)
        //
        //
        var spaces8 = Space.spiral(centers[8], 2);
        //  spaces8[0].setPlanetType(PlanetType.Gaia);
        spaces8[1].setPlanetType(Planet_1.PlanetType.Orange);
        spaces8[3].setPlanetType(Planet_1.PlanetType.Brown);
        spaces8[5].setPlanetType(Planet_1.PlanetType.Red);
        spaces8[11].setPlanetType(Planet_1.PlanetType.Blue);
        spaces8[15].setPlanetType(Planet_1.PlanetType.Black);
        spaces8[18].setPlanetType(Planet_1.PlanetType.White);
        // spaces8[2].setPlanetType(PlanetType.Red);
        // spaces8[3].setPlanetType(PlanetType.Red);
        //
        // this.randomRotation(spaces8)
        //
        var spaces9 = Space.spiral(centers[9], 2);
        // spaces9[3].setPlanetType(PlanetType.Yellow);
        spaces9[1].setPlanetType(Planet_1.PlanetType.Orange);
        spaces9[3].setPlanetType(Planet_1.PlanetType.Black);
        spaces9[5].setPlanetType(Planet_1.PlanetType.White);
        spaces9[8].setPlanetType(Planet_1.PlanetType.Transdim);
        spaces9[13].setPlanetType(Planet_1.PlanetType.Transdim);
        spaces9[15].setPlanetType(Planet_1.PlanetType.Blue);
        //  spaces9[4].setPlanetType(PlanetType.Transdim);
        //
        // this.randomRotation(spaces9)
        //
        var spaces = spaces0.concat(spaces1);
        spaces = spaces.concat(spaces2);
        spaces = spaces.concat(spaces3);
        spaces = spaces.concat(spaces4);
        spaces = spaces.concat(spaces5);
        spaces = spaces.concat(spaces6);
        spaces = spaces.concat(spaces7);
        spaces = spaces.concat(spaces8);
        spaces = spaces.concat(spaces9);
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
            if (this.hasPlanet(h)) {
                var planet = this.getPlanet(h);
                if (planet !== null && planet.playerID >= 0 && planet.playerID !== playerID) {
                    return true;
                }
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
    MapBoard.prototype.getPlanetsInRange = function (center, range) {
        var planets = [];
        var neighborings = Hex_1.Hex.rangeHexs(center, range);
        for (var _i = 0, neighborings_1 = neighborings; _i < neighborings_1.length; _i++) {
            var hex = neighborings_1[_i];
            if (this.hasPlanet(hex)) {
                var planet = this.getPlanet(hex);
                planets.push(planet);
            }
        }
        return planets;
    };
    MapBoard.prototype.getAvailablePlanetsInRange = function (range, player) {
        var planets = [];
        var playerOwnPlants = player.planets;
        for (var _i = 0, playerOwnPlants_1 = playerOwnPlants; _i < playerOwnPlants_1.length; _i++) {
            var ownPlanet = playerOwnPlants_1[_i];
            var center = ownPlanet.loc;
            var neighborings = Hex_1.Hex.rangeHexs(center, range);
            console.log("Center is " + center);
            for (var _a = 0, neighborings_2 = neighborings; _a < neighborings_2.length; _a++) {
                var hex = neighborings_2[_a];
                if (this.hasPlanet(hex)) {
                    var planet = this.getPlanet(hex);
                    if (planet !== null && planet.playerID < 0) {
                        planets.push(planet);
                    }
                }
            }
        }
        return planets;
    };
    MapBoard.prototype.getAvailableTransdimInRange = function (range, player) {
        var planets = [];
        var playerOwnPlants = player.planets;
        for (var _i = 0, playerOwnPlants_2 = playerOwnPlants; _i < playerOwnPlants_2.length; _i++) {
            var ownPlanet = playerOwnPlants_2[_i];
            var center = ownPlanet.loc;
            var neighborings = Hex_1.Hex.rangeHexs(center, range);
            for (var _a = 0, neighborings_3 = neighborings; _a < neighborings_3.length; _a++) {
                var hex = neighborings_3[_a];
                if (this.hasPlanet(hex)) {
                    var planet = this.getPlanet(hex);
                    if (planet !== null && planet.playerID < 0 && planet.type === Planet_1.PlanetType.Transdim) {
                        planets.push(planet);
                    }
                }
            }
        }
        return planets;
    };
    MapBoard.prototype.checkSpaceFeded = function (hexs) {
        // console.log("**************we begin!!****************");
        for (var _i = 0, hexs_2 = hexs; _i < hexs_2.length; _i++) {
            var hex = hexs_2[_i];
            var key = hex.q + '_' + hex.r + '_' + hex.s;
            var space = this.spacesMap.get(key);
            if (space == null) {
                // console.log("*********space is null**********")
                return true;
            }
            if (space.feded === true) {
                // console.log("**************already feded!!!***************");
                return true;
            }
        }
        return false;
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
    MapBoard.prototype.getSpace = function (space) {
        if (space.planet === null) {
            return {
                q: space.hex.q,
                r: space.hex.r,
                s: space.hex.s,
                planet: null,
                playerID: -1,
                building: null,
            };
        }
        else if (space.planet.playerID === -1) {
            return {
                q: space.hex.q,
                r: space.hex.r,
                s: space.hex.s,
                planet: space.planet.type,
                playerID: -1,
                building: null,
            };
        }
        else {
            return {
                q: space.hex.q,
                r: space.hex.r,
                s: space.hex.s,
                planet: space.planet.type,
                playerID: space.planet.playerID,
                building: space.planet.building,
            };
        }
    };
    MapBoard.prototype.dumpSpace = function () {
        var data = [];
        for (var _i = 0, _a = this.spaces; _i < _a.length; _i++) {
            var space = _a[_i];
            data.push(this.getSpace(space));
        }
        console.log(data);
        return data;
    };
    MapBoard.prototype.getPlayerSectors = function (playerID) {
        var count = 0;
        for (var _i = 0, _a = this.centers; _i < _a.length; _i++) {
            var center = _a[_i];
            if (this.checkSectorHasPlayerPlanet(center, playerID))
                count++;
        }
        return count;
    };
    MapBoard.prototype.checkSectorHasPlayerPlanet = function (center, playerID) {
        var hexs = Hex_1.Hex.spiral(center, 2);
        for (var _i = 0, hexs_4 = hexs; _i < hexs_4.length; _i++) {
            var hex = hexs_4[_i];
            if (this.hasPlanet(hex)) {
                var planet = this.getPlanet(hex);
                if (planet.playerID === playerID) {
                    return true;
                }
            }
        }
        return false;
    };
    return MapBoard;
}());
exports.MapBoard = MapBoard;
