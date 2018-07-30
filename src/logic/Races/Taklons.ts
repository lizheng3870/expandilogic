
import {Race, BuildBenefit, RaceType} from "../Race";
import { PlanetType } from "../Planet";
import { Benefit, Trigger, BuildingType, Value, Material } from "../Benefit";


export class Taklons extends Race{

    constructor(name:string) {
        super(name);
        this.setRaceType(RaceType.Taklons);
        this.setPlanetType(PlanetType.Brown);
        // -to do- special power stone of Taklons
        const ore = new Benefit(Trigger.Income, null, null, [new Value(1, Material.Ore)]);
        const science = new Benefit(Trigger.Income, null, null, [new Value(1, Material.Science)]);

        this.income.push(ore)
        this.income.push(science);
    }

    



}