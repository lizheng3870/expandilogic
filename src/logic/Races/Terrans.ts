import {Race, BuildBenefit, RaceType} from "../Race";
import { PlanetType } from "../Planet";
import { Benefit, Trigger, BuildingType, Value, Material } from "../Benefit";
import TechBoard from "../TechBoard";


export class Terrans extends Race{

    constructor(name:string) {
        super(name);
        this.setRaceType(RaceType.Terrans);
        this.setPlanetType(PlanetType.Blue);
        this.getTechBenefit(new Benefit(Trigger.Now, null, null, [new Value(1, Material.GaiaFormer)]));
        this.techs = [0,0,0,1,0,0];

0
    }



}
