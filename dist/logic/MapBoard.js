import { GridGenerator, HexUtils, Hex } from 'react-hexgrid';
var MapBoard = /** @class */ (function () {
    function MapBoard() {
    }
    MapBoard.prototype.getHex = function (q, r) {
        return new Hex(q, r, -q - r);
    };
    MapBoard.prototype.createNewMap = function () {
        //  var spaces19 = GridGenerator.spiral(2);
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
        var spaces0 = GridGenerator.spiral(centers[0], 2);
        spaces0[0].plant = 'plant1';
        spaces0[5].plant = 'plant2';
        spaces0[9].plant = 'plant3';
        this.randomRotation(spaces0);
        var spaces1 = GridGenerator.spiral(centers[1], 2);
        spaces1[2].plant = 'plant1';
        spaces1[3].plant = 'plant2';
        spaces1[10].plant = 'plant3';
        this.randomRotation(spaces1);
        var spaces2 = GridGenerator.spiral(centers[2], 2);
        spaces2[10].plant = 'plant1';
        spaces2[15].plant = 'plant2';
        spaces2[17].plant = 'plant3';
        this.randomRotation(spaces2);
        // var spaces3 = GridGenerator.spiral(centers[3], 2);
        // spaces3[3].plant = 'plant1';
        // spaces3[8].plant = 'plant2';
        // spaces3[13].plant = 'plant3';
        // this.randomRotation(spaces3)
        //
        //
        // var spaces4 = GridGenerator.spiral(centers[4], 2);
        // spaces4[3].plant = 'plant1';
        // spaces4[12].plant = 'plant2';
        // spaces4[9].plant = 'plant3';
        // this.randomRotation(spaces4)
        //
        // var spaces5 = GridGenerator.spiral(centers[5], 2);
        // spaces5[4].plant = 'plant1';
        // spaces5[8].plant = 'plant2';
        // spaces5[16].plant = 'plant3';
        // this.randomRotation(spaces5);
        //
        //
        // var spaces6 = GridGenerator.spiral(centers[6], 2);
        // spaces6[12].plant = 'plant1';
        // spaces6[14].plant = 'plant2';
        // spaces6[1].plant = 'plant3';
        // this.randomRotation(spaces6);
        //
        //
        // var spaces7 = GridGenerator.spiral(centers[7], 2);
        // spaces7[0].plant = 'plant1';
        // spaces7[3].plant = 'plant2';
        // spaces7[7].plant = 'plant3';
        // this.randomRotation(spaces7)
        //
        //
        // var spaces8 = GridGenerator.spiral(centers[8], 2);
        // spaces8[3].plant = 'plant1';
        // spaces8[8].plant = 'plant2';
        // spaces8[13].plant = 'plant3';
        // this.randomRotation(spaces8)
        //
        // var spaces9 = GridGenerator.spiral(centers[9], 2);
        // spaces9[3].plant = 'plant1';
        // spaces9[9].plant = 'plant2';
        // spaces9[15].plant = 'plant3';
        // this.randomRotation(spaces9)
        //
        //
        var spaces = spaces0.concat(spaces1);
        spaces = spaces.concat(spaces2);
        // spaces = spaces.concat(spaces3);
        // spaces = spaces.concat(spaces4);
        // spaces = spaces.concat(spaces5);
        // spaces = spaces.concat(spaces6);
        // spaces = spaces.concat(spaces7);
        // spaces = spaces.concat(spaces8);
        // spaces = spaces.concat(spaces9);
        this.spaces = spaces;
        return spaces;
    };
    /*
     *  todo
     *  update mind to station, for hasNeighboring for 3 Gold or 6 Gold
     *  hex is location pid, is playerID
     */
    MapBoard.prototype.hasNeighboring = function (hex, pid) {
        for (var i = 0; i < this.spaces.length; i++) {
            //
            var curHex = Hex(0, 0, 0); // todo this.planets[i].hex;
            var d = HexUtils.distance(curHex, hex);
            if (d <= 2) {
                var planet = curHex.planet;
                if (planet.playerID >= 0 && planet.playerID !== pid) {
                    return true;
                }
            }
        }
        return false;
    };
    // todo hex
    MapBoard.prototype.updateBuiding = function (hex, sid) {
    };
    MapBoard.prototype.randomRotation = function (spaces) {
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
    MapBoard.prototype.getRotationHex = function (a) {
        var hex = new Hex(-a.s, -a.q, -a.r);
        hex.plant = a.plant;
        return hex;
    };
    // todo
    MapBoard.prototype.checkPlanetEmpty = function (hex) {
        return true;
    };
    MapBoard.prototype.buildMine = function (board, player) {
    };
    return MapBoard;
}());
export { Hex, MapBoard };
//# sourceMappingURL=MapBoard.js.map