import {Benefit, Value, Material, Count, Struct, Trigger}   from './Benefit'

class BuildCost {
  public material: Material;
  public quantity: number;
  constructor(material: Material, quantity: number){
    this.material = material;
    this.quantity = quantity;
  }
}
// todo this class later redesign

 class Cost {
    public items: BuildCost[];




// this code affects my Race and Player class but unsure how it should be structured at this point
  constructor(items: BuildCost[]) {
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

  public add(item: BuildCost){
      this.items.push(item);
  }


  public getGaiaCost() {
      return new Cost([new BuildCost(Material.Gold, 2)]);
  }

}

export default Cost
