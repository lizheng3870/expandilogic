import {Race, BuildBenefit, RaceType} from "../Race";
import { PlanetType } from "../Planet";
import { Benefit, Trigger, BuildingType, Value, Material } from "../Benefit";


export class Itars extends Race{

    constructor(name:string) {
        super(name);
        this.setRaceType(RaceType.Itars);
        this.setPlanetType(PlanetType.White);
    }



}
