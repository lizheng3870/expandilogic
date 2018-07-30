
import {Race, BuildBenefit, RaceType} from "../Race";
import { PlanetType } from "../Planet";
import { Benefit, Trigger, BuildingType, Value, Material } from "../Benefit";


export class Nevlas extends Race{

    constructor(name:string) {
        super(name);
        this.setRaceType(RaceType.Nevlas);
        this.setPlanetType(PlanetType.White);
        this.techs = [0,0,0,0,0,1];
        this.science = 2;
        // this.permanentIncomes();

    }
    

    // private permanentIncomes() {
    //     const ore = new Benefit(Trigger.Income, null, null, [new Value(1, Material.Ore)]);
    //     const science = new Benefit(Trigger.Income, null, null, [new Value(1, Material.Science)]);

    //     this.income.push(ore)
    //     this.income.push(science);
    // }
}