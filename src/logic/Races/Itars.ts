
import {Race, BuildBenefit, RaceType} from "../Race";
import { PlanetType } from "../Planet";
import { Benefit, Trigger, BuildingType, Value, Material } from "../Benefit";


export class Itars extends Race{

    constructor(name:string) {
        super(name);
        this.setRaceType(RaceType.Itars);
        this.setPlanetType(PlanetType.White);
        this.ore = 5;
        // this.permanentIncomes();
        
    }

    // private permanentIncomes() {
    //     const ore = new Benefit(Trigger.Income, null, null, [new Value(1, Material.Ore)]);
    //     const science = new Benefit(Trigger.Income, null, null, [new Value(1, Material.Science)]);

    //     this.income.push(ore)
    //     this.income.push(science);
    // }




}