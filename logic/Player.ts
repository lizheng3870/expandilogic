import {Race, RaceType} from './Race'
import {Planet, PlanetType} from './Planet'
import Tech from './Tech'
import TechTiles from './TechTiles'
import RoundBooster from './RoundBooster'
import {Benefit, Value, Material, Count, Struct, Trigger} from './Benefit'
import {Federation} from './Federation';


 import { GridGenerator, HexGrid, Layout, Path, Text, Hexagon, Pattern, HexUtils, Hex } from 'react-hexgrid';


class Player extends Race {
  public name: string;
  public passed: boolean;
  public roundBooster: RoundBooster;
  public planets: PlanetType[];
  public numGaia: number;
  public techs: Tech[];
  public techTiles: TechTiles[];
  public federations: Federation[];
  public nowBenefits: Benefit[];
  public incomeBenefits: Benefit[];

  constructor(name: string, raceType: RaceType){
    super(raceType);
    this.name = name;
    this.passed = false;
    // this.roundBooster = undefined;
    // this.planetType = 
    this.planets = [];
    this.numGaia = 0;
    this.techs = []
    this.techTiles = [];
    this.federations = [];
    this.pid =  -1;  // pid is player id for example 0 1 2 3
  }

  /*
    @param
    here's what the function does
  */
  // cleanUp(player){ // this for caluclate techtile (federations) vp after round  for player

  // }

  public nearDistance(hex){

    let min = 10000;

    for(let i = 0; i < this.planets.length; i++){
      const d = HexUtils.distance(this.planets[i].hex, hex);
      if(d < min) {
        min = d;
      }
    }
    return min;

  }

  public checkPlanetDistance(hex){
    const distance = this.nearDistance(hex);
    if(this.range >= distance){
      return true;
    }else{
      if(this.range + this.qic * 2 >= distance){
        console.log("checkPlanetDistance OK  but need QIC ");
        return true;
      }
    }

    return false;
  }

}

export {Player};
