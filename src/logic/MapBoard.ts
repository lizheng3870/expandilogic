import {Hex} from './Hex'
import {Planet, PlanetType} from './Planet'
import {Config} from './Game'
import {StructureType} from './Structure'
import { Player } from './Player';


interface SpaceJSON {
  q:       number;
  r:       number;
  s:       number;
  planet:  number;
  playerID: number;
  building: number;
}

class Space {
  public hex:Hex
  public planet:Planet|null
  public feded: boolean// federation path occupy
  constructor(hex:Hex){
    this.hex = hex
    this.planet = null
    this.feded = false
  }

  public static spiral(center: Hex, radius:number){
    const hexs = Hex.spiral(center, radius);
    //console.log("center" + center.toString())
    let spaces:Space[] = [];
    for(let hex of hexs){
        spaces.push(new Space(hex))
    }
    //console.log(spaces)
    return spaces;
  }

  public setPlanetType(type: PlanetType){
    this.planet = new Planet(this.hex, type);
  }


}


class MapBoard {
   public centers: Hex[]
   public spaces : Space[]
   public planets: Planet[]
   public planetsMap: Map<string, Planet|null>
   public spacesMap: Map<string, Space>

  constructor(public size: number = 10){
     this.spaces = []
     this.planets = []
     this.planetsMap  = new Map<string, Planet|null>();
     this.spacesMap  = new Map<string, Space>();

    //  generate the tiles
    // place planets on tiles
    // randomly arrange the tiles into an acceptable configuration
    // (no two planets of the same type adjacent, except TransDim)
    this.setup(Config.PlayerLimit)
  }

  public getPlanet(hex: Hex): Planet{
    // if there's a planet in that spot, return it to the caller
    // otherwise return void or maybe throw an exception
    let key:string = hex.q + '_' + hex.r + '_' + hex.s;
    let planet =  this.planetsMap.get(key)
    if(planet === undefined || planet === null) {
      throw new Error("getPlanet error not planet at hex " + hex.toString())
    }
    else return planet;


  }

  public getHex(q:number, r:number){
    return new Hex(q, r, -q-r)
  }

