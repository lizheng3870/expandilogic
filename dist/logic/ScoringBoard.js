"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Benefit_1 = require("./Benefit");
var FinalCount;
(function (FinalCount) {
    FinalCount[FinalCount["Sectors"] = 0] = "Sectors";
    FinalCount[FinalCount["Buildings"] = 1] = "Buildings";
    FinalCount[FinalCount["FederationBuildings"] = 2] = "FederationBuildings";
    FinalCount[FinalCount["PlanetTypes"] = 3] = "PlanetTypes";
    FinalCount[FinalCount["Gaia"] = 4] = "Gaia";
    FinalCount[FinalCount["Satellites"] = 5] = "Satellites";
})(FinalCount || (FinalCount = {}));
exports.FinalCount = FinalCount;
var ScoringBoard = /** @class */ (function () {
    function ScoringBoard(random) {
        if (random === void 0) { random = true; }
        this.roundBenefits = [];
        this.finalCounts = [];
        this.loadData(random);
    }
    ScoringBoard.prototype.loadData = function (random) {
        var indexs = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        if (random === true) {
            indexs.sort(function () { return 0.5 - Math.random(); });
        }
        var list = this.allRoundBenefits();
        for (var i = 0; i < 6; i++) {
            this.roundBenefits.push(list[i]);
        }
        var indexs2 = [0, 1, 2, 3, 4, 5];
        if (random === true) {
            indexs2.sort(function () { return 0.5 - Math.random(); });
        }
        var list2 = this.FinalCount();
        this.finalCounts.push(list2[0]);
        this.finalCounts.push(list2[1]);
    };
    ScoringBoard.prototype.allRoundBenefits = function () {
        var list = [];
        var benefit = new Benefit_1.Benefit(3 /* Build */, null, Benefit_1.BuildingType.Mine, [new Benefit_1.Value(2, Benefit_1.Material.VP)]);
        list.push(benefit);
        benefit = new Benefit_1.Benefit(3 /* Build */, null, Benefit_1.BuildingType.TradingStation, [new Benefit_1.Value(3, Benefit_1.Material.VP)]);
        list.push(benefit);
        benefit = new Benefit_1.Benefit(3 /* Build */, null, Benefit_1.BuildingType.TradingStation, [new Benefit_1.Value(4, Benefit_1.Material.VP)]);
        list.push(benefit);
        benefit = new Benefit_1.Benefit(3 /* Build */, null, Benefit_1.BuildingType.MineOnGaia, [new Benefit_1.Value(3, Benefit_1.Material.VP)]);
        list.push(benefit);
        benefit = new Benefit_1.Benefit(3 /* Build */, null, Benefit_1.BuildingType.MineOnGaia, [new Benefit_1.Value(4, Benefit_1.Material.VP)]);
        list.push(benefit);
        benefit = new Benefit_1.Benefit(3 /* Build */, null, Benefit_1.BuildingType.BigBuildings, [new Benefit_1.Value(5, Benefit_1.Material.VP)]);
        list.push(benefit);
        benefit = new Benefit_1.Benefit(3 /* Build */, null, Benefit_1.BuildingType.BigBuildings, [new Benefit_1.Value(5, Benefit_1.Material.VP)]);
        list.push(benefit); // same as above
        benefit = new Benefit_1.Benefit(1 /* Fed */, null, null, [new Benefit_1.Value(5, Benefit_1.Material.VP)]);
        list.push(benefit);
        benefit = new Benefit_1.Benefit(2 /* Dig */, null, null, [new Benefit_1.Value(2, Benefit_1.Material.VP)]);
        list.push(benefit);
        benefit = new Benefit_1.Benefit(7 /* ScienceUp */, null, null, [new Benefit_1.Value(2, Benefit_1.Material.VP)]);
        list.push(benefit);
        return list;
    };
    /*
    
    enum FinalCount {
      Sectors,
      Buildings,
      FederationBuildings,
      PlanetTypes,
      Gaia,
      Satellites,
    }
    */
    ScoringBoard.prototype.FinalCount = function () {
        var list = [];
        list.push(FinalCount.Sectors);
        list.push(FinalCount.Buildings);
        list.push(FinalCount.Gaia);
        list.push(FinalCount.FederationBuildings);
        list.push(FinalCount.PlanetTypes);
        list.push(FinalCount.Satellites);
        return list;
    };
    return ScoringBoard;
}());
exports.ScoringBoard = ScoringBoard;
