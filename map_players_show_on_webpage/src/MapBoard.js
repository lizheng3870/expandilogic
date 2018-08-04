import { GridGenerator, HexGrid, Layout, Path, Text, Hexagon, Pattern, HexUtils, Hex } from 'react-hexgrid';

const PlanetType = {
  Blue   : 0,
  Red    : 1,
  Orange : 2,
  Yellow : 3,
  Brown  : 4,
  Black  : 5,
  White  : 6,
  Lost : 7,
  Gaia : 8,  // green
  Transdim : 9, // purple
  Gaiaformer : 10
}


class MapBoard {
  constructor(){
    this.spaces = [];

  }

  getHex(q, r){
    return new Hex(q, r, -q-r)
  }

  createNewMap(){
  //  var spaces19 = GridGenerator.spiral(2);
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



    var spaces0 = GridGenerator.spiral(centers[0], 2);

    spaces0[0].planet = 'blue';
    spaces0[5].planet = 'red';
    spaces0[9].planet = 'yellow';
    this.randomRotation(spaces0)


    var spaces1 = GridGenerator.spiral(centers[1], 2);
    spaces1[2].planet = 'yellow';
    spaces1[3].planet = 'gaia';
    spaces1[10].planet = 'gaia';
    this.randomRotation(spaces1)



    var spaces2 = GridGenerator.spiral(centers[2], 2);
    spaces2[10].planet = 'white';
    spaces2[15].planet = 'white';
    spaces2[17].planet = 'black';
    this.randomRotation(spaces2)


    var spaces3 = GridGenerator.spiral(centers[3], 2);
    spaces3[3].planet = 'planet1';
    spaces3[8].planet = 'planet2';
    spaces3[13].planet = 'planet3';
    this.randomRotation(spaces3)


    var spaces4 = GridGenerator.spiral(centers[4], 2);
    spaces4[3].planet = 'planet1';
    spaces4[12].planet = 'planet2';
    spaces4[9].planet = 'planet3';
    this.randomRotation(spaces4)

    var spaces5 = GridGenerator.spiral(centers[5], 2);
    spaces5[4].planet = 'planet1';
    spaces5[8].planet = 'planet2';
    spaces5[16].planet = 'planet3';
    this.randomRotation(spaces5);


    var spaces6 = GridGenerator.spiral(centers[6], 2);
    spaces6[12].planet = 'planet1';
    spaces6[14].planet = 'planet2';
    spaces6[1].planet = 'planet3';
    this.randomRotation(spaces6);


    var spaces7 = GridGenerator.spiral(centers[7], 2);
    spaces7[0].planet = 'planet1';
    spaces7[3].planet = 'planet2';
    spaces7[7].planet = 'planet3';
    this.randomRotation(spaces7)


    var spaces8 = GridGenerator.spiral(centers[8], 2);
    spaces8[3].planet = 'planet1';
    spaces8[8].planet = 'planet2';
    spaces8[13].planet = 'planet3';
    this.randomRotation(spaces8)

    var spaces9 = GridGenerator.spiral(centers[9], 2);
    spaces9[3].planet = 'planet1';
    spaces9[9].planet = 'planet2';
    spaces9[15].planet = 'planet3';
    this.randomRotation(spaces9)


     var spaces = spaces0.concat(spaces1);
    // spaces = spaces.concat(spaces2);
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


  hasNeighboring(hex, pid){
    for(let i = 0; i < this.spaces.length; i++){
      let curHex = this.planets[i].hex;
      let d = HexUtils.distance(curHex, hex);
      if(d <= 2) {
        var planet = curHex.planet;
        if(planet.playerID >= 0 && planet.playerID != pid){
          return true;
        }
      }
    }
    return false;

  }

  // todo hex
  updateBuiding(hex, sid){

  }


  randomRotation(spaces){
    var value = Math.floor(Math.random() * 6);
    for(let i = 0; i < value; i++){
      spaces = this.spacesRotation(spaces);
    }
  }

  spacesRotation(spaces){
    var spaces_rotation = [];
    var i
    for (i = 0; i < spaces.length; i++) {
        spaces_rotation[i] = this.getRotationHex(spaces[i]);
    }
    return spaces_rotation;
  }

  getRotationHex(a){
    var hex =  new Hex(-a.s, -a.q, -a.r);
    hex.planet = a.planet;
    return hex;
  }


  // todo
   checkPlanetEmpty(hex){
     return true;
   }




  buildMine(board, player){

  }

  static  loadDataFromFirebase(rows){
    let data = [];
    for(let i = 0; i < rows.length ; i++ ){
      let item = rows[i];
      var hex =  new Hex(item.q, item.r, item.s);
      if(item.planet !== null){
        /*
        Blue   = 0,
        Red    = 1,
        Orange = 2,
        Yellow = 3,
        Brown  = 4,
        Black  = 5,
        White  = 6,
        Lost,
        Gaia,  // green
        Transdim, // purple
        Gaiaformer
        */
        if(item.planet === PlanetType.Blue){
          hex.planet = 'blue'
        }

        if(item.planet === PlanetType.Red){
          hex.planet = 'red'
        }

        if(item.planet === PlanetType.Orange){
          hex.planet = 'orange'
        }

        if(item.planet === PlanetType.Yellow){
          hex.planet = 'yellow'
        }

        if(item.planet === PlanetType.Brown){
          hex.planet = 'brown'
        }

        if(item.planet === PlanetType.Black){
          hex.planet = 'black'
        }

        if(item.planet === PlanetType.White){
          hex.planet = 'white'
        }

        if(item.planet === PlanetType.Gaia){
          hex.planet = 'gaia'
        }

        if(item.planet === PlanetType.Transdim){
          hex.planet = 'purple'
        }

        if(item.playerID !== -1){
          let color = "blue"
          if(item.playerID === 0 ){
            color = "blue"
          }

          if(item.playerID === 1 ){
            color = "yellow"
          }

          if(item.playerID === 2 ){
            color = "red"
          }

          if(item.playerID === 3 ){
            color = "white"
          }

          let building = "mine"
          if(item.building === 0 ){
            building = "mine"
          }

          if(item.building === 1 ){
            building = "station"
          }

          if(item.building === 2 ){
            building = "lab"
          }


         // planet has building
         hex.planet = color + building;


        }

          data.push(hex);
      }




    }

      return data;

  }



}

export default MapBoard;
