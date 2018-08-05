
import {Race, BuildBenefit, RaceType} from "../Race";
import { PlanetType } from "../Planet";
import { Benefit, Trigger, BuildingType, Value, Material } from "../Benefit";
import { Structure, StructureType } from "../Structure";


export class Lantids extends Race{

    constructor(name:string) {
        super(name);
        this.setRaceType(RaceType.Lantids);
        this.setPlanetType(PlanetType.Blue);
        this.gold = 13;
        const ore = new Benefit(Trigger.Income, null, null, [new Value(1, Material.Ore)]);
        const science = new Benefit(Trigger.Income, null, null, [new Value(1, Material.Science)]);

        this.income.push(ore)
        this.income.push(science);
        this.power.bowl1 = 4;
        this.power.bowl2 = 0;


        //Player specific buildboards
        let lantidInstitutes: Structure[] = [];
        let values: Value[] = [new Value(6, Material.Gold), new Value(4, Material.Ore)];
        let benefit: Benefit = new Benefit(Trigger.Income, null, null, [new Value(4, Material.Power)]);

        const institute = new Structure(StructureType.Institute, values, 3, benefit);
        lantidInstitutes.push(institute);
        this.buildBoard.institutes = lantidInstitutes;
            

    }
}