import {Race, BuildBenefit, RaceType} from "../Race";
import { PlanetType } from "../Planet";
import { Benefit, Trigger, BuildingType, Value, Material } from "../Benefit";


export class Gleens extends Race{

    constructor(name:string) {
        super(name);
        this.setRaceType(RaceType.Gleens);
        this.setPlanetType(PlanetType.Yellow);
    }



}
