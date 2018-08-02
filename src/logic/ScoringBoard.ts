import {Benefit, Value, Material, Count, BuildingType, Trigger} from './Benefit'
import { Player } from './Player';

enum FinalCount {
  Sectors,
  Buildings,
  FederationBuildings,
  PlanetTypes,
  Gaia,
  Satellites,
}

class ScoringBoard {
  public roundBenefits: Benefit[];  //  0 - 5
  public finalCounts: FinalCount[];   // 0  1
  constructor(random:boolean = true) {
    this.roundBenefits = [];
    this.finalCounts = [];
    this.loadData(random);
  }

  public loadData(random: boolean){

    let indexs = [0,1,2,3,4,5,6,7,8,9];
    if(random === true){
        indexs.sort(function(){ return 0.5 - Math.random() });
    }

    let list = this.allRoundBenefits();
    for(let i = 0; i < 6 ; i++){
      this.roundBenefits.push(list[i]);
    }


    let indexs2 = [0,1,2,3,4,5];
    if(random === true){
        indexs2.sort(function(){ return 0.5 - Math.random() });
    }
    let list2 = this.FinalCount();

      this.finalCounts.push(list2[0]);
      this.finalCounts.push(list2[1]);


  }


  public allRoundBenefits(){
     let list : Benefit[] = [];
     let benefit = new Benefit(Trigger.Build, null, BuildingType.Mine, [new Value(2, Material.VP)]);
     list.push(benefit)
     benefit = new Benefit(Trigger.Build, null, BuildingType.TradingStation, [new Value(3, Material.VP)]);
     list.push(benefit)
     benefit = new Benefit(Trigger.Build, null, BuildingType.TradingStation, [new Value(4, Material.VP)]);
     list.push(benefit)
     benefit = new Benefit(Trigger.Build, null, BuildingType.MineOnGaia, [new Value(3, Material.VP)]);
     list.push(benefit)
     benefit = new Benefit(Trigger.Build, null, BuildingType.MineOnGaia, [new Value(4, Material.VP)]);
     list.push(benefit)
     benefit = new Benefit(Trigger.Build, null, BuildingType.BigBuildings, [new Value(5, Material.VP)]);
     list.push(benefit)
     benefit = new Benefit(Trigger.Build, null, BuildingType.BigBuildings, [new Value(5, Material.VP)]);
     list.push(benefit) // same as above
     benefit = new Benefit(Trigger.Fed, null, null, [new Value(5, Material.VP)]);
     list.push(benefit)
     benefit = new Benefit(Trigger.Dig, null, null, [new Value(2, Material.VP)]);
     list.push(benefit)
     benefit = new Benefit(Trigger.ScienceUp, null, null, [new Value(2, Material.VP)]);
     list.push(benefit)
     return list;
 }


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
   public FinalCount(){
      let list : FinalCount[] = [];
      list.push(FinalCount.Sectors);
      list.push(FinalCount.Buildings);
      list.push(FinalCount.Gaia);
      list.push(FinalCount.FederationBuildings);
      list.push(FinalCount.PlanetTypes);
      list.push(FinalCount.Satellites);

      return list;
  }

}


export  { ScoringBoard, FinalCount};
