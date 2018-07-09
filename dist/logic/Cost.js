import { Material } from './Benefit';
var BuildCost = /** @class */ (function () {
    function BuildCost(material, quantity) {
        this.material = material;
        this.quantity = quantity;
    }
    return BuildCost;
}());
// todo this class later redesign
var Cost = /** @class */ (function () {
    // this code affects my Race and Player class but unsure how it should be structured at this point
    function Cost(items) {
        this.items = items;
        // this.mine = [{material:'gold', quantity: 2}, {material:'ore', quantity: 1}];
        // this.station1 = [{material:'gold', quantity: 6}, {material:'ore', quantity: 2}];
        // this.station2 = {'gold':3, 'ore':2}
        // this.institute = {'gold':6, 'ore':4}
        // this.lab = {'gold':5, 'ore':3}
        // this.occupyGaia = {'QIC':1}
        // this.gaiaCost = {material:'power', quantity: 6};
        // this.academies = {'gold':6, 'ore':6}
        // this.terraforming = {'ore':3}
    }
    Cost.prototype.add = function (item) {
        this.items.push(item);
    };
    Cost.prototype.getGaiaCost = function () {
        return new Cost([new BuildCost(Material.Gold, 2)]);
    };
    return Cost;
}());
export { Cost, BuildCost };
//# sourceMappingURL=Cost.js.map