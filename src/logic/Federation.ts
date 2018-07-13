import {Benefit} from './Benefit'
import {Planet} from './Planet'
import {Hex} from './Hex'

class Federation {
  public used: boolean = false;
  public satellites: Hex[]

  constructor(public planets: Planet[], public benefit: Benefit){
    //total 7 kinds of federation
    this.planets = planets;
    this.benefit = benefit;
  }
  
  // use the federation to go into the top spot on a tech track
  public spend(): void{
    if (this.used){
      throw new Error ("can't spend a federation twice");
    } else {
      this.used = true;
    }
  }

  // add a planet with our building on it into this federation
  // this happens when building on a planet that touches an existing federation
  public addPlanet(p: Planet): void{
    this.planets.push(p)
  }

  // return total number of satellites
  public getTotalSatellites(): number{
    return this.satellites.length
  }

  // return the total number of buildings in the federation
  public getTotalBuildings(): number{
    return this.planets.length;
  }

  public getTotalPower(): number{
    let sum = 0;
    this.planets.forEach(p => {
      sum += p.type;
    })
    return sum;
  }
}

export {Federation}
