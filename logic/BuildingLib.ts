import {Structure, Building} from "./Structure";
import {Race, RaceType} from "./Race";
import {Cost, BuildCost} from "./Cost";
import   {Benefit, Value, Material, Count, Struct, Trigger} from "./Benefit";

/**
 * Building Libraries for each faction
 */
class BuildingLib {

    public mines: Structure[]
    public station: Structure[];
    public institute: Structure[];
    public lab: Structure[];
    public academies: Structure[];
    public gaiaformer: Structure[];
    public race: RaceType;

    constructor(race: RaceType) {
        this.race = race;

        if (this.race === RaceType.Terrans) {

            //Mine 1
            const mine1 = new Structure(Building.Mine, 
                                new Cost([new BuildCost(Material.Gold, 2), 
                                    new BuildCost(Material.Ore, 1)]), 
                                1, 
                                new Benefit(Trigger.Income, Count.Mines, 
                                    Struct.Mine, [new Value(1, Material.Ore)]));
            //Mine 2
            const mine2 = new Structure(Building.Mine, 
                                new Cost([new BuildCost(Material.Gold, 2), 
                                    new BuildCost(Material.Ore, 1)]), 
                                1, 
                                new Benefit(Trigger.Income, Count.Mines, 
                                    Struct.Mine, [new Value(0, Material.Ore)]));
           
            for (let i = 1; i <= 8; i++) {
                if (i === 3) {
                    this.mines.push(mine2);
                } else {
                    this.mines.push(mine1);
                }
            }

            const station1 = new Structure(Building.Station, 
                                new Cost([new BuildCost(Material.Gold, 3),
                                    new BuildCost(Material.Ore, 1)]), 
                                2, 
                                new Benefit(Trigger.Income, Count.TradingStations,
                                    Struct.TradingStation, [new Value(3, Material.Gold)]));
            
            const station2 = new Structure(Building.Station, 
                                new Cost([new BuildCost(Material.Gold, 3),
                                    new BuildCost(Material.Ore, 1)]), 
                                2, 
                                new Benefit(Trigger.Income, Count.TradingStations,
                                    Struct.TradingStation, [new Value(4, Material.Gold)]));

            const station3 = new Structure(Building.Station, 
                                new Cost([new BuildCost(Material.Gold, 3),
                                    new BuildCost(Material.Ore, 1)]), 
                                2, 
                                new Benefit(Trigger.Income, Count.TradingStations,
                                    Struct.TradingStation, [new Value(5, Material.Gold)]));      
        
            
            for (let i = 1; i <= 4; i++) {
                if (i === 1) {
                    this.station.push(station1);
                } else if(i == 4) {
                    this.station.push(station3);
                } else {
                    this.station.push(station2);
                }
            }
        }

        }
        
    }




}





export {BuildingLib};