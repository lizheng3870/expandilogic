import {Exchange} from './Exchange'
import {MapBoard} from './MapBoard'
import TechBoard from './TechBoard'
import ScoringBoard from './ScoringBoard'
import RoundBooster  from './RoundBooster'
import {Player, CreatePlayer} from './Player'
import {RaceType} from './Race'
import {Terrans} from './Races/Terrans'
import {Xenos} from './Races/Xenos'
import {Nevlas} from './Races/Nevlas'
import {HadschHallas} from './Races/HadschHallas'
import {Benefit} from './Benefit'
import {Request, RequestType, TechLaneType} from './Request'
import {TypeState} from 'TypeState'
import {Action, ActionType} from './Action'
import {StructureStatus} from './Structure'
import {Store} from './Store'
import { Federations } from './Federation';

import GFirebase from './GFirebase';





enum GameStatus{
  Open,
  Setup,
  Playing,
  Income,
  Gaiaforming,
  Actions,
  Scoring,
  Over
}



export enum Config{
  PlayerLimit = 4
}

class Game {
    public gid:number; //game id
    public round: number;  // which round the game in  for example round 1
    public players: Player[] = []
    public nextRound: Player[] = []  // passed player will go here for next round
    public turn: number   // turn is index of players who will make action currently,
    // turn will change for example 4 players 0 1 2 3   when 3 players: 0 1 2
    // playerid ad turn are not relative.
  //  public status: GameStatus
    public board: MapBoard
    public techBoard: TechBoard
    public scoringBoard:ScoringBoard
    public federations: Federations
    public benefits: Benefit[] = []
    public exchange: Exchange
    public roundBoosters:RoundBooster[]
    public stateMachine:TypeState.FiniteStateMachine<GameStatus>
    public firstStructuresRound: number
    public store : Store // techBoard bottom store (Power and QIC)
    // 0 : not into setup build first Structures
    // 1 normal:  0 1 2 3
    // 2 revserse:  3 2 1 0
    // 3 normal again

    constructor(gid: number){
      // console.log(`creating game ${gid}`)
     this.gid = gid;
     this.round = 1;
     this.turn = 0;  // start from 0;
//     this.status = GameStatus.Open
     this.board = new MapBoard()
     this.techBoard = new TechBoard();
     this.exchange = new Exchange();
     this.scoringBoard = new ScoringBoard();
     this.roundBoosters = [];
     this.federations = new Federations();
     this.loadRoundBooster();
     this.firstStructuresRound = 0;
     this.store = new Store();
     this.stateMachine = new TypeState.FiniteStateMachine<GameStatus>(GameStatus.Open);
     this.stateMachine.from(GameStatus.Open).to(GameStatus.Setup)
     this.stateMachine.from(GameStatus.Setup).to(GameStatus.Playing)
     this.stateMachine.from(GameStatus.Playing).to(GameStatus.Income)
     this.stateMachine.from(GameStatus.Income).to(GameStatus.Gaiaforming)
     this.stateMachine.from(GameStatus.Gaiaforming).to(GameStatus.Actions)
     this.stateMachine.from(GameStatus.Actions).to(GameStatus.Actions)
     this.stateMachine.from(GameStatus.Actions).to(GameStatus.Scoring)
     this.stateMachine.from(GameStatus.Scoring).to(GameStatus.Playing)
     this.stateMachine.from(GameStatus.Scoring).to(GameStatus.Over)

     this.stateMachine.on(GameStatus.Setup, (from: GameStatus)=>{
       this.setup();
     })


     this.stateMachine.on(GameStatus.Income, (from: GameStatus)=>{
     	 this.IncomePhase()
       this.stateMachine.go(GameStatus.Gaiaforming)
     })

     this.stateMachine.on(GameStatus.Gaiaforming, (from: GameStatus)=>{
       // todo
      //  this.IncomePhase();
      this.stateMachine.go(GameStatus.Actions)
     })

     this.stateMachine.on(GameStatus.Actions, (from: GameStatus)=>{
      //  this.IncomePhase();
     })

   }


    public addPlayerNew(name: string, raceType:RaceType): boolean{
      // if(raceType === RaceType.Terrans){ //blue
      //   let player = new Terrans(name);
      // }
      //
      //
      // if(raceType === RaceType.Xenos ){
      //       let player = new Xenos(name);
      // }
      //
      //
      // if(raceType === RaceType.HadschHallas){
      //     let player = new Xenos(HadschHallas);
      // }
      //
      // if(raceType === RaceType.Nevlas){
      //     let player = new Xenos(Nevlas);
      // }
      // return  this.addPlayer(player);


     return true;
    }

