
import {Race, BuildBenefit, RaceType} from "../Race";
import { PlanetType } from "../Planet";
import { Benefit, Trigger, BuildingType, Value, Material } from "../Benefit";


export class Xenos extends Race{

    constructor(name:string) {
        super(name);
        this.setRaceType(RaceType.Xenos);
        this.setPlanetType(PlanetType.Yellow);
        this.techs = [0,0,1,0,0,0];
        this.qic = 2;
    
        const ore = new Benefit(Trigger.Income, null, null, [new Value(1, Material.Ore)]);
        const science = new Benefit(Trigger.Income, null, null, [new Value(1, Material.Science)]);

        this.income.push(ore)
        this.income.push(science);
    

    }

    
       

}