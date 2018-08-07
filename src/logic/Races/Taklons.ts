
import {Race, BuildBenefit, RaceType} from "../Race";
import { PlanetType } from "../Planet";
import { Benefit, Trigger, BuildingType, Value, Material } from "../Benefit";


export class Taklons extends Race{

    /**
     * Initialise the starting state of Taklons
     * @param name 
     */
    constructor(name:string) {
        super(name);
        this.setRaceType(RaceType.Taklons);
        this.setPlanetType(PlanetType.Brown);
        const ore = new Benefit(Trigger.Income, null, null, [new Value(1, Material.Ore)]);
        const science = new Benefit(Trigger.Income, null, null, [new Value(1, Material.Science)]);
        this.income.push(ore)
        this.income.push(science);
    }


    /**
     * Taklons has a power stone that changes the way 
     * in which the powers move around when charging 
     * - todo
     * - overrides the parent class method
     * @param charge
     */
    public chargePower(charge: number) {



    }

    



}