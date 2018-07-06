import {Benefit, Value, Material, Count, Struct, Trigger} from './Benefit'
import {Player} from './Player'

class Tech{
  public lane: number;
  public level: number;

  constructor(lane: number, level: number){
    this.lane = lane;
    this.level = level;
  }

/*
* initialize the benefit
*/
  public update(player: Player){
    if(this.level === 3){
      //player.chargePower(3);
      const b1 = new Benefit(Trigger.Now， null, null, [new Value(3, Material.Charge)]);
      player.nowBenefits.push(b1);
    }


  //   if(lane == 0){
  //     if(level == 1) player.ore += 2;
  //     if(level == 2) player.cost.terraforming.ore = 2;
  //     if(level == 3) player.cost.terraforming.ore = 1;
  //     if(level == 4) player.ore += 2;
  //     //if(level == 5) // player.getFedaration();
  //   }
  //

    const b2;
    if(lane === 0){
      if(level === 1) {b2 = new Benefit(Trigger.Now, null, null, [new Value(2, Material.Ore)])}
      if(level === 2) {;player.cost.terraforming.ore = 2;}
      if(level === 3) {player.cost.terraforming.ore = 1;}
      if(level === 4) {player.ore += 2;}
      //if(level == 5) // player.getFedaration();
    }
  //   if(lane == 1){
  //     if(level == 1) player.QIC += 1;
  //     if(level == 2) player.range = 2;
  //     if(level == 3) player.QIC += 1;
  //     if(level == 4) player.range = 3;
  //     if(level == 5){
  //       player.range = 4;
  //       //player.getLostPlanet();
  //     }
  //   }
  //
  //   if(lane == 2){
  //     if(level == 1) player.QIC += 1;
  //     if(level == 2) player.QIC += 1;
  //     if(level == 3) player.QIC += 2;
  //     if(level == 4) player.QIC += 2;
  //     if(level == 5) player.QIC += 4;
  //   }
  //
  //   if(lane == 3){
  //     if(level == 1) player.gaiaformer += 1;
  //     if(level == 2) player.power1 += 3;
  //     if(level == 3){
  //       player.gaiaformer += 1;
  //       player.cost.convertGaia = 4;
  //     }
  //     if(level == 4){
  //       player.gaiaformer += 1;
  //       player.cost.convertGaia = 3;
  //     }
  //     if(level == 5) player.VP += 4 + 1 * player.numGaia;
  //   }
  //
  //   if(lane == 4){
  //     if(level == 1){
  //       player.income.gold += 2;
  //       player.income.charge += 1;
  //     }
  //     if(level == 2){
  //       player.income.ore += 1;
  //       player.income.charge += 1;
  //     }
  //     if(level == 3){
  //       player.income.gold += 1;
  //       player.income.charge += 1;
  //     }
  //     if(level == 4){
  //       player.income.ore += 1;
  //       player.income.gold += 1;
  //       player.income.charge += 1;
  //     }
  //     if(level == 5){
  //       player.income.ore -= 2;
  //       player.income.gold -= 4;
  //       player.income.charge -= 4;
  //       player.ore += 3;
  //       player.gold += 6;
  //       player.chargePower(6);
  //     }
  //   }
  //
  //   if(lane == 5){
  //     if(level == 1) player.income.science += 1;
  //     if(level == 2) player.income.science += 1;
  //     if(level == 3) player.income.science += 1;
  //     if(level == 4) player.income.science += 1;
  //     if(level == 5){
  //       player.income.science -= 4;
  //       player.science += 9;
  //     }
  //   }
  //
  // }
  //
  //   public update(player){
  //      const lane = this.lane;
  //      const level = this.level;
  //
  //      if(level == 3){
  //        player.chargePower(3);
  //      }
  //
  //      if(lane == 0){
  //        if(level == 1) player.ore += 2;
  //        if(level == 2) player.cost.terraforming.ore = 2;
  //        if(level == 3) player.cost.terraforming.ore = 1;
  //        if(level == 4) player.ore += 2;
  //        //if(level == 5) // player.getFedaration();
  //      }
  //
  //      if(lane == 1){
  //        if(level == 1) player.QIC += 1;
  //        if(level == 2) player.range = 2;
  //        if(level == 3) player.QIC += 1;
  //        if(level == 4) player.range = 3;
  //        if(level == 5){
  //          player.range = 4;
  //          //player.getLostPlanet();
  //        }
  //      }
  //
  //      if(lane == 2){
  //        if(level == 1) player.QIC += 1;
  //        if(level == 2) player.QIC += 1;
  //        if(level == 3) player.QIC += 2;
  //        if(level == 4) player.QIC += 2;
  //        if(level == 5) player.QIC += 4;
  //      }
  //
  //      if(lane == 3){
  //        if(level == 1) player.gaiaformer += 1;
  //        if(level == 2) player.power1 += 3;
  //        if(level == 3){
  //          player.gaiaformer += 1;
  //          player.cost.convertGaia = 4;
  //        }
  //        if(level == 4){
  //          player.gaiaformer += 1;
  //          player.cost.convertGaia = 3;
  //        }
  //        if(level == 5) player.VP += 4 + 1 * player.numGaia;
  //      }
  //
  //      if(lane == 4){
  //        if(level == 1){
  //          player.income.gold += 2;
  //          player.income.charge += 1;
  //        }
  //        if(level == 2){
  //          player.income.ore += 1;
  //          player.income.charge += 1;
  //        }
  //        if(level == 3){
  //          player.income.gold += 1;
  //          player.income.charge += 1;
  //        }
  //        if(level == 4){
  //          player.income.ore += 1;
  //          player.income.gold += 1;
  //          player.income.charge += 1;
  //        }
  //        if(level == 5){
  //          player.income.ore -= 2;
  //          player.income.gold -= 4;
  //          player.income.charge -= 4;
  //          player.ore += 3;
  //          player.gold += 6;
  //          player.chargePower(6);
  //        }
  //      }
  //
  //      if(lane == 5){
  //        if(level == 1) player.income.science += 1;
  //        if(level == 2) player.income.science += 1;
  //        if(level == 3) player.income.science += 1;
  //        if(level == 4) player.income.science += 1;
  //        if(level == 5){
  //          player.income.science -= 4;
  //          player.science += 9;
  //        }
  //      }
  //

    //   }
    //   if(level == 4){
    //     player.gaiaformer += 1;
    //     player.cost.convertGaia = 3;
    //   }
    //   if(level == 5) player.VP += 4 + 1 * player.numGaia;
    // }
    //
    // if(lane == 4){
    //   if(level == 1){
    //     player.income.gold += 2;
    //     player.income.charge += 1;
    //   }
    //   if(level == 2){
    //     player.income.ore += 1;
    //     player.income.charge += 1;
    //   }
    //   if(level == 3){
    //     player.income.gold += 1;
    //     player.income.charge += 1;
    //   }
    //   if(level == 4){
    //     player.income.ore += 1;
    //     player.income.gold += 1;
    //     player.income.charge += 1;
    //   }
    //   if(level == 5){
    //     player.income.ore -= 2;
    //     player.income.gold -= 4;
    //     player.income.charge -= 4;
    //     player.ore += 3;
    //     player.gold += 6;
    //     player.chargePower(6);
    //   }
    // }
    //
    // if(lane == 5){
    //   if(level == 1) player.income.science += 1;
    //   if(level == 2) player.income.science += 1;
    //   if(level == 3) player.income.science += 1;
    //   if(level == 4) player.income.science += 1;
    //   if(level == 5){
    //     player.income.science -= 4;
    //     player.science += 9;
    //   }
    // }

  }
}

export default Tech;
