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

        /**
         * Terrans
         */
        if (this.race === RaceType.Terrans || this.race === RaceType.Lantids) {
            
            /**
             * Mine types on Faction Board
             */
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
            
            /**
             * Adds Mines into Terran Array
             */
            for (let i = 1; i <= 8; i++) {
                if (i === 3) {
                    this.mines.push(mine2);
                } else {
                    this.mines.push(mine1);
                }
            }

            /**
             * Trading Station types on Faction Board
             */

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
        
            
            /**
             * Adds Trading stations into Terran Array
             */
            for (let i = 1; i <= 4; i++) {
                if (i === 1) {
                    this.station.push(station1);
                } else if(i == 4) {
                    this.station.push(station3);
                } else {
                    this.station.push(station2);
                }
            }


            /**
             * Lab types on Faction Board
             */
            const lab = new Structure(Building.Lab, 
                            new Cost([new BuildCost(Material.Gold, 5), 
                                new BuildCost(Material.Ore, 3)]), 
                                2, new Benefit(Trigger.Income, Count.Labs, Struct.Lab, [new Value(1, Material.Science)]));
            /**
             * Adds Labs into Terran Array
             */
            for (let i = 1; i <=3; i++) {
                this.lab.push(lab);
            }         
            
             /**
             * Academy types on Faction Board
             */
            const academy1 = new Structure(Building.Academy, 
                                new Cost([new BuildCost(Material.Gold, 6),
                                    new BuildCost(Material.Ore, 6)]),
                                    3, new Benefit(Trigger.Income, Count.BigBuildings, Struct.Academy, [new Value(2, Material.Science)]));

            const academy2 = new Structure(Building.Academy, 
                                 new Cost([new BuildCost(Material.Gold, 6),
                                    new BuildCost(Material.Ore, 6)]),
                                    3, new Benefit(Trigger.Special, Count.BigBuildings, Struct.Academy, [new Value(1, Material.QIC)]));                    
            /**
             * Adds Academies into Terran Array
             */
            this.academies.push(academy1);
            this.academies.push(academy2);
            
            /**
             * Checks if Player is of Lantids or Terrans 
             * Different Institute powers
             */
            if (this.race === RaceType.Terrans) {
                const terranInstitute = new Structure(Building.Institute, 
                    new Cost([new BuildCost(Material.Gold, 6),
                        new BuildCost(Material.Ore, 4)]),
                        3, new Benefit(Trigger.Income, Count.BigBuildings, Struct.Institute, [new Value(1, Material.Power), new Value(4, Material.Charge)])); 
                
                this.institute.push(terranInstitute);    
            } else {
                const lantidsInstitute = new Structure(Building.Institute, 
                    new Cost([new BuildCost(Material.Gold, 6),
                        new BuildCost(Material.Ore, 4)]),
                        3, new Benefit(Trigger.Income, Count.BigBuildings, Struct.Institute, [new Value(4, Material.Charge)])); 
                this.institute.push(lantidsInstitute);
            }
               
        }


        // -----------------------------------------  End Terrans  -----------------------------------------

        /**
         * Lantids
         */
        if (this.race === RaceType.Lantids) {
            
            

            
        }
        
    }
}

export {BuildingLib};