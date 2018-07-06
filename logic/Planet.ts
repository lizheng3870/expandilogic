import {Structure, Building} from "./Structure"
import Player from "./Player"

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
  public building: Structure[]
  public type : PlanetType
  public loc : Location
//  public type : PlanetType
  constructor(loc: Location, type : PlanetType){
    this.type = type
    this.loc = loc
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

  }

}

export {Planet, PlanetType}
