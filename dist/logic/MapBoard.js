"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Hex_1 = require("./Hex");
exports.Hex = Hex_1.Hex;
var MapBoard = /** @class */ (function () {
    // private spaces : Hex[]
    // private planets: Planet[]
    function MapBoard(size) {
        // this.spaces = []
        // this.planets = []
        if (size === void 0) { size = 10; }
        this.size = size;
        // generate the tiles
        // place planets on tiles
        // randomly arrange the tiles into an acceptable configuration 
        // (no two planets of the same type adjacent, except TransDim)
    }
    MapBoard.prototype.getPlanet = function (x, y, z) {
        // if there's a planet in that spot, return it to the caller
        // otherwise return void or maybe throw an exception
    };
    return MapBoard;
}());
exports.MapBoard = MapBoard;
