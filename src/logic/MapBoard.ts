import {Hex} from './Hex'
import {Planet, PlanetType} from './Planet'
import {Config} from './Game'
import {StructureType} from './Structure'


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
    let spaces:Space[] = [];
    for(let hex of hexs){
        spaces.push(new Space(hex))
    }
    return spaces;
  }

  public setPlanetType(type: PlanetType){
    this.planet = new Planet(this.hex, type);
  }


}


class MapBoard {
   public spaces : Space[]
   public planets: Planet[]
   public planetsMap: Map<Hex, Planet|null>
   public spacesMap: Map<Hex, Space>

  constructor(public size: number = 10){
     this.spaces = []
     this.planets = []
     this.planetsMap  = new Map<Hex, Planet|null>();
     this.spacesMap  = new Map<Hex, Space>();

    //  generate the tiles
    // place planets on tiles
    // randomly arrange the tiles into an acceptable configuration
    // (no two planets of the same type adjacent, except TransDim)
    this.setup(Config.PlayerLimit)
  }

  public getPlanet(hex: Hex): Planet{
    // if there's a planet in that spot, return it to the caller
    // otherwise return void or maybe throw an exception
    let planet =  this.planetsMap.get(hex)
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
        var centers = [];
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

        var spaces0 = Space.spiral(centers[0], 2);
        spaces0[0].setPlanetType(PlanetType.Blue);
        spaces0[5].setPlanetType(PlanetType.Orange);
        spaces0[8].setPlanetType(PlanetType.Red);
        this.randomRotation(spaces0);

        var spaces1 = Space.spiral(centers[1], 2);

        this.randomRotation(spaces1);

        var spaces2 = Space.spiral(centers[2], 2);

        this.randomRotation(spaces2);

        var spaces3 = Space.spiral(centers[3], 2);

        this.randomRotation(spaces3)


        var spaces4 = Space.spiral(centers[4], 2);

        this.randomRotation(spaces4)

        var spaces5 = Space.spiral(centers[5], 2);

        this.randomRotation(spaces5);


        var spaces6 = Space.spiral(centers[6], 2);

        this.randomRotation(spaces6);


        var spaces7 = Space.spiral(centers[7], 2);

        this.randomRotation(spaces7)


        var spaces8 = Space.spiral(centers[8], 2);

        this.randomRotation(spaces8)

        var spaces9 = Space.spiral(centers[9], 2);

        this.randomRotation(spaces9)


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
          this.planetsMap.set(space.hex, space.planet)
          this.spacesMap.set(space.hex, space)
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
        const planet = this.getPlanet(h);
        if(planet !==null && planet.playerID >= 0 && planet.playerID !== playerID){
          return true;
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
    let planet =  this.planetsMap.get(hex)
    if(planet === undefined || planet === null) {
      return false
    }
    else return true;


  }


  public checkSpaceFeded(hexs:Hex[]): boolean{ // check federation ocuppied before or not
      for(const hex of hexs){
        let space = this.spacesMap.get(hex);
        if(space == null)return false;
        if(space.feded === true)return false;
      }
      return true;
  }

  public markSpaceFeded(hexs:Hex[]){ // federation ocuppy space, can not use anymore
    for(const hex of hexs){
      let space = this.spacesMap.get(hex);
      if(space == null)return;
      space.feded = true;
    }
  }



}

export {Hex, MapBoard};
