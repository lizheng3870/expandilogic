import {Planet} from './Planet'
import { Benefit } from './Benefit';


// enum Fed{
//   12vp,
//   8vp1qic,
//   8vp2pw,
//   7vp2ore,
//   7vp6gold,
//   6vp2klgs,
//   1ore1klg2gold
// }

// todo rename a better name like VP VP
enum Fed{
  vp12,
  vp8qic1,
  vp8pw2,
  vp7ore2,
  vp7gold6,
  vp62klgs,
  ore1klg1gold2
}

/*
  Players create Federations by passing in a list of planets
  the Planets each know what kind of Building is on it and who owns it
  
*/
class Federation {
  public used: boolean = false
  public benefit: Benefit
  public planets: Planet[]
  public satellites: Satellites[]

  constructor(planets: Planet[], benefit: Benefit){
    this.planets = planets
    this.benefit = benefit
    // if this is the 12-pt federation, mark it as spent immediately
    
  }
  // use the federation to go into the top spot on a tech track
  spend (){
    if (this.used){
      throw new Error (`can't spend a federation twice`)
    } else {
      this.used = true
    }
  }
  // return the total number of buildings in the federation
  getTotalBuildings(): number{
    return this.planets.length
  }

  getTotalPower(): number{
    let sum = 0
    this.planets.forEach(p => {
      sum += p.type
    })
    return sum
  }
}

export {Federation, Fed};
