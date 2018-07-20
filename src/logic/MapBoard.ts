import {Hex} from './Hex'
import {Planet} from './Planet'

class MapBoard {
  // private spaces : Hex[]
  // private planets: Planet[]

  constructor(public size: number = 10){
    // this.spaces = []
    // this.planets = []

    // generate the tiles
    // place planets on tiles
    // randomly arrange the tiles into an acceptable configuration
    // (no two planets of the same type adjacent, except TransDim)
  }

  public getPlanet(x: number, y:number, z:number): Planet|void {
    // if there's a planet in that spot, return it to the caller
    // otherwise return void or maybe throw an exception
  }

  // setup map for player
  public setup(playerNumber: number){

  }
}

export {Hex, MapBoard};
