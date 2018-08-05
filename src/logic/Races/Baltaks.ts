
import {Race, BuildBenefit, RaceType} from "../Race";
import { PlanetType } from "../Planet";
import { Benefit, Trigger, BuildingType, Value, Material } from "../Benefit";
import { Structure, StructureType } from "../Structure";


export class Baltaks extends Race{

    constructor(name:string) {
        super(name);
        this.setRaceType(RaceType.Baltaks);
        this.setPlanetType(PlanetType.Yellow);
        this.techs = [0,0,0,1,0,0];
        this.getTechBenefit(new Benefit(Trigger.Now, null, null, [new Value(1, Material.GaiaFormer)]));
        this.power.bowl2 = 2;
        const ore = new Benefit(Trigger.Income, null, null, [new Value(1, Material.Ore)]);
        const science = new Benefit(Trigger.Income, null, null, [new Value(1, Material.Science)]);

        this.income.push(ore)
        this.income.push(science);

        /**
         * Academy types for Baltaks
         */
        {
            let baltaksAcademies: Structure[] = [];
            let values: Value[] = [new Value(6, Material.Gold), new Value(6, Material.Ore)];
            let benefit1: Benefit = new Benefit(Trigger.Income, null, null, [new Value(2, Material.Science)]);
            let benefit2: Benefit = new Benefit(Trigger.Special, null, null, [new Value(4, Material.Gold)]);
    
            let academy1 = new Structure(StructureType.Academy, values, 3, benefit1);
            let academy2 = new Structure(StructureType.Academy, values, 3, benefit2);
    
            baltaksAcademies.push(academy1);
            baltaksAcademies.push(academy2);
            this.buildBoard.academies = baltaksAcademies;
    
        }

    }



}