  // setup map for player
  public setup(playerNumber: number){
        let centers = [];
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
       

        this.centers = centers;

        var spaces0 = Space.spiral(centers[0], 2);


        //spaces0[0].setPlanetType(PlanetType.Blue);
        //spaces0[2].setPlanetType(PlanetType.Transdim);
        spaces0[4].setPlanetType(PlanetType.Blue);
        spaces0[6].setPlanetType(PlanetType.Brown);
        spaces0[9].setPlanetType(PlanetType.Red);
        spaces0[10].setPlanetType(PlanetType.Orange);
        spaces0[12].setPlanetType(PlanetType.Transdim);
        spaces0[18].setPlanetType(PlanetType.Yellow);
       // spaces0[5].setPlanetType(PlanetType.White);
      //  spaces0[8].setPlanetType(PlanetType.Red);
       // console.log(spaces0)
       // this.randomRotation(spaces0);
        var spaces1 = Space.spiral(centers[1], 2);


       // spaces1[0].setPlanetType(PlanetType.Yellow);
          spaces1[3].setPlanetType(PlanetType.White);
          spaces1[6].setPlanetType(PlanetType.Gaia);
          spaces1[8].setPlanetType(PlanetType.Blue);
          spaces1[9].setPlanetType(PlanetType.Yellow);
          spaces1[12].setPlanetType(PlanetType.Black);
          spaces1[15].setPlanetType(PlanetType.Transdim);
      //  spaces1[1].setPlanetType(PlanetType.Yellow);
      //  spaces1[2].setPlanetType(PlanetType.Gaia);
      //  spaces1[3].setPlanetType(PlanetType.Yellow);
      //  spaces1[4].setPlanetType(PlanetType.Transdim);
      //  spaces1[5].setPlanetType(PlanetType.White);
       //  spaces1[8].setPlanetType(PlanetType.Red);

        // this.randomRotation(spaces1);
        //
        var spaces2 = Space.spiral(centers[2], 2);

        //spaces2[0].setPlanetType(PlanetType.Red);
        spaces2[6].setPlanetType(PlanetType.Gaia);
        spaces2[8].setPlanetType(PlanetType.Orange);
        spaces2[9].setPlanetType(PlanetType.Yellow);
        spaces2[12].setPlanetType(PlanetType.Red);
        spaces2[13].setPlanetType(PlanetType.Transdim);
        spaces2[15].setPlanetType(PlanetType.White);
       // spaces2[1].setPlanetType(PlanetType.Red);
       // spaces2[3].setPlanetType(PlanetType.Gaia);
       // spaces2[5].setPlanetType(PlanetType.White);
       // spaces2[8].setPlanetType(PlanetType.Transdim);
        //
        //
        // this.randomRotation(spaces2);
        var spaces3 = Space.spiral(centers[3], 2);
      //  console.log(spaces3)
       // spaces3[0].setPlanetType(PlanetType.White);
       spaces3[3].setPlanetType(PlanetType.Gaia);
       spaces3[6].setPlanetType(PlanetType.Yellow);
       spaces3[7].setPlanetType(PlanetType.Blue);
       spaces3[8].setPlanetType(PlanetType.Red);
       spaces3[13].setPlanetType(PlanetType.Transdim);
       spaces3[14].setPlanetType(PlanetType.Transdim);
       // spaces3[1].setPlanetType(PlanetType.White);
       // spaces3[3].setPlanetType(PlanetType.Transdim);
       // spaces3[4].setPlanetType(PlanetType.Red);
       // spaces3[5].setPlanetType(PlanetType.Yellow);
       // spaces3[8].setPlanetType(PlanetType.Gaia);
        //
        // this.randomRotation(spaces3)
        //
        //
        var spaces4 = Space.spiral(centers[4], 2);

        spaces4[1].setPlanetType(PlanetType.Brown);
        spaces4[4].setPlanetType(PlanetType.White);
        spaces4[8].setPlanetType(PlanetType.Red);
        spaces4[10].setPlanetType(PlanetType.Transdim);
        spaces4[12].setPlanetType(PlanetType.Yellow);
        spaces4[15].setPlanetType(PlanetType.Black);
        spaces4[16].setPlanetType(PlanetType.Orange);
       // spaces4[0].setPlanetType(PlanetType.Gaia);
       // spaces4[2].setPlanetType(PlanetType.Red);
        //
        // this.randomRotation(spaces4)
        //
         var spaces5 = Space.spiral(centers[5], 2);
       //  spaces5[7].setPlanetType(PlanetType.Yellow);
       spaces5[1].setPlanetType(PlanetType.Black);
       spaces5[3].setPlanetType(PlanetType.Gaia);
       spaces5[7].setPlanetType(PlanetType.Brown);
       spaces5[13].setPlanetType(PlanetType.White);
       spaces5[14].setPlanetType(PlanetType.Transdim);
       spaces5[16].setPlanetType(PlanetType.Orange);
      //   spaces5[3].setPlanetType(PlanetType.Red);
       //  spaces5[4].setPlanetType(PlanetType.Gaia);
        //
        // this.randomRotation(spaces5);
        //
        //
         var spaces6 = Space.spiral(centers[6], 2);
       //  spaces6[3].setPlanetType(PlanetType.Yellow);
       spaces6[2].setPlanetType(PlanetType.Gaia);
       spaces6[4].setPlanetType(PlanetType.Blue);
       spaces6[6].setPlanetType(PlanetType.Brown);
       spaces6[10].setPlanetType(PlanetType.Transdim);
       spaces6[11].setPlanetType(PlanetType.Yellow);
       spaces6[14].setPlanetType(PlanetType.Transdim);
       //  spaces6[4].setPlanetType(PlanetType.Transdim);
        //
        // this.randomRotation(spaces6);
        //
        //
         var spaces7 = Space.spiral(centers[7], 2);
       //  spaces7[3].setPlanetType(PlanetType.Yellow);
       spaces7[1].setPlanetType(PlanetType.Gaia);
       spaces7[3].setPlanetType(PlanetType.Gaia);
       spaces7[5].setPlanetType(PlanetType.Red);
       spaces7[9].setPlanetType(PlanetType.Black);
       spaces7[14].setPlanetType(PlanetType.Brown);
       spaces7[17].setPlanetType(PlanetType.Transdim);
       //  spaces7[4].setPlanetType(PlanetType.Transdim);
        // spaces7[0].setPlanetType(PlanetType.Blue);
        //
        // this.randomRotation(spaces7)
        //
        //
         var spaces8 = Space.spiral(centers[8], 2);
       //  spaces8[0].setPlanetType(PlanetType.Gaia);
       spaces8[1].setPlanetType(PlanetType.Orange);
       spaces8[3].setPlanetType(PlanetType.Brown);
       spaces8[5].setPlanetType(PlanetType.Red);
       spaces8[11].setPlanetType(PlanetType.Blue);
       spaces8[15].setPlanetType(PlanetType.Black);
       spaces8[18].setPlanetType(PlanetType.White);
        // spaces8[2].setPlanetType(PlanetType.Red);
        // spaces8[3].setPlanetType(PlanetType.Red);
        //
        // this.randomRotation(spaces8)
        //
         var spaces9 = Space.spiral(centers[9], 2);
        // spaces9[3].setPlanetType(PlanetType.Yellow);
        spaces9[1].setPlanetType(PlanetType.Orange);
        spaces9[3].setPlanetType(PlanetType.Black);
        spaces9[5].setPlanetType(PlanetType.White);
        spaces9[8].setPlanetType(PlanetType.Transdim);
        spaces9[13].setPlanetType(PlanetType.Transdim);
        spaces9[15].setPlanetType(PlanetType.Blue);
       //  spaces9[4].setPlanetType(PlanetType.Transdim);
        //
        // this.randomRotation(spaces9)
        //
          var spaces = spaces0.concat(spaces1);
         spaces = spaces.concat(spaces2);
         spaces = spaces.concat(spaces3);
         spaces = spaces.concat(spaces4);
         spaces = spaces.concat(spaces5);
         spaces = spaces.concat(spaces6);
         spaces = spaces.concat(spaces7);
         spaces = spaces.concat(spaces8);
         spaces = spaces.concat(spaces9);
        this.spaces = spaces;

        for(let space of spaces){
          let hex = space.hex
          let key:string = hex.q + '_' + hex.r + '_' + hex.s
          this.planetsMap.set(key, space.planet)
          this.spacesMap.set(key, space)
          if(space.planet != null)
            this.planets.push(space.planet);
        }

        return spaces;


  }

