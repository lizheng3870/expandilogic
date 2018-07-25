import {Terrans} from './Races/Terrans'
import {Nevlas} from './Races/Nevlas'
import {HadschHallas} from './Races/HadschHallas'
import {Xenos} from './Races/Xenos'
import {RaceType} from './Race'



export type Player = Terrans | Xenos | Nevlas |  HadschHallas


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
  return player
}
