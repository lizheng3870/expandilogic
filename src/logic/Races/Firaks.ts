import {Race, BuildBenefit, RaceType} from "../Race";
import { PlanetType } from "../Planet";
import { Benefit, Trigger, BuildingType, Value, Material } from "../Benefit";


export class Firaks extends Race{

    constructor(name:string) {
        super(name);
        this.setRaceType(RaceType.Firaks);
        this.setPlanetType(PlanetType.Yellow);
    }



}
