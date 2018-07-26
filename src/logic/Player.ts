import {Terrans} from './Races/Terrans'
import {Nevlas} from './Races/Nevlas'
import {HadschHallas} from './Races/HadschHallas'
import {Xenos} from './Races/Xenos'
//add 10 races
import {Lantids} from './Races/Lantids'
import {Gleens} from './Races/Gleens'
import {Taklons} from './Races/Taklons'
import {Ambas} from './Races/Ambas'
import {Itars} from './Races/Itars'
import {Ivits} from './Races/Ivits'
import {Geodens} from './Races/Geodens'
import {Baltaks} from './Races/Baltaks'
import {Firaks} from './Races/Firaks'
import {Bescods} from './Races/Bescods'

import {RaceType} from './Race'

export {RaceType}   // from race


export type Player = Terrans | Xenos | Nevlas | HadschHallas | Lantids | Gleens | Taklons
| Ambas | Itars | Ivits | Geodens | Baltaks | Firaks | Bescods


export function CreatePlayer(name: string, raceType:RaceType):Player{
  let player = new Terrans("");
  if(raceType === RaceType.Terrans){ //blue
    player = new Terrans(name);
  }


  if(raceType === RaceType.Xenos ){
      player = new Xenos(name);
  }


  if(raceType === RaceType.HadschHallas){
      player = new HadschHallas(name);
  }

  if(raceType === RaceType.Nevlas){
      player = new Nevlas(name);
  }

 // add new 10
  if(raceType === RaceType.Lantids){ //blue
    player = new Lantids(name);
  }


  if(raceType === RaceType.Gleens ){
      player = new Gleens(name);
  }


  if(raceType === RaceType.Taklons){
      player = new Taklons(name);
  }

  if(raceType === RaceType.Ambas){
      player = new Ambas(name);
  }

  if(raceType === RaceType.Itars){ //blue
    player = new Itars(name);
  }


  if(raceType === RaceType.Ivits ){
      player = new Ivits(name);
  }


  if(raceType === RaceType.Geodens){
      player = new Geodens(name);
  }

  if(raceType === RaceType.Baltaks){
      player = new Baltaks(name);
  }

  if(raceType === RaceType.Firaks){ //blue
    player = new Firaks(name);
  }


  if(raceType === RaceType.Bescods ){
      player = new Bescods(name);
  }

  return player
}
