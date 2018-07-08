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
             * Lab types on Faction Board
             */
            const lab = new Structure(Building.Lab, 
                            new Cost([new BuildCost(Material.Gold, 5), 
                                new BuildCost(Material.Ore, 3)]), 
                                2, new Benefit(Trigger.Income, Count.Labs, Struct.Lab, [new Value(1, Material.Science)]));

            
             /**
             * Academy types on Faction Board
             */

            const academy1 = new Structure(Building.Academy, 
                                new Cost([new BuildCost(Material.Gold, 6),
                                    new BuildCost(Material.Ore, 6)]),
                                    3, new Benefit(Trigger.Income, Count.BigBuildings, Struct.Academy, [new Value(2, Material.Science)]));

            const academy1a = new Structure(Building.Academy, 
                                new Cost([new BuildCost(Material.Gold, 6),
                                    new BuildCost(Material.Ore, 6)]),
                                    3, new Benefit(Trigger.Income, Count.BigBuildings, Struct.Academy, [new Value(3, Material.Science)]));
                                            

            const academy2 = new Structure(Building.Academy, 
                                new Cost([new BuildCost(Material.Gold, 6),
                                    new BuildCost(Material.Ore, 6)]),
                                3, 
                                new Benefit(Trigger.Special, Count.BigBuildings, Struct.Academy, [new Value(1, Material.QIC)]));                    

            const academy2a = new Structure(Building.Academy, 
                                new Cost([new BuildCost(Material.Gold, 6),
                                    new BuildCost(Material.Ore, 6)]),
                                3, 
                                new Benefit(Trigger.Special, Count.BigBuildings, Struct.Academy, [new Value(4, Material.Gold)]));                    
             
            
             /**
             * Adds Mines 
             */
            for (let i = 1; i <= 8; i++) {
                if (i === 3) {
                    this.mines.push(mine2);
                } else {
                    this.mines.push(mine1);
                }
            }
            /**
             * Adds Trading stations
             */
            if (this.race === RaceType.Bescods) {
                this.station.push(lab);
                this.station.push(lab);
                this.station.push(lab);
                this.station.push(lab);
            } else {
                this.station.push(station1);
                this.station.push(station2);
                this.station.push(station2);
                this.station.push(station3);
           }                                    

            /**
             * Adds Labs 
             */
            if (this.race === RaceType.Bescods) {
                this.lab.push(station1);
                this.lab.push(station2);
                this.lab.push(station3);
            } else {
                for (let i = 1; i <= 3; i++) {
                    this.lab.push(lab);
                }                          
            }
        
            /**
             * Adds Academies
             */
            if (this.race === RaceType.Itars) {
                this.academies.push(academy1a);
                this.academies.push(academy2);
            } else if (this.race === RaceType.Baltaks) {
                this.academies.push(academy1);
                this.academies.push(academy2a);
            } else {
                this.academies.push(academy1);
                this.academies.push(academy2);
            }
            
            /**
             * Adds Institute 
             * Different Institute powers
             */
            if (this.race === RaceType.Terrans) {
                const terranInstitute = new Structure(Building.Institute, 
                                            new Cost([new BuildCost(Material.Gold, 6),
                                                new BuildCost(Material.Ore, 4)]),
                                            3, 
                                            new Benefit(Trigger.Income, Count.BigBuildings, Struct.Institute, [new Value(1, Material.Power), new Value(4, Material.Charge)]));                 
                this.institute.push(terranInstitute);    

            } else if (this.race === RaceType.Lantids){
                const lantidsInstitute = new Structure(Building.Institute, 
                                            new Cost([new BuildCost(Material.Gold, 6),
                                                new BuildCost(Material.Ore, 4)]),
                                            3, 
                                            new Benefit(Trigger.Income, Count.BigBuildings, Struct.Institute, [new Value(4, Material.Charge)])); 
                this.institute.push(lantidsInstitute);

            } else if(this.race === RaceType.Xenos) {
                const xenosInstitute = new Structure(Building.Institute, 
                                            new Cost([new BuildCost(Material.Gold, 6),
                                                new BuildCost(Material.Ore, 4)]),
                                            3,
                                            new Benefit(Trigger.Income, Count.BigBuildings, Struct.Institute, [new Value(4, Material.Charge), new Value(1, Material.QIC)]));
                this.institute.push(xenosInstitute);

                       
            } else if (this.race === RaceType.Gleens) {
                const gleensInstitute = new Structure(Building.Institute, 
                                            new Cost([new BuildCost(Material.Gold, 6),
                                                new BuildCost(Material.Ore, 4)]),
                                            3,
                                            new Benefit(Trigger.Income, Count.BigBuildings, Struct.Institute, [new Value(4, Material.Charge), new Value(1, Material.Ore)]));
                this.institute.push(gleensInstitute);

            } else if (this.race === RaceType.Taklons) {
                const taklonsInstitute = new Structure(Building.Institute, 
                                            new Cost([new BuildCost(Material.Gold, 6),
                                                new BuildCost(Material.Ore, 4)]),
                                            3,
                                            new Benefit(Trigger.Income, Count.BigBuildings, Struct.Institute, [new Value(4, Material.Charge), new Value(1, Material.Power)]));
                this.institute.push(taklonsInstitute);                            

            } else if (this.race === RaceType.Ambas) {
                const ambasInstitute = new Structure(Building.Institute, 
                    new Cost([new BuildCost(Material.Gold, 6),
                        new BuildCost(Material.Ore, 4)]),
                    3,
                    new Benefit(Trigger.Income, Count.BigBuildings, Struct.Institute, [new Value(4, Material.Charge), new Value(2, Material.Power)]));
                this.institute.push(ambasInstitute);

            } else if (this.race === RaceType.Nevlas) {
                const nevlasInstitute = new Structure(Building.Institute, 
                    new Cost([new BuildCost(Material.Gold, 6),
                        new BuildCost(Material.Ore, 4)]),
                    3,
                    new Benefit(Trigger.Income, Count.BigBuildings, Struct.Institute, [new Value(4, Material.Charge), new Value(1, Material.Power)]));
                this.institute.push(nevlasInstitute);

            } else if (this.race === RaceType.Itars) {
                const itarsInstitute = new Structure(Building.Institute, 
                    new Cost([new BuildCost(Material.Gold, 6),
                        new BuildCost(Material.Ore, 4)]),
                    3,
                    new Benefit(Trigger.Income, Count.BigBuildings, Struct.Institute, [new Value(4, Material.Charge), new Value(1, Material.Power)]));
                this.institute.push(itarsInstitute);

            } else if (this.race === RaceType.Ivits) {
                const ivitsInstitute = new Structure(Building.Institute, 
                    new Cost([new BuildCost(Material.Gold, 6),
                        new BuildCost(Material.Ore, 4)]),
                    3,
                    new Benefit(Trigger.Income, Count.BigBuildings, Struct.Institute, [new Value(4, Material.Charge), new Value(1, Material.Power)]));
                this.institute.push(ivitsInstitute);

            } else if (this.race === RaceType.HadschHallas) {
                const hHInstitute = new Structure(Building.Institute, 
                    new Cost([new BuildCost(Material.Gold, 6),
                        new BuildCost(Material.Ore, 4)]),
                    3,
                    new Benefit(Trigger.Income, Count.BigBuildings, Struct.Institute, [new Value(4, Material.Charge), new Value(1, Material.Power)]));

                this.institute.push(hHInstitute);    

            } else if (this.race === RaceType.Geodens) {
                const geodensInstitute = new Structure(Building.Institute, 
                    new Cost([new BuildCost(Material.Gold, 6),
                        new BuildCost(Material.Ore, 4)]),
                    3,
                    new Benefit(Trigger.Income, Count.BigBuildings, Struct.Institute, [new Value(4, Material.Charge), new Value(1, Material.Power)]));
                this.institute.push(geodensInstitute);   
                
            } else if (this.race === RaceType.Baltaks) {
                const baltaksInstitute = new Structure(Building.Institute, 
                    new Cost([new BuildCost(Material.Gold, 6),
                        new BuildCost(Material.Ore, 4)]),
                    3,
                    new Benefit(Trigger.Income, Count.BigBuildings, Struct.Institute, [new Value(4, Material.Charge), new Value(1, Material.Power)]));
                this.institute.push(baltaksInstitute);        

            } else if (this.race === RaceType.Firaks) {
                const firaksInstitute = new Structure(Building.Institute, 
                    new Cost([new BuildCost(Material.Gold, 6),
                        new BuildCost(Material.Ore, 4)]),
                    3,
                    new Benefit(Trigger.Income, Count.BigBuildings, Struct.Institute, [new Value(4, Material.Charge), new Value(1, Material.Power)]));

                this.institute.push(firaksInstitute);    

            } else if (this.race === RaceType.Bescods) {
                const bescodsInstitute = new Structure(Building.Institute, 
                    new Cost([new BuildCost(Material.Gold, 6),
                        new BuildCost(Material.Ore, 4)]),
                    3,
                    new Benefit(Trigger.Income, Count.BigBuildings, Struct.Institute, [new Value(4, Material.Charge), new Value(2, Material.Power)]));

                this.institute.push(bescodsInstitute);    
            }        
        }

        public changeBigBuildingValue(value: number){
            for(let i = 0; i < this.academies.length; i++){
                let struct = this.academies[i];
                struct.changePowerValue(value);
            }
            for(let i = 0; i < this.institute.length; i++){
                let struct = this.institute[i];
                struct.changePowerValue(value);
            }
        }
    }
export {BuildingLib};