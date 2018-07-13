"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Tech_1 = require("./Tech");
var TechTiles_1 = require("./TechTiles");
var TechBoard = /** @class */ (function () {
    function TechBoard() {
        this.loadTechs();
    }
    /**
     * update the technology
     * @param lane update the lane of tech
     * @param player
     */
    TechBoard.prototype.update = function (lane, player) {
        // var level = player.techs[lane];
        // this.table[lane][level + 1].update(player);
        player.techs[lane]++;
    };
    /**
     *
     * @param lane which lane of techtile you want to take
     * @param player which player take
     */
    TechBoard.prototype.takeNormal6TechTiles = function (lane, player) {
        this.normal6TechTiles[lane].onTechTile(player);
        this.update(lane, player);
    };
    /**
     * when you take the above 3 techtiles, you need to specify which lane of technology
     * you want to update
     * @param index the techtile index in the normail3TechTiles
     * @param lane the lane of tech you want to update
     * @param player the player who do this
     */
    TechBoard.prototype.takeNormal3TechTiles = function (index, lane, player) {
        this.normal3TechTiles[index].onTechTile(player);
        this.update(lane, player);
    };
    /**
     * when you take the advance techtile, you must also turn off a normal techtile
     * @param lane the one you take
     * @param offId the one you turn off
     * @param player who will take
     */
    TechBoard.prototype.takeAdvancedTechTiles = function (lane, offId, player) {
        this.advanceTechTiles[lane].onAdvanceTechTile(player, offId);
        this.update(lane, player);
    };
    TechBoard.prototype.loadTechs = function () {
        var i = 0;
        var j = 0;
        for (; i < 6; i++) {
            for (; j < 6; j++) {
                this.table[i][j] = new Tech_1.default(i, j);
            }
        }
        var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        arr.sort(function () { return 0.5 - Math.random(); });
        for (i = 0; i < 6; i++) {
            this.normal6Id[i] = arr[i];
            this.normal6TechTiles[i] = new TechTiles_1.default(arr[i]);
        }
        for (i = 0; i < 3; i++) {
            this.normal3Id[i] = arr[i + 6];
            this.normal3TechTiles[i] = new TechTiles_1.default(arr[i + 6]);
        }
        arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
        arr.sort(function () { return 0.5 - Math.random(); });
        for (i = 0; i < 6; i++) {
            this.advanceId[i] = arr[i];
            this.advanceTechTiles[i] = new TechTiles_1.default(arr[i]);
        }
    };
    return TechBoard;
}());
exports.default = TechBoard;
