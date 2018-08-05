
import {Race, BuildBenefit, RaceType} from "../Race";
import { PlanetType } from "../Planet";
import { Benefit, Trigger, BuildingType, Value, Material } from "../Benefit";
import { Structure } from "../Structure";


export class Geodens extends Race{

    constructor(name:string) {
        super(name);
        this.setRaceType(RaceType.Geodens);
        this.setPlanetType(PlanetType.Orange);
        this.techs = [1,0,0,0,0,0];
        this.getTechBenefit(new Benefit(Trigger.Now, null, null, [new Value(2, Material.Ore)]));
        const ore = new Benefit(Trigger.Income, null, null, [new Value(1, Material.Ore)]);
        const science = new Benefit(Trigger.Income, null, null, [new Value(1, Material.Science)]);

        this.income.push(ore)
        this.income.push(science);


       

        
    }




}