   public addPlayer(player: Player): boolean{
     if (this.players.length === Config.PlayerLimit){
       throw new Error(`Config.PlayerLimit (${Config.PlayerLimit}) reached`)
     } else {
       //check for another player of the same race

       let sameRace = this.players.findIndex(p => p.raceType === player.raceType)

       if (player.raceType !== null && sameRace !== -1){
          throw new Error(`a player already exists with that raceType: ${player.raceType}/${this.players[sameRace]}`)
       }
       this.players.push(player)
       player.pid = this.players.length - 1
     }

     if(this.players.length === Config.PlayerLimit){
      // if we have the max number of players, automatically start the game

      this.stateMachine.go(GameStatus.Setup)
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
     this.stateMachine.go(GameStatus.Income)
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
     let currentPlayer = this.players[this.turn];
     if(currentPlayer.pid !== playerID){
       var stack = new Error().stack
console.log( stack )
       console.log(`not Player's turn pid: `+ playerID + `, curren turn : `+ this.turn )
       return false;
     }else{
       return true;
     }
   }

   public processRoundRooter(request:Request){
     if(this.checkTurn(request.pid) === false)return;

     if(this.stateMachine.currentState !== GameStatus.Setup){
       throw new Error(`processRoundRooter error for status not setup`)
     }

     var player = this.getPlayer(request.pid);
     if(player === null)return;

     if(request.type === RequestType.Roundbooter){
         var roundBoosterId =  request.roundBoosterID;
         if(player.roundBooster == null && this.roundBoosters[roundBoosterId].valid === true)
         {
           player.roundBooster = this.roundBoosters[roundBoosterId];
           this.roundBoosters[roundBoosterId].valid = false;
         }else{
           throw new Error(`RoundRooter used by other user`)
         }


         //send to all client;

         this.nextTurn();

         if(this.turn === 0 ){  // one round finished
            this.stateMachine.go(GameStatus.Playing)
            this.round = 1;
            this.newRound();  // round
         }

      }

   }


     //send to all client;

     public processSetupFirstStructures(request:Request): boolean{
       if(this.checkTurn(request.pid) === false)return false;
       var player = this.getPlayer(request.pid);
       if(request.type === RequestType.FirstStructures){
         // check planet exist
         if(this.board.hasPlanet(request.hex) === false){
            console.log("planet is not exist");
            return false;
         }


         let planet = this.board.getPlanet(request.hex);

         //console.log(player.pid+ "   >>player.planetType  >>  " + player.planetType)
         //console.log("planet.type" + planet.type)
         // put mine on planet
         if(planet.type === player.planetType ){
           this.board.buildMine(request.hex, player.pid);
           let mine = player.getAvalibleMine();
           if(mine === null)return false;
           mine.status = StructureStatus.Built;
           player.planets.push(planet);
         }else{
           console.log("planetType error");
           return false;
         }
       }


       if(this.firstStructuresRound === 0 )
          this.firstStructuresRound = 1;

      if(this.firstStructuresRound === 1){
           this.turn++
           if (this.turn >= this.players.length){
             this.turn = 4;  // not pid = 4 , just -- than pid = 3
             this.firstStructuresRound = 2;
         }
      }



      if(this.firstStructuresRound === 2){
           this.turn--
           if (this.turn  < 0){
             this.turn = 0;
             this.firstStructuresRound = 3;
         }
      }
      return true;
    }




    public processPlayerRequest(request:Request){

      this.checkTurn(request.pid);
      const player = this.players[this.turn];
      let action = new Action(this, player, request)
      if(action.checkValid()){
         action.doAction();
         if(request.actionType === ActionType.Free || request.actionType === ActionType.Special ||
            (request.actionType === ActionType.PowerAndQIC && request.techLane === TechLaneType.Dig ) ){
              // can not to next turn
            }else{
               this.nextTurn();
            }


      }else{
        console.log("action failed") // send message to client player
        console.log(action.message);
      }

    }

    public currentPlayerPass(request: Request){
      const player = this.players[this.turn];
      const prevRoundBoosterId =  player.roundBooster.id;
      player.onPassBenefit();

      var roundBoosterId =  request.roundBoosterID;
      if(this.roundBoosters[roundBoosterId].valid === true)
      {
        player.roundBooster = this.roundBoosters[roundBoosterId];
        this.roundBoosters[roundBoosterId].valid = false;
        this.roundBoosters[prevRoundBoosterId].valid = true;
      }else{
        throw new Error(`RoundRooter used by other user`)
      }


      // remove player from players to nextRound
      this.players.splice(this.turn - 1, 1);
      this.nextRound.push(player);

    }


    public getPlayer(pid:number){
      for(let player of this.players){
         if(player.pid === pid)return player;
      }

      for(let player of this.nextRound){
          if(player.pid === pid)return player;
      }
      throw new Error(`getPlayer error for pid is error`)

    }

    public saveGame(){
      const itemsRef = GFirebase.database().ref('game/'+this.gid + '/mapboard');
      itemsRef.set(this.board.dumpSpace());

      const itemsRef2 = GFirebase.database().ref('game/'+this.gid + '/players');
      itemsRef2.set(this.dumpPlayers());
    }

    public dumpPlayers(){
      let data = []
      for(let player of this.players){
        data.push(player.getJsonData())
      }
      return data;

    }










}


export {Game, GameStatus}
