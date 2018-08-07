import {StructureType, Structure} from "./Structure";
import {RaceType} from "./Race";
import {Benefit, Value, Material, Trigger} from "./Benefit";



/**
 * Base building Library for all factions 
 * Specific differences between each Faction is stored in their 
 * respective Faction class in Races folder
 */
class BuildingLib {

    public mines: Structure[]
    public station: Structure[];
    public institute: Structure[];
    public lab: Structure[];
    public academies: Structure[];
    
    constructor() {
        // this.race = race;
        this.mines = [];
        this.station = [];
        this.institute = [];
        this.lab = [];
        this.academies = [];
        // this.gaiaformer = [];


      /**
        * Adds Mines
        */
        for (let i = 1; i <= 8; i++) {
            if (i === 3) {
                //Mine 2
                let values: Value[] = [new Value(2, Material.Gold), new Value(1, Material.Ore)];
                let benefit: Benefit = new Benefit(Trigger.Income, null, null, [new Value(0, Material.Ore)]);
                let mine2 = new Structure(StructureType.Mine, values, 1, benefit);
                this.mines.push(mine2);
            } else {
                //Mine 1
                let mine1 = new Structure(StructureType.Mine,
                                [new Value(2, Material.Gold),
                                    new Value(1, Material.Ore)],
                                1,
                                new Benefit(Trigger.Income, null,
                                    null, [new Value(1, Material.Ore)]));

                this.mines.push(mine1);
            }
        }

        /**
         * Adds Trading stations
         */
       {
              let station1 = new Structure(StructureType.Station,
                                  [new Value(3, Material.Gold),
                                   new Value(2, Material.Ore)],
                                  2,
                                new Benefit(Trigger.Income, null,
                                      null, [new Value(3, Material.Gold)]));
              this.station.push(station1);


                let station2 = new Structure(StructureType.Station,
                                    [new Value(3, Material.Gold),
                                        new Value(2, Material.Ore)],
                                    2,
                                    new Benefit(Trigger.Income, null,
                                        null, [new Value(4, Material.Gold)]));
                this.station.push(station2);

                let station3 = new Structure(StructureType.Station,
                                    [new Value(3, Material.Gold),
                                        new Value(2, Material.Ore)],
                                    2,
                                    new Benefit(Trigger.Income, null,
                                        null, [new Value(4, Material.Gold)]));
                this.station.push(station3);

                let station4 = new Structure(StructureType.Station,
                                    [new Value(3, Material.Gold),
                                        new Value(2, Material.Ore)],
                                    2,
                                    new Benefit(Trigger.Income, null,
                                        null, [new Value(5, Material.Gold)]))
                this.station.push(station4);

        }

        /**
         * Adds Labs
         */
        for (let i = 1; i <= 3; i++) {
            let lab1 = new Structure(StructureType.Lab,
                            [new Value(5, Material.Gold),
                                new Value(3, Material.Ore)],
                                2, new Benefit(Trigger.Income, null, null, [new Value(1, Material.Science)]));

            this.lab.push(lab1);
        }

        /**
         * Academy types on Faction Board
         */
        {
        let values: Value[] = [new Value(6, Material.Gold), new Value(6, Material.Ore)];
        let benefit1: Benefit = new Benefit(Trigger.Income, null, null, [new Value(2, Material.Science)]);
        let benefit2: Benefit = new Benefit(Trigger.Special, null, null, [new Value(1, Material.QIC)]);

        let academy1 = new Structure(StructureType.Academy, values, 3, benefit1);
        let academy2 = new Structure(StructureType.Academy, values, 3, benefit2);

        this.academies.push(academy1);
        this.academies.push(academy2);

        }

        /**
         * Adds Institute
         * Different Institute powers
         */
        let values: Value[] = [new Value(6, Material.Gold), new Value(4, Material.Ore)];
        let benefit: Benefit = new Benefit(Trigger.Income, null, null, [new Value(1, Material.ExtraPower), new Value(4, Material.Power)]);

        const raceInstitute = new Structure(StructureType.Institute, values, 3, benefit);
        this.institute.push(raceInstitute);


      }


}
export {BuildingLib};
