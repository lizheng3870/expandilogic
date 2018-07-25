import {Race, BuildBenefit, RaceType} from "../Race";
import { PlanetType } from "../Planet";
import { Benefit, Trigger, BuildingType, Value, Material } from "../Benefit";


export class Xenos extends Race{

    constructor(name:string) {
        super(name);
        this.setRaceType(RaceType.Xenos);
        this.setPlanetType(PlanetType.Yellow);
    }



}
