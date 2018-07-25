import {Race, BuildBenefit, RaceType} from "../Race";
import { PlanetType } from "../Planet";
import { Benefit, Trigger, BuildingType, Value, Material } from "../Benefit";


export class HadschHallas extends Race{

    constructor(name:string) {
        super(name);
        this.setRaceType(RaceType.HadschHallas);
        this.setPlanetType(PlanetType.Red);


    }



}
