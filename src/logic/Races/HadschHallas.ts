
import {Race, BuildBenefit, RaceType} from "../Race";
import { PlanetType } from "../Planet";
import { Benefit, Trigger, BuildingType, Value, Material } from "../Benefit";


export class HadschHallas extends Race{

    constructor(name:string) {
        super(name);
        this.setRaceType(RaceType.HadschHallas);
        this.setPlanetType(PlanetType.Red);
        this.techs = [0,0,0,0,1,0];
        this.getTechBenefit(new Benefit(Trigger.Income, null, null, [new Value(2, Material.Gold), new Value(1, Material.Power)]));
        const gold = new Benefit(Trigger.Income, null, null, [new Value(3, Material.Gold)]);
        const ore = new Benefit(Trigger.Income, null, null, [new Value(1, Material.Ore)]);
        const science = new Benefit(Trigger.Income, null, null, [new Value(1, Material.Science)]);

        this.income.push(gold);
        this.income.push(ore);
        this.income.push(science);

    }

}