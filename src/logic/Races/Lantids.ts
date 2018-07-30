
import {Race, BuildBenefit, RaceType} from "../Race";
import { PlanetType } from "../Planet";
import { Benefit, Trigger, BuildingType, Value, Material } from "../Benefit";


export class Lantids extends Race{

    constructor(name:string) {
        super(name);
        this.setRaceType(RaceType.Lantids);
        this.setPlanetType(PlanetType.Blue);
        this.gold = 13;
        // this.permanentIncomes();
        // this.initializeInstitute();
        this.power.bowl1 = 4;
        this.power.bowl2 = 0;

    }

    // private permanentIncomes() {
    //     const ore = new Benefit(Trigger.Income, null, null, [new Value(1, Material.Ore)]);
    //     const science = new Benefit(Trigger.Income, null, null, [new Value(1, Material.Science)]);

    //     this.income.push(ore)
    //     this.income.push(science);
    // }

    public initializeInstitute() {
        let benefit = new Benefit(Trigger.Income, null, null, [new Value(4, Material.Power)]);
        this.buildBoard.institutes[0].changeBenefit(benefit);
        
    }



}