
import {Race, BuildBenefit, RaceType} from "../Race";
import { PlanetType } from "../Planet";
import { Benefit, Trigger, BuildingType, Value, Material } from "../Benefit";


export class Baltaks extends Race{

    constructor(name:string) {
        super(name);
        this.setRaceType(RaceType.Baltaks);
        this.setPlanetType(PlanetType.Yellow);
        this.techs = [0,0,0,1,0,0];
        this.getTechBenefit(new Benefit(Trigger.Now, null, null, [new Value(1, Material.GaiaFormer)]));
        this.power.bowl2 = 2;
        const ore = new Benefit(Trigger.Income, null, null, [new Value(1, Material.Ore)]);
        const science = new Benefit(Trigger.Income, null, null, [new Value(1, Material.Science)]);

        this.income.push(ore)
        this.income.push(science);

    }



}