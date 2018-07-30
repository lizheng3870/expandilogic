
import {Race, BuildBenefit, RaceType} from "../Race";
import { PlanetType } from "../Planet";
import { Benefit, Trigger, BuildingType, Value, Material } from "../Benefit";


export class Bescods extends Race{

    constructor(name:string) {
        super(name);
        this.setRaceType(RaceType.Bescods);
        this.setPlanetType(PlanetType.Black);
        this.ore = 4;
        this.science = 1;
        // this.permanentIncomes();
        
    }

    // private permanentIncomes() {
    //     const ore = new Benefit(Trigger.Income, null, null, [new Value(1, Material.Ore)]);
    //     // const science = new Benefit(Trigger.Income, null, null, [new Value(1, Material.Science)]);

    //     this.income.push(ore)
    //     // this.income.push(science);
    // }



}