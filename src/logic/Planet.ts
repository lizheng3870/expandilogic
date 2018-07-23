import {StructureType} from "./Structure"
import {Player} from "./Player"
import {Hex as Location} from "./Hex"

enum PlanetType{
  Red,
  Orange,
  Yellow,
  Green,
  Blue,
  Purple,
  Brown,
  White,
  Black,
  Lost,
  Gaiaformer
}

class Planet{
  public building: StructureType[]
  public type : PlanetType
  public loc : Location
  public playerID: number
//  public type : PlanetType
  constructor(loc: Location, type : PlanetType){
    this.type = type
    this.loc = loc
    this.playerID = -1;  // not building on it 
  }

  public terraformingCalculate(player: Player){
    if(this.type === PlanetType.Purple){
      console.log("Transdim, need  gaia project ");
      return 1000000;
    }

    if(this.type === PlanetType.Green){
      console.log("Gaia planet need one QIC");
      return 0;
    }

    if(this.type === PlanetType.Gaiaformer){  // Gaiaformer
      console.log("nice Gaiaformer, no terraforming cost");
      return 0;
    }

     let distance = Math.abs(this.type - player.planetType);
     if(distance > 3) {
        distance = 3 - (distance -4)
     }
     return distance
  }

}

export {Planet, PlanetType}
