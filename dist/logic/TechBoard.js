import Tech from './Tech';
var TechBoard = /** @class */ (function () {
    function TechBoard() {
        this.table = [[]];
        this.normal6Techs = [];
        this.normal3Techs = [];
        this.advanceTechs = [];
        this.loadTechs();
        this.types = ["dig", "nav", "gic", "gaia", "resouces", "science"];
    }
    TechBoard.prototype.next = function (lane, player) {
        var level = player.techs[lane];
        this.table[lane][level + 1].update(player);
        player.techs[lane]++;
    };
    TechBoard.prototype.takeTechTiles5 = function (lane, player) {
    };
    TechBoard.prototype.takeTechTiles3 = function () {
    };
    TechBoard.prototype.takeAdvancedTechTiles = function (lane, player) {
    };
    TechBoard.prototype.loadTechs = function () {
        var i = 0;
        var j = 0;
        for (; i < 6; i++) {
            for (; j < 6; j++) {
                this.table[i][j] = new Tech(i, j);
            }
        }
        var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        arr.sort(function () { return 0.5 - Math.random(); });
        for (i = 0; i < 6; i++) {
            this.normal6Techs[i] = new TechTile(arr[i]);
        }
        for (i = 0; i < 3; i++) {
            this.normal3Techs[i] = new TechTile(arr[i + 6]);
        }
        arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
        arr.sort(function () { return 0.5 - Math.random(); });
        for (i = 0; i < 6; i++) {
            this.advanceTechs[i] = new TechTile(arr[i]);
        }
    };
    return TechBoard;
}());
export default TechBoard;
//# sourceMappingURL=TechBoard.js.map