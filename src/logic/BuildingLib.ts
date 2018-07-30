import {StructureType, Structure} from "./Structure";
import {RaceType} from "./Race";
import {Benefit, Value, Material, Trigger} from "./Benefit";



/**
 * Building Libraries for each faction
 */
class BuildingLib {

    public mines: Structure[]
    public station: Structure[];
    public institute: Structure[];
    public lab: Structure[];
    public academies: Structure[];
    // public gaiaformer: Structure[];
    // public race: RaceType;

    constructor() {
        // this.race = race;
        this.mines = [];
        this.station = [];
        this.institute = [];
        this.lab = [];
        this.academies = [];
        // this.gaiaformer = [];


        /**
        * Adds Mines
        */
        for (let i = 1; i <= 8; i++) {
            if (i === 3) {
                //Mine 2
                let values: Value[] = [new Value(2, Material.Gold), new Value(1, Material.Ore)];
                let benefit: Benefit = new Benefit(Trigger.Income, null, null, [new Value(0, Material.Ore)]);
                let mine2 = new Structure(StructureType.Mine, values, 1, benefit);
                this.mines.push(mine2);
            } else {
                //Mine 1
                let mine1 = new Structure(StructureType.Mine,
                                [new Value(2, Material.Gold),
                                    new Value(1, Material.Ore)],
                                1,
                                new Benefit(Trigger.Income, null,
                                    null, [new Value(1, Material.Ore)]));

                this.mines.push(mine1);
            }
        }

        /**
         * Adds Trading stations
         */
        for (let i = 1; i <= 4; i++) {
            if (i === 2 || i === 3) {
                let station2 = new Structure(StructureType.Station,
                                    [new Value(3, Material.Gold),
                                        new Value(1, Material.Ore)],
                                    2,
                                    new Benefit(Trigger.Income, null,
                                        null, [new Value(4, Material.Gold)]));
                this.station.push(station2);                                      
            } else if (i === 4) {
                let station3 = new Structure(StructureType.Station,
                                    [new Value(3, Material.Gold),
                                        new Value(1, Material.Ore)],
                                    2,
                                    new Benefit(Trigger.Income, null,
                                        null, [new Value(5, Material.Gold)]))
                this.station.push(station3);               
            } else {
                let station1 = new Structure(StructureType.Station,
                                    [new Value(3, Material.Gold),
                                     new Value(1, Material.Ore)],
                                    2,
                                  new Benefit(Trigger.Income, null,
                                        null, [new Value(3, Material.Gold)]));
                this.station.push(station1);     
            }
        }

        /**
         * Adds Labs
         */
        for (let i = 1; i <= 3; i++) {
            let lab1 = new Structure(StructureType.Lab,
                            [new Value(Material.Gold, 5),
                                new Value(Material.Ore, 3)],
                                2, new Benefit(Trigger.Income, null, null, [new Value(1, Material.Science)]));
            
            this.lab.push(lab1);
        }

        /**
         * Academy types on Faction Board
         */
        if (true) {
            let values: Value[] = [new Value(6, Material.Gold), new Value(6, Material.Ore)];
            let benefit1: Benefit = new Benefit(Trigger.Income, null, null, [new Value(2, Material.Science)]);
            let benefit2: Benefit = new Benefit(Trigger.Special, null, null, [new Value(1, Material.QIC)]);
            
            let academy1 = new Structure(StructureType.Academy, values, 3, benefit1);
            let academy2 = new Structure(StructureType.Academy, values, 3, benefit2);
            
            this.academies.push(academy1);
            this.academies.push(academy2);
        }
        

        /**
         * Adds Institute
         * Different Institute powers
         */
        let values: Value[] = [new Value(Material.Gold, 6), new Value(Material.Ore, 4)];
        let benefit: Benefit = new Benefit(Trigger.Income, null, null, [new Value(1, Material.ExtraPower), new Value(4, Material.Power)]);

        const raceInstitute = new Structure(StructureType.Institute, values, 3, benefit);
        this.institute.push(raceInstitute);

        // } else if (this.race === RaceType.Lantids){
        //     const lantidsInstitute = new Structure(StructureType.Institute,
        //                                 [new Value(Material.Gold, 6),
        //                                     new Value(Material.Ore, 4)],
        //                                 3,
        //                                 new Benefit(Trigger.Income, null, null, [new Value(4, Material.Power)]));
        //     this.institute.push(lantidsInstitute);

        // } else if(this.race === RaceType.Xenos) {
        //     const xenosInstitute = new Structure(StructureType.Institute,
        //                                 [new Value(Material.Gold, 6),
        //                                     new Value(Material.Ore, 4)],
        //                                 3,
        //                                 new Benefit(Trigger.Income, null, null, [new Value(4, Material.Power), new Value(1, Material.QIC)]));
        //     this.institute.push(xenosInstitute);


        // } else if (this.race === RaceType.Gleens) {
        //     const gleensInstitute = new Structure(StructureType.Institute,
        //                                 [new Value(Material.Gold, 6),
        //                                     new Value(Material.Ore, 4)],
        //                                 3,
        //                                 new Benefit(Trigger.Income, null, null, [new Value(4, Material.Power), new Value(1, Material.Ore)]));
        //     this.institute.push(gleensInstitute);

        // } else if (this.race === RaceType.Taklons) {
        //     const taklonsInstitute = new Structure(StructureType.Institute,
        //                                 [new Value(Material.Gold, 6),
        //                                     new Value(Material.Ore, 4)],
        //                                 3,
        //                                 new Benefit(Trigger.Income, null, null, [new Value(4, Material.Power), new Value(1, Material.Power)]));
        //     this.institute.push(taklonsInstitute);

        // } else if (this.race === RaceType.Ambas) {
        //     const ambasInstitute = new Structure(StructureType.Institute,
        //         [new Value(Material.Gold, 6),
        //             new Value(Material.Ore, 4)],
        //         3,
        //         new Benefit(Trigger.Income, null, null, [new Value(4, Material.Power), new Value(2, Material.Power)]));
        //     this.institute.push(ambasInstitute);

        // } else if (this.race === RaceType.Nevlas) {
        //     const nevlasInstitute = new Structure(StructureType.Institute,
        //         [new Value(Material.Gold, 6),
        //             new Value(Material.Ore, 4)],
        //         3,
        //         new Benefit(Trigger.Income, null, null, [new Value(4, Material.Power), new Value(1, Material.Power)]));
        //     this.institute.push(nevlasInstitute);

        // } else if (this.race === RaceType.Itars) {
        //     const itarsInstitute = new Structure(StructureType.Institute,
        //         [new Value(Material.Gold, 6),
        //             new Value(Material.Ore, 4)],
        //         3,
        //         new Benefit(Trigger.Income, null, null, [new Value(4, Material.Power), new Value(1, Material.Power)]));
        //     this.institute.push(itarsInstitute);

        // } else if (this.race === RaceType.Ivits) {
        //     const ivitsInstitute = new Structure(StructureType.Institute,
        //         [new Value(Material.Gold, 6),
        //             new Value(Material.Ore, 4)],
        //         3,
        //         new Benefit(Trigger.Income, null, null, [new Value(4, Material.Power), new Value(1, Material.Power)]));
        //     this.institute.push(ivitsInstitute);

        // } else if (this.race === RaceType.HadschHallas) {
        //     const hHInstitute = new Structure(StructureType.Institute,
        //         [new Value(Material.Gold, 6),
        //             new Value(Material.Ore, 4)],
        //         3,
        //         new Benefit(Trigger.Income, null, null, [new Value(4, Material.Power), new Value(1, Material.Power)]));

        //     this.institute.push(hHInstitute);

        // } else if (this.race === RaceType.Geodens) {
        //     const geodensInstitute = new Structure(StructureType.Institute,
        //         [new Value(Material.Gold, 6),
        //             new Value(Material.Ore, 4)],
        //         3,
        //         new Benefit(Trigger.Income, null, null, [new Value(4, Material.Power), new Value(1, Material.Power)]));
        //     this.institute.push(geodensInstitute);

        // } else if (this.race === RaceType.Baltaks) {
        //     const baltaksInstitute = new Structure(StructureType.Institute,
        //         [new Value(Material.Gold, 6),
        //             new Value(Material.Ore, 4)],
        //         3,
        //         new Benefit(Trigger.Income, null, null, [new Value(4, Material.Power), new Value(1, Material.Power)]));
        //     this.institute.push(baltaksInstitute);

        // } else if (this.race === RaceType.Firaks) {
        //     const firaksInstitute = new Structure(StructureType.Institute,
        //         [new Value(Material.Gold, 6),
        //             new Value(Material.Ore, 4)],
        //         3,
        //         new Benefit(Trigger.Income, null, null, [new Value(4, Material.Power), new Value(1, Material.Power)]));

        //     this.institute.push(firaksInstitute);

        // } else if (this.race === RaceType.Bescods) {
        //     const bescodsInstitute = new Structure(StructureType.Institute,
        //         [new Value(Material.Gold, 6),
        //             new Value(Material.Ore, 4)],
        //         3,
        //         new Benefit(Trigger.Income, null, null, [new Value(4, Material.Power), new Value(2, Material.Power)]));

        //     this.institute.push(bescodsInstitute);
        // }
    }

        /**
         * this function serve for the techtile of changing power value of bigbuilding
         * @param value
         */
        public changeBigBuildingPowerValue(value: number){
            for(let i = 0; i < this.academies.length; i++){
                this.academies[i].changePowerValue(value);
            }
            this.institute[0].changePowerValue(value);
        }


        /**
         * Get mine
         */

}
export {BuildingLib};