  public randomRotation(spaces: Space[]){
    // return  no rotation
    const value = Math.floor(Math.random() * 6);
    for(let i = 0; i < value; i++){
      spaces = this.spacesRotation(spaces);
    }
  }

  public spacesRotation(spaces: Space[]){
    const spacesRotation = [];
    for (let i = 0; i < spaces.length; i++) {
        spacesRotation[i] = this.getRotationHex(spaces[i]);
    }
    return spacesRotation;
  }

  public getRotationHex(s: Space){
    let a = s.hex
    const hex =  new Hex(-a.s, -a.q, -a.r);
    s.hex = hex;
    return s;
  }

  /*
   *  todo
   *  update mind to station, for hasNeighboring for 3 Gold or 6 Gold
   *  hex is location pid, is playerID
   */
  public hasNeighboring(hex: Hex, playerID: number ){
    let neighborsHex = Hex.spiral(hex, 2); // distance = 2 as neighbor
    for(let h of neighborsHex){
        if(this.hasPlanet(h)){
          const planet = this.getPlanet(h);
          if(planet !==null && planet.playerID >= 0 && planet.playerID !== playerID){
            return true;
          }

        }


    }

    return false;

  }


  public checkPlanetEmpty(hex: Hex){
    const planet = this.getPlanet(hex);
    if(planet !==null && planet.playerID === -1 )return true;
    else return false;
  }


  public buildMine(hex: Hex, playerID : number){
    let planet = this.getPlanet(hex)
    if(planet === null)return;
    planet.playerID = playerID
    planet.building = StructureType.Mine


  }


