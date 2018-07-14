import {Exchange} from './Exchange'
import {MapBoard} from './MapBoard'
import TechBoard from './TechBoard'
import { Player } from './Player'
import { Benefit } from './Benefit'

enum Phase {
  Income,
  Gaiaforming,
  Actions
}

enum GameStatus{
  Open,
  Setup,
  Playing,
  Scoring,
  Over
}

enum Config{
  PlayerLimit = 4
}

class Game {
    public round: number;
    public players: Player[] = []
    public nextRound: Player[] = []
    public turn: number
    public phase: Phase
    public status: GameStatus
    public board: MapBoard
    public techBoard: TechBoard
    public roundBoosters: Benefit[] = []
    public exchange: Exchange

    constructor(gid: number){
      // console.log(`creating game ${gid}`)
     this.round = 1;
     this.turn = 0;  // start from 0;
     this.phase = Phase.Income;
     this.status = GameStatus.Open
     this.board = new MapBoard()
     this.techBoard = new TechBoard();
     this.exchange = new Exchange();

   }

   public addPlayer(player: Player): boolean{
     if (this.players.length === Config.PlayerLimit){
       throw new Error(`Config.PlayerLimit (${Config.PlayerLimit}) reached`)
     } else {
       // check for another player of the same race
      //  console.log(`${this.players.length} players`)
       let sameRace = this.players.findIndex(p => p.race === player.race)
       if (player.race !== null && sameRace !== -1){
          throw new Error(`a player already exists with that raceType: ${player.race}/${this.players[sameRace]}`)
       }
       this.players.push(player)
       player.pid = this.players.length - 1
     }
     if(this.players.length === Config.PlayerLimit){
      // if we have the max number of players, automatically start the game
      this.status = GameStatus.Setup;
      this.start();
    }
     return true;
   }

   public start(){
   }

   public nextTurn(){
     if(this.players.length === 0){
       this.endRound();
       this.newRound();
     }else{
      this.turn++
      if (this.turn >= this.players.length){
        this.turn = 0
      }
     }
   }

   public endRound(){
     this.round++;
     this.turn = 0;
     
     const tmp = this.players
     this.players = this.nextRound
     this.nextRound = tmp

   }

   public newRound(){
     this.IncomePhase();
   }

   public IncomePhase(){

     for(let i = 0; i < 4; i++ ){
      this.calculateIncome(this.players[i]);
     }

   }

   public calculateIncome(player: Player){
     
   }


}


export {Game, GameStatus, Phase}
