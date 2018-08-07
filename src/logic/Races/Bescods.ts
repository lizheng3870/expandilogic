
import {Race, BuildBenefit, RaceType} from "../Race";
import { PlanetType } from "../Planet";
import { Benefit, Trigger, BuildingType, Value, Material } from "../Benefit";
import { Structure, StructureType } from "../Structure";


export class Bescods extends Race{

    /**
     * Initialise the starting state of Bescods
     * @param name 
     */
    constructor(name:string) {
        super(name);
        this.setRaceType(RaceType.Bescods);
        this.setPlanetType(PlanetType.Black);
        this.ore = 4;
        this.science = 1;
        const ore = new Benefit(Trigger.Income, null, null, [new Value(1, Material.Ore)]);
        const science = new Benefit(Trigger.Income, null, null, [new Value(1, Material.Science)]);

        this.income.push(ore)
        this.income.push(science);
    

        /**
         * Player specific buildboards
         * Note: For Bescods, Institute in updated from a Lab
         * Academies are updated from a station
         */
         
        let stations: Structure[] = [];
        let labs: Structure[] = [];
        // let academies: Structure[] = [];
        let institutes: Structure[] = [];

        // Stations
        for (let i = 1; i <= 4; i++) {
            let bescodStation = new Structure(StructureType.Station,
                            [new Value(3, Material.Gold),
                                new Value(2, Material.Ore)],
                                2, new Benefit(Trigger.Income, null, null, [new Value(1, Material.Science)]));

            stations.push(bescodStation);
        }
        this.buildBoard.stations = stations;

        // Labs 
        {
            let values: Value[] = [new Value(5, Material.Gold),  new Value(3, Material.Ore)];
            let lab1 = new Structure(StructureType.Lab, values, 2,
                                new Benefit(Trigger.Income, null,
                                    null, [new Value(3, Material.Gold)]));
            labs.push(lab1);        
            let lab2 = new Structure(StructureType.Station,
                                values,
                                2,
                                new Benefit(Trigger.Income, null,
                                    null, [new Value(4, Material.Gold)]));
            labs.push(lab2);

            let lab3 = new Structure(StructureType.Station,
                                values,
                                2,
                                new Benefit(Trigger.Income, null,
                                    null, [new Value(5, Material.Gold)]));
            labs.push(lab3);

        }

        // Academies
        // {
        //     let values: Value[] = [new Value(6, Material.Gold),  new Value(6, Material.Ore)];

        //     let academy1 = new Structure(StructureType.Academy, values, 3, new Benefit(Trigger.Income, null, null, [new Value(2, Material.Science)]));
        //     academies.push(academy1);

        //     let academy2 = new Structure(StructureType.Academy, values, 3, new Benefit(Trigger.Special, null, null, [new Value(1, Material.QIC)]));
        //     academies.push(academy2);
        //     this.buildBoard.academies = 
        // }

        //Institute
        let values: Value[] = [new Value(6, Material.Gold), new Value(4, Material.Ore)];
        let benefit: Benefit = new Benefit(Trigger.Income, null, null, [new Value(2, Material.ExtraPower), new Value(4, Material.Power)]);
        const bescodInstitute = new Structure(StructureType.Institute, values, 3, benefit);
        institutes.push(bescodInstitute);
        this.buildBoard.institutes = institutes;

    }




}