  public hasPlanet(hex: Hex): boolean{
    // if there's a planet in that spot, return it to the caller
    // otherwise return void or maybe throw an exception
    let key:string = hex.q + '_' + hex.r + '_' + hex.s;
    let planet =  this.planetsMap.get(key)
    if(planet === undefined || planet === null) {
      return false
    }
    else return true;


  }

  public getPlanetsInRange(center:Hex, range:number){
    let planets:Planet[] = [];
    let neighborings = Hex.rangeHexs(center, range)
    for(let hex of neighborings){

      if(this.hasPlanet(hex)){
        let planet = this.getPlanet(hex);
        planets.push(planet);
      }
    }
    return planets;
  }

  public getAvailablePlanetsInRange(range: number, player:Player) {
    let planets: Planet[] = [];
    let playerOwnPlants = player.planets;
    for (let ownPlanet of playerOwnPlants) {
      let center = ownPlanet.loc;
      let neighborings = Hex.rangeHexs(center, range)
      console.log("Center is " + center)
      for (let hex of neighborings) {
        if (this.hasPlanet(hex)) {
          let planet = this.getPlanet(hex);
          if (planet !== null && planet.playerID < 0) {
            planets.push(planet);
          }
        }
      }
    }
    return planets;
  }

  public getAvailableTransdimInRange(range: number, player:Player) {
    let planets: Planet[] = [];
    let playerOwnPlants = player.planets;
    for (let ownPlanet of playerOwnPlants) {
      let center = ownPlanet.loc;
      let neighborings = Hex.rangeHexs(center, range)

      for (let hex of neighborings) {
        if (this.hasPlanet(hex)) {
          let planet = this.getPlanet(hex);
          if (planet !== null && planet.playerID < 0 && planet.type === PlanetType.Transdim) {
            planets.push(planet);
          }
        }
      }
    }
    return planets;
  }

  public checkSpaceFeded(hexs:Hex[]): boolean{ // check federation ocuppied before or not
    // console.log("**************we begin!!****************");
      for(const hex of hexs){
        let key:string = hex.q + '_' + hex.r + '_' + hex.s;
        let space = this.spacesMap.get(key);
        if(space == null){
          // console.log("*********space is null**********")
          return true;
        }
        if(space.feded === true){
          // console.log("**************already feded!!!***************");
          return true;
        }
      }
      return false;
  }

  public markSpaceFeded(hexs:Hex[]){ // federation ocuppy space, can not use anymore
    for(const hex of hexs){
      let key:string = hex.q + '_' + hex.r + '_' + hex.s;
      let space = this.spacesMap.get(key);
      if(space == null)return;
      space.feded = true;
    }
  }


  public getSpace(space:Space):SpaceJSON {

    if(space.planet === null){
      return {
        q: space.hex.q,
        r: space.hex.r,
        s: space.hex.s,
        planet:  null,
        playerID: -1,
        building: null,

      };
    }else if (space.planet.playerID === -1){
      return {
        q: space.hex.q,
        r: space.hex.r,
        s: space.hex.s,
        planet:  space.planet.type,
        playerID: -1,
        building: null,

      };
    }else{
      return {
        q: space.hex.q,
        r: space.hex.r,
        s: space.hex.s,
        planet:  space.planet.type,
        playerID: space.planet.playerID,
        building: space.planet.building,

      };

    }



  }
  public dumpSpace(){
    let data : SpaceJSON[] = []
    for(let space of this.spaces){
      data.push(this.getSpace(space));
    }
    console.log(data)
    return data;
  }

  public getPlayerSectors(playerID:number){
    let count = 0;
    for(let center of  this.centers){
      if(this.checkSectorHasPlayerPlanet(center, playerID))
          count++;
      }
      return count
  }

    public checkSectorHasPlayerPlanet(center : Hex, playerID:number):boolean{
      const hexs = Hex.spiral(center, 2);
      for(let hex of hexs){
        if(this.hasPlanet(hex)){
          let planet = this.getPlanet(hex);
          if(planet.playerID === playerID){
            return true;
          }
        }
      }
      return false;

  }



}

export {Hex, MapBoard};