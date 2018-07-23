import {StructureType} from "./Structure"
import {Player} from "./Player"
import {Hex as Location} from "./Hex"

enum PlanetType{
  Red,
  Orange,
  Yellow,
  Gaia,  // green
  Transdim, // purple
  Blue,
  Brown,
  White,
  Black,
  Lost,
  Gaiaformer
}

class Planet{
  public building: StructureType // change from StructureType[] to StructureType without concern specail race.
  public type : PlanetType
  public loc : Location
  public playerID: number
//  public type : PlanetType
  constructor(loc: Location, type : PlanetType){
    this.type = type
    this.loc = loc
    this.playerID = -1;  // not building on it
  }

 // PlanetType of race vs PlanetType of planet
  public terraformingCalculate(type: PlanetType){
    if(type === PlanetType.Transdim){
      console.log("Transdim, need  gaia project ");
      return 1000000;
    }

    if(type === PlanetType.Gaia){
      console.log("Gaia planet need one QIC");
      return 0;
    }

    if(type === PlanetType.Gaiaformer){  // Gaiaformer
      console.log("nice Gaiaformer, no terraforming cost");
      return 0;
    }

     let distance = Math.abs(this.type - type);
     if(distance > 3) {
        distance = 3 - (distance -4)
     }
     return distance
  }

}

export {Planet, PlanetType}
