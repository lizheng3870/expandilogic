import {Action} from './Action'
import {Exchange} from './Exchange'
import {MapBoard} from './MapBoard'
import RoundBooster from './RoundBooster'
import TechBoard from './TechBoard'
import { Player } from './Player';

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
    public players: Player[]
    public nextRound: Player[]
    public turn: number
    public phase: Phase
    public status: GameStatus
    public board: MapBoard
    public techBoard: TechBoard
    public roundBoosters: RoundBooster[]
    public exchange: Exchange

    constructor(gid: number){
     this.round = 1;
     this.players = [];
     this.turn = 0;  // start from 0;
     this.phase = Phase.Income;
     this.status = GameStatus.Open
     this.board = new MapBoard();
     this.techBoard = new TechBoard();

     this.roundBoosters = [];
     this.exchange = new Exchange();

   }

   public addPlayer(player: Player): boolean{
     if (this.players.length === Config.PlayerLimit){
       return false;
     } else {
       this.players.push(player)
       player.pid = this.players.length - 1;
     }
     if(this.players.length === Config.PlayerLimit){
      this.status = GameStatus.Setup;
      this.start();
    }
     return true;
   }





   public start(){
      // send message to all player
      // wait for take RoundBooter
   }

   public nextTurn(){
     console.log("current round " + this.round + " turn " + this.turn);
     if(this.passed === 4){
       this.endRound();
       this.newRound();
     }

     if(this.turn === 3 && this.phase === 0 && this.round === 1){
       this.phase = 1;
       this.IncomePhase();
       this.phase = 2;
     }
     this.turn++;

     if(this.turn === 4){
       this.turn = 0;
     }

     const player = this.players[this.turn];

     if(player.passed){
       this.nextTurn();
     }
   }

   public endRound(){
     this.round++;
     this.turn = 0;
     for(let i = 0; i < 4; i++){
       this.players[i].passed = false;
     }

   }

   public newRound(){
     this.IncomePhase();
   }

   public IncomePhase(){

     for(let i = 0; i < 4; i++ ){
      this.calculateIncome(this.players[i]);
     }

   }

   public calculateIncome(player){
     player.income.doIncome(player);
   }


   public processRoundRooter(data){
     if(this.phase !== 0) {
       console.log("error phase for processRoundRooter ");
     }
     const player = this.players[data.pid];

     if(data.type === 'roundbooter'){
         const roundBoosterId =  data.roundBoosterID;
         if(player.roundBooster == null && this.roundBoosters[roundBoosterId].valid === true)
         {
           player.roundBooster = this.roundBoosters[roundBoosterId];
           this.roundBoosters[roundBoosterId].valid = false;
         }

     }


     // send to all client;

     this.nextTurn();

   }

   public processRequest(data){
       // console.log(data);
       if(this.phase !== 2) {
         console.log("error phase for processRequest expect 2 real phase:  " + this.phase);
       }

       const player = this.players[data.pid];
       const action = new Action(this, this.board, player, data);
       if(player.pid !== this.turn){
         console.log("pid error "+ player.pid + "   "+ this.turn);
         console.log(data);
         return false;
       }
       if(action.checkValid() === false) {
         console.log("checkvalid ");
         console.log(data);

         return false;
       }
       action.doAction();

       // send to all client;

       this.nextTurn();

   }

  public display(){
    console.log(this.players);

  }

  private loadRoundBooster(){
    for(let i = 0; i < 10; i++){
      this.roundBoosters[i] = new RoundBooster(i);
    }

  }


}


export default Game;
