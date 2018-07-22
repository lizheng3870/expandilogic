import {Race, BuildBenefit} from "./Race";
import { PlanetType } from "./Planet";
import { RaceType } from "./Player";
import { Benefit, Trigger, BuildingType, Value, Material } from "./Benefit";

class Terrans extends Race{

    constructor() {
        super();
        super.setRaceType(RaceType.Terrans);
        super.setPlanetType(PlanetType.Blue);
        

    }



}