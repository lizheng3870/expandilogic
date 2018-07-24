"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ScoringBoard = /** @class */ (function () {
    function ScoringBoard() {
        this.loadTechs();
    }
    /**
     * update the technology
     * @param lane update the lane of tech
     * @param player
     */
    ScoringBoard.prototype.update = function (lane, player) {
        // var level = player.techs[lane];
        // this.table[lane][level + 1].update(player);
        player.techs[lane]++;
    };
    /**
     *
     * @param lane which lane of techtile you want to take
     * @param player which player take
     */
    ScoringBoard.prototype.takeNormal6TechTiles = function (lane, player) {
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
    ScoringBoard.prototype.takeNormal3TechTiles = function (index, lane, player) {
        this.normal3TechTiles[index].onTechTile(player);
        this.update(lane, player);
    };
    /**
     * when you take the advance techtile, you must also turn off a normal techtile
     * @param lane the one you take
     * @param offId the one you turn off
     * @param player who will take
     */
    ScoringBoard.prototype.takeAdvancedTechTiles = function (lane, offId, player) {
        this.advanceTechTiles[lane].onAdvanceTechTile(player, offId);
        this.update(lane, player);
    };
    ScoringBoard.prototype.loadTechs = function () {
    };
    return ScoringBoard;
}());
exports.default = ScoringBoard;
