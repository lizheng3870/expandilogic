import {Race, BuildBenefit, RaceType} from "../Race";
import { PlanetType } from "../Planet";
import { Benefit, Trigger, BuildingType, Value, Material } from "../Benefit";


export class Firaks extends Race{

    constructor(name:string) {
        super(name);
        this.setRaceType(RaceType.Firaks);
        this.setPlanetType(PlanetType.Yellow);
        this.ore = 3;
        this.science = 2;
        const ore = new Benefit(Trigger.Income, null, null, [new Value(1, Material.Ore)]);
        const science = new Benefit(Trigger.Income, null, null, [new Value(2, Material.Science)]);

        this.income.push(ore)
        this.income.push(science);
        
    }



}