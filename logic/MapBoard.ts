import { GridGenerator, HexGrid, Layout, Path, Text, Hexagon, Pattern, HexUtils, Hex } from 'react-hexgrid';
import {Planet, PlanetType} from './Planet'




class MapBoard {
  private spaces : Hex[]
  private planets: Planet[]

  constructor(){

  }

  public getHex(q, r){
    return new Hex(q, r, -q-r)
  }

  public createNewMap(){
  //  var spaces19 = GridGenerator.spiral(2);
    const centers = [];
    centers[0] = this.getHex(0, 0);
    centers[1] = this.getHex(2, 3);
    centers[2] = this.getHex(5, -2);
    centers[3] = this.getHex(-5, 2);
    centers[4] = this.getHex(-3, 5);
    centers[5] = this.getHex(-8, 7);
    centers[6] = this.getHex(7, 1);
    centers[7] = this.getHex(4, 6);
    centers[8] = this.getHex(-1, 8);
    centers[9] = this.getHex(-6, 10);



    const spaces0 = GridGenerator.spiral(centers[0], 2);

    spaces0[0].plant = 'plant1';
    spaces0[5].plant = 'plant2';
    spaces0[9].plant = 'plant3';
    this.randomRotation(spaces0)


    const spaces1 = GridGenerator.spiral(centers[1], 2);
    spaces1[2].plant = 'plant1';
    spaces1[3].plant = 'plant2';
    spaces1[10].plant = 'plant3';
    this.randomRotation(spaces1)



    const spaces2 = GridGenerator.spiral(centers[2], 2);
    spaces2[10].plant = 'plant1';
    spaces2[15].plant = 'plant2';
    spaces2[17].plant = 'plant3';
    this.randomRotation(spaces2)


    // var spaces3 = GridGenerator.spiral(centers[3], 2);
    // spaces3[3].plant = 'plant1';
    // spaces3[8].plant = 'plant2';
    // spaces3[13].plant = 'plant3';
    // this.randomRotation(spaces3)
    //
    //
    // var spaces4 = GridGenerator.spiral(centers[4], 2);
    // spaces4[3].plant = 'plant1';
    // spaces4[12].plant = 'plant2';
    // spaces4[9].plant = 'plant3';
    // this.randomRotation(spaces4)
    //
    // var spaces5 = GridGenerator.spiral(centers[5], 2);
    // spaces5[4].plant = 'plant1';
    // spaces5[8].plant = 'plant2';
    // spaces5[16].plant = 'plant3';
    // this.randomRotation(spaces5);
    //
    //
    // var spaces6 = GridGenerator.spiral(centers[6], 2);
    // spaces6[12].plant = 'plant1';
    // spaces6[14].plant = 'plant2';
    // spaces6[1].plant = 'plant3';
    // this.randomRotation(spaces6);
    //
    //
    // var spaces7 = GridGenerator.spiral(centers[7], 2);
    // spaces7[0].plant = 'plant1';
    // spaces7[3].plant = 'plant2';
    // spaces7[7].plant = 'plant3';
    // this.randomRotation(spaces7)
    //
    //
    // var spaces8 = GridGenerator.spiral(centers[8], 2);
    // spaces8[3].plant = 'plant1';
    // spaces8[8].plant = 'plant2';
    // spaces8[13].plant = 'plant3';
    // this.randomRotation(spaces8)
    //
    // var spaces9 = GridGenerator.spiral(centers[9], 2);
    // spaces9[3].plant = 'plant1';
    // spaces9[9].plant = 'plant2';
    // spaces9[15].plant = 'plant3';
    // this.randomRotation(spaces9)
    //
    //
    let spaces = spaces0.concat(spaces1);
    spaces = spaces.concat(spaces2);
    // spaces = spaces.concat(spaces3);
    // spaces = spaces.concat(spaces4);
    // spaces = spaces.concat(spaces5);
    // spaces = spaces.concat(spaces6);
    // spaces = spaces.concat(spaces7);
    // spaces = spaces.concat(spaces8);
    // spaces = spaces.concat(spaces9);

    this.spaces = spaces;
    return spaces;

  }

  /*
   *  todo
   *  update mind to station, for hasNeighboring for 3 Gold or 6 Gold
   *  hex is location pid, is playerID
   */
  public hasNeighboring(hex, pid){
    for(let i = 0; i < this.spaces.length; i++){
      //
        const curHex = Hex(0, 0, 0) // todo this.planets[i].hex;
        const d = HexUtils.distance(curHex, hex);
        if(d <= 2) {
          const planet = curHex.planet;
          if(planet.playerID >= 0 && planet.playerID !== pid){
            return true;
          }
        }



    }
    return false;

  }

  // todo hex
  public updateBuiding(hex, sid){

  }


  public randomRotation(spaces){
    const value = Math.floor(Math.random() * 6);
    for(let i = 0; i < value; i++){
      spaces = this.spacesRotation(spaces);
    }
  }

  public spacesRotation(spaces){
    const spacesRotation = [];
    for (let i = 0; i < spaces.length; i++) {
        spacesRotation[i] = this.getRotationHex(spaces[i]);
    }
    return spacesRotation;
  }

  public getRotationHex(a){
    const hex =  new Hex(-a.s, -a.q, -a.r);
    hex.plant = a.plant;
    return hex;
  }


  // todo
   public checkPlanetEmpty(hex){
     return true;
   }




  public buildMine(board, player){

  }

 //todo
  public getPlanet(hex){
    return new Planet(Hex(0,0,0), PlanetType.Red)
  }



}

export {Hex, MapBoard};
