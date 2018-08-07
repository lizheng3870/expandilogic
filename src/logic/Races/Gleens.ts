
import {Race, BuildBenefit, RaceType} from "../Race";
import { PlanetType } from "../Planet";
import { Benefit, Trigger, BuildingType, Value, Material } from "../Benefit";
import { Structure, StructureType } from "../Structure";


export class Gleens extends Race{

    /**
     * Initialise the starting state of Gleens
     * @param name 
     */
    constructor(name:string) {
        super(name);
        this.setRaceType(RaceType.Gleens);
        this.setPlanetType(PlanetType.Yellow);
        this.techs = [0,1,0,0,0,0];
        this.getTechBenefit(new Benefit(Trigger.Now, null, null, [new Value(1, Material.QIC)]));
        const ore = new Benefit(Trigger.Income, null, null, [new Value(1, Material.Ore)]);
        const science = new Benefit(Trigger.Income, null, null, [new Value(1, Material.Science)]);

        this.income.push(ore)
        this.income.push(science);


        /**
         * Player specific buildboards
         */
        let gleensInstitute: Structure[] = [];

        //Institute
        let values: Value[] = [new Value(6, Material.Gold), new Value(4, Material.Ore)];
        let benefit: Benefit = new Benefit(Trigger.Income, null, null, [new Value(1, Material.Ore), new Value(4, Material.Power)]);
        const raceInstitute = new Structure(StructureType.Institute, values, 3, benefit);
        gleensInstitute.push(raceInstitute);
        this.buildBoard.institutes = gleensInstitute;
         

    }




}