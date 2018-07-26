import {Race, BuildBenefit, RaceType} from "../Race";
import { PlanetType } from "../Planet";
import { Benefit, Trigger, BuildingType, Value, Material } from "../Benefit";


export class Taklons extends Race{

    constructor(name:string) {
        super(name);
        this.setRaceType(RaceType.Taklons);
        this.setPlanetType(PlanetType.Brown);
    }



}
