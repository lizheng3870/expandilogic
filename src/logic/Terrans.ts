import {Race, BuildBenefit} from "./Race";
import { PlanetType } from "./Planet";
import { RaceType } from "./Player";
import { Benefit, Trigger, BuildingType, Value, Material } from "./Benefit";

export class Terrans extends Race{

    constructor() {
        super();
        this.setRaceType(RaceType.Terrans);
        this.setPlanetType(PlanetType.Blue);
        

    }



}