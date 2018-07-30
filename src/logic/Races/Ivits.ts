
import {Race, BuildBenefit, RaceType} from "../Race";
import { PlanetType } from "../Planet";
import { Benefit, Trigger, BuildingType, Value, Material } from "../Benefit";


export class Ivits extends Race{

    constructor(name:string) {
        super(name);
        this.setRaceType(RaceType.Ivits);
        this.setPlanetType(PlanetType.Red);
        this.techs = [0,0,0,0,0,0];
        // this.permanentIncomes();
        
    }

    // private permanentIncomes() {
    //     const ore = new Benefit(Trigger.Income, null, null, [new Value(1, Material.Ore)]);
    //     const science = new Benefit(Trigger.Income, null, null, [new Value(1, Material.Science)]);

    //     this.income.push(ore)
    //     this.income.push(science);
    // }





}