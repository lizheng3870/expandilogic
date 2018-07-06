//import Player from './Player';

class Income {
  public gold: number;
  public ore: number;
  public science: number;
  public charge: number;
  public power: number;
  public qic: number;

  constructor() {
    this.gold = 0;
    this.ore = 0;
    this.science = 0;
    this.charge = 0;
    this.power = 0;
    this.qic = 0;
  }

  // doIncome(player: Player){
  //   var boardGold = [0, 3, 7, 11, 16];
  //   var boardOre = [1, 2, 3, 3, 4, 5, 6, 7, 8];
  //   var boardScience = [1, 2, 3, 4];
  //   player.ore += boardOre[player.mine] + this.ore;
  //   player.science += boardScience[player.lab] + this.science;
  //   player.gold += boardGold[player.station] + this.gold;
  //   player.qic += this.qic;
  //
  //   if(this.charge > 0) {
  //     player.chargePower(this.charge);
  //   }
  // }


}

export default Income;
