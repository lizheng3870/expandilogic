import {Exchange} from './Exchange'
import {MapBoard} from './MapBoard'
import TechBoard from './TechBoard'
import ScoringBoard from './ScoringBoard'
import RoundBooster  from './RoundBooster'
import {Player} from './Player'
import {Benefit} from './Benefit'
import {Request, RequestType} from './Request'

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
    public round: number;  // which round the game in  for example round 1
    public players: Player[] = []
    public nextRound: Player[] = []
    public turn: number   // turn is ID of player who will make action currently
    public phase: Phase
    public status: GameStatus
    public board: MapBoard
    public techBoard: TechBoard
    public scoringBoard:ScoringBoard
    public benefits: Benefit[] = []
    public exchange: Exchange
    public roundBoosters:RoundBooster[];

    constructor(gid: number){
      // console.log(`creating game ${gid}`)
     this.round = 1;
     this.turn = 0;  // start from 0;
     this.phase = Phase.Income;
     this.status = GameStatus.Open
     this.board = new MapBoard()
     this.techBoard = new TechBoard();
     this.exchange = new Exchange();
     this.scoringBoard = new ScoringBoard();
     this.roundBoosters = [];
     this.loadRoundBooster();

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
      this.setup();
    }
     return true;
   }

   public setup(){
     // setup Game Board     Research Board and Federation Tokens  done when game creates both
     this.board.setup(this.players.length);  // only test 4 players


     // Take all structures and Gaiaformers of your color on faction board. done when game creates player
     // Take one ore, one knowledge, and two credit markers  QIC.   done when game creates player
     // powder and level 0 on the research board.  done when creates player
     //   faction board  level 1 of a research area, calculate
     for(let player of this.players){
        player.reseachArea();
     }

     // user send request for RoundRooter

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

   public loadRoundBooster(){
     for(let i = 0; i < 10; i++){
         this.roundBoosters[i] = new RoundBooster(i);
     }
   }

   public checkTurn(playerID: number){
     if(this.turn !== playerID){
       throw new Error(`not Player's turn, curren turn : $(this.turn)`)
     }
   }

   public processRoundRooter(data:Request){
     this.checkTurn(data.pid);
     if(this.status !== GameStatus.Setup){
       throw new Error(`processRoundRooter error for status not setup`)
     }

     var player = this.players[data.pid];

     if(data.type === RequestType.Roundbooter){
         var roundBoosterId =  data.roundBoosterID;
         if(player.roundBooster == null && this.roundBoosters[roundBoosterId].valid === true)
         {
           player.roundBooster = this.roundBoosters[roundBoosterId];
           this.roundBoosters[roundBoosterId].valid = false;
         }else{
           throw new Error(`RoundRooter used by other user`)
         }

     }
     //send to all client;

     this.nextTurn();

     if(this.turn === 0 ){
        this.status = GameStatus.Playing;
        this.round = 1;
        this.newRound();  // round
     }


   }


}


export {Game, GameStatus, Phase}
