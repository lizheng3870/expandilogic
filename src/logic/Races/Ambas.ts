import {Race, BuildBenefit, RaceType} from "../Race";
import { PlanetType } from "../Planet";
import { Benefit, Trigger, BuildingType, Value, Material } from "../Benefit";


export class Ambas extends Race{

    constructor(name:string) {
        super(name);
        this.setRaceType(RaceType.Ambas);
        this.setPlanetType(PlanetType.Brown);
    }



}
