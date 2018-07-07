import { Material } from "./Benefit";
import { Player } from "./Player";

class Merchandise{
  public give: Material;
  public get: Material;
  public numGive: number;
  public numGet: number;

  constructor(give: Material, get: Material, numGive: number, numGet: number){
    this.give = give;
    this.get = get;
    this.numGive = numGive;
    this.numGet = numGet;
  }
}
class Exchange{
  public powerQIC: Merchandise;
  public powerOre: Merchandise;
  public powerSicence: Merchandise;
  public powerGold: Merchandise;
  public oreGold: Merchandise;
  public oreExtra: Merchandise;
  public qicRange: Merchandise;
  public qicOre: Merchandise;
  public scienceGold: Merchandise;
  public exchanges: Merchandise[];

  constructor(){
    this.powerQIC = new Merchandise(Material.Charge, Material.QIC, 4, 1);
    this.powerOre = new Merchandise(Material.Charge, Material.Ore, 3, 1);
    this.powerSicence = new Merchandise(Material.Charge, Material.Science, 4, 1);
    this.powerGold = new Merchandise(Material.Charge, Material.Gold, 1, 1);
    this.oreGold = new Merchandise(Material.Ore, Material.Gold, 1, 1);
    this.oreExtra = new Merchandise(Material.Ore, Material.Power, 1, 1);
    this.qicRange = new Merchandise(Material.QIC, Material.SpecialRange, 1, 2);
    this.qicOre = new Merchandise(Material.QIC, Material.Ore, 1, 1);
    this.scienceGold = new Merchandise(Material.Science, Material.Gold, 1, 1);
    this.exchanges.push(this.powerQIC);
    this.exchanges.push(this.powerOre);
    this.exchanges.push(this.powerSicence);
    this.exchanges.push(this.powerGold);
    this.exchanges.push(this.oreGold);
    this.exchanges.push(this.oreExtra);
    this.exchanges.push(this.qicRange);
    this.exchanges.push(this.qicOre);
    this.exchanges.push(this.scienceGold);
  }

  public trade(player: Player, give: Material, get: Material, times: number){
    var good;
    for(var i = 0; i < this.exchanges.length; i++){
      if(this.exchanges[i].give === give && this.exchanges[i].get === get){
        good = this.exchanges[i];
      }
    }

  }


}

export {Merchandise, Exchange}
