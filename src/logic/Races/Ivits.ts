
import {Race, BuildBenefit, RaceType} from "../Race";
import { PlanetType } from "../Planet";
import { Benefit, Trigger, BuildingType, Value, Material } from "../Benefit";
import { Structure, StructureType } from "../Structure";


export class Ivits extends Race{


    /**
     * Initialise the starting state of Ivits
     * @param name 
     */
    constructor(name:string) {
        super(name);
        this.setRaceType(RaceType.Ivits);
        this.setPlanetType(PlanetType.Red);
        this.techs = [0,0,0,0,0,0];

        /**
         * Permanent Incomes
         */
        const ore = new Benefit(Trigger.Income, null, null, [new Value(1, Material.Ore)]);
        const science = new Benefit(Trigger.Income, null, null, [new Value(1, Material.Science)]);
        const qic = new Benefit(Trigger.Income, null, null, [new Value(1, Material.QIC)]);

        this.income.push(ore)
        this.income.push(science);
        this.income.push(qic);

        //Player specific buildboards
        let ivitsInstitutes: Structure[] = [];
        let values: Value[] = [];
        let benefit: Benefit = new Benefit(Trigger.Income, null, null, [new Value(4, Material.Power), new Value(1, Material.ExtraPower)]);

        const institute = new Structure(StructureType.Institute, values, 3, benefit);
        ivitsInstitutes.push(institute);
        this.buildBoard.institutes = ivitsInstitutes;
        
    }






}