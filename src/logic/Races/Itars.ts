
import {Race, BuildBenefit, RaceType} from "../Race";
import { PlanetType } from "../Planet";
import { Benefit, Trigger, BuildingType, Value, Material } from "../Benefit";
import { Structure, StructureType } from "../Structure";


export class Itars extends Race{

    constructor(name:string) {
        super(name);
        this.setRaceType(RaceType.Itars);
        this.setPlanetType(PlanetType.White);
        this.ore = 5;
        this.power.bowl1 = 4;
        const ore = new Benefit(Trigger.Income, null, null, [new Value(1, Material.Ore)]);
        const science = new Benefit(Trigger.Income, null, null, [new Value(1, Material.Science)]);
        const power = new Benefit(Trigger.Income, null, null, [new Value(1, Material.ExtraPower)]);
        this.income.push(ore)
        this.income.push(science);
        this.income.push(power);


         /**
         * Academy types on Faction Board
         */
        let itarsAcademy: Structure[] = [];
        {

            let values: Value[] = [new Value(6, Material.Gold), new Value(6, Material.Ore)];
            let benefit1: Benefit = new Benefit(Trigger.Income, null, null, [new Value(3, Material.Science)]);
            let benefit2: Benefit = new Benefit(Trigger.Special, null, null, [new Value(1, Material.QIC)]);
    
            let academy1 = new Structure(StructureType.Academy, values, 3, benefit1);
            let academy2 = new Structure(StructureType.Academy, values, 3, benefit2);
    
            itarsAcademy.push(academy1);
            itarsAcademy.push(academy2);
        }    
        this.buildBoard.academies = itarsAcademy;
        
    }
        



}