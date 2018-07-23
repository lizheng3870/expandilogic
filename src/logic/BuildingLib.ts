import {StructureType, Structure} from "./Structure";
import {RaceType} from "./Player";
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
    public gaiaformer: Structure[];
    public race: RaceType;

    constructor(race: RaceType) {
        this.race = race;

            /**
             * Mine types on Faction Board
             */
            //Mine 1
            const mine1 = new Structure(StructureType.Mine,
                                [new Value(Material.Gold, 2),
                                    new Value(Material.Ore, 1)],
                                1,
                                new Benefit(Trigger.Income, null,
                                    null, [new Value(1, Material.Ore)]));
            //Mine 2
            const mine2 = new Structure(StructureType.Mine,
                                [new Value(Material.Gold, 2),
                                    new Value(Material.Ore, 1)],
                                1,
                                new Benefit(Trigger.Income, null,
                                    null, [new Value(0, Material.Ore)]));

            /**
             * Trading Station types on Faction Board
             */
            const station1 = new Structure(StructureType.Station,
                                [new Value(Material.Gold, 3),
                                    new Value(Material.Ore, 1)],
                                2,
                                new Benefit(Trigger.Income, null,
                                    null, [new Value(3, Material.Gold)]));

            const station2 = new Structure(StructureType.Station,
                                [new Value(Material.Gold, 3),
                                    new Value(Material.Ore, 1)],
                                2,
                                new Benefit(Trigger.Income, null,
                                    null, [new Value(4, Material.Gold)]));

            const station3 = new Structure(StructureType.Station,
                                [new Value(Material.Gold, 3),
                                    new Value(Material.Ore, 1)],
                                2,
                                new Benefit(Trigger.Income, null,
                                    null, [new Value(5, Material.Gold)]))

            /**
             * Lab types on Faction Board
             */
            const lab = new Structure(StructureType.Lab,
                            [new Value(Material.Gold, 5),
                                new Value(Material.Ore, 3)],
                                2, new Benefit(Trigger.Income, null, null, [new Value(1, Material.Science)]));


             /**
              * Academy types on Faction Board
              */

            const academy1 = new Structure(StructureType.Academy,
                                [new Value(Material.Gold, 6),
                                    new Value(Material.Ore, 6)],
                                    3, new Benefit(Trigger.Income, null, null, [new Value(2, Material.Science)]));

            const academy1a = new Structure(StructureType.Academy,
                                [new Value(Material.Gold, 6),
                                    new Value(Material.Ore, 6)],
                                    3, new Benefit(Trigger.Income, null, null, [new Value(3, Material.Science)]));


            const academy2 = new Structure(StructureType.Academy,
                                [new Value(Material.Gold, 6),
                                    new Value(Material.Ore, 6)],
                                3,
                                new Benefit(Trigger.Special, null, null, [new Value(1, Material.QIC)]));

            const academy2a = new Structure(StructureType.Academy,
                                [new Value(Material.Gold, 6),
                                    new Value(Material.Ore, 6)],
                                3,
                                new Benefit(Trigger.Special, null, null, [new Value(4, Material.Gold)]));


        //      /**
        //       * Adds Mines
        //       */
        //     for (let i = 1; i <= 8; i++) {
        //         if (i === 3) {
        //             this.mines.push(mine2);
        //         } else {
        //             this.mines.push(mine1);
        //         }
        //     }
        //     /**
        //      * Adds Trading stations
        //      */
        //     if (this.race === RaceType.Bescods) {
        //         this.station.push(lab);
        //         this.station.push(lab);
        //         this.station.push(lab);
        //         this.station.push(lab);
        //     } else {
        //         this.station.push(station1);
        //         this.station.push(station2);
        //         this.station.push(station2);
        //         this.station.push(station3);
        //    }

        //     /**
        //      * Adds Labs
        //      */
        //     if (this.race === RaceType.Bescods) {
        //         this.lab.push(station1);
        //         this.lab.push(station2);
        //         this.lab.push(station3);
        //     } else {
        //         for (let i = 1; i <= 3; i++) {
        //             this.lab.push(lab);
        //         }
        //     }

        //     /**
        //      * Adds Academies
        //      */
        //     if (this.race === RaceType.Itars) {
        //         this.academies.push(academy1a);
        //         this.academies.push(academy2);
        //     } else if (this.race === RaceType.Baltaks) {
        //         this.academies.push(academy1);
        //         this.academies.push(academy2a);
        //     } else {
        //         this.academies.push(academy1);
        //         this.academies.push(academy2);
        //     }

            /**
             * Adds Institute
             * Different Institute powers
             */
            if (this.race === RaceType.Terrans) {
                let values:Value[] = [new Value(Material.Gold, 6), new Value(Material.Ore, 4)];
                let benefit:Benefit = new Benefit(Trigger.Income, null, null, [new Value(1, Material.ExtraPower), new Value(4, Material.Power)]);

                const terranInstitute = new Structure(StructureType.Institute, values, 3, benefit);

                this.institute.push(terranInstitute);

            } else if (this.race === RaceType.Lantids){
                const lantidsInstitute = new Structure(StructureType.Institute,
                                            [new Value(Material.Gold, 6),
                                                new Value(Material.Ore, 4)],
                                            3,
                                            new Benefit(Trigger.Income, null, null, [new Value(4, Material.Power)]));
                this.institute.push(lantidsInstitute);

            } else if(this.race === RaceType.Xenos) {
                const xenosInstitute = new Structure(StructureType.Institute,
                                            [new Value(Material.Gold, 6),
                                                new Value(Material.Ore, 4)],
                                            3,
                                            new Benefit(Trigger.Income, null, null, [new Value(4, Material.Power), new Value(1, Material.QIC)]));
                this.institute.push(xenosInstitute);


            } else if (this.race === RaceType.Gleens) {
                const gleensInstitute = new Structure(StructureType.Institute,
                                            [new Value(Material.Gold, 6),
                                                new Value(Material.Ore, 4)],
                                            3,
                                            new Benefit(Trigger.Income, null, null, [new Value(4, Material.Power), new Value(1, Material.Ore)]));
                this.institute.push(gleensInstitute);

            } else if (this.race === RaceType.Taklons) {
                const taklonsInstitute = new Structure(StructureType.Institute,
                                            [new Value(Material.Gold, 6),
                                                new Value(Material.Ore, 4)],
                                            3,
                                            new Benefit(Trigger.Income, null, null, [new Value(4, Material.Power), new Value(1, Material.Power)]));
                this.institute.push(taklonsInstitute);

            } else if (this.race === RaceType.Ambas) {
                const ambasInstitute = new Structure(StructureType.Institute,
                    [new Value(Material.Gold, 6),
                        new Value(Material.Ore, 4)],
                    3,
                    new Benefit(Trigger.Income, null, null, [new Value(4, Material.Power), new Value(2, Material.Power)]));
                this.institute.push(ambasInstitute);

            } else if (this.race === RaceType.Nevlas) {
                const nevlasInstitute = new Structure(StructureType.Institute,
                    [new Value(Material.Gold, 6),
                        new Value(Material.Ore, 4)],
                    3,
                    new Benefit(Trigger.Income, null, null, [new Value(4, Material.Power), new Value(1, Material.Power)]));
                this.institute.push(nevlasInstitute);

            } else if (this.race === RaceType.Itars) {
                const itarsInstitute = new Structure(StructureType.Institute,
                    [new Value(Material.Gold, 6),
                        new Value(Material.Ore, 4)],
                    3,
                    new Benefit(Trigger.Income, null, null, [new Value(4, Material.Power), new Value(1, Material.Power)]));
                this.institute.push(itarsInstitute);

            } else if (this.race === RaceType.Ivits) {
                const ivitsInstitute = new Structure(StructureType.Institute,
                    [new Value(Material.Gold, 6),
                        new Value(Material.Ore, 4)],
                    3,
                    new Benefit(Trigger.Income, null, null, [new Value(4, Material.Power), new Value(1, Material.Power)]));
                this.institute.push(ivitsInstitute);

            } else if (this.race === RaceType.HadschHallas) {
                const hHInstitute = new Structure(StructureType.Institute,
                    [new Value(Material.Gold, 6),
                        new Value(Material.Ore, 4)],
                    3,
                    new Benefit(Trigger.Income, null, null, [new Value(4, Material.Power), new Value(1, Material.Power)]));

                this.institute.push(hHInstitute);

            } else if (this.race === RaceType.Geodens) {
                const geodensInstitute = new Structure(StructureType.Institute,
                    [new Value(Material.Gold, 6),
                        new Value(Material.Ore, 4)],
                    3,
                    new Benefit(Trigger.Income, null, null, [new Value(4, Material.Power), new Value(1, Material.Power)]));
                this.institute.push(geodensInstitute);

            } else if (this.race === RaceType.Baltaks) {
                const baltaksInstitute = new Structure(StructureType.Institute,
                    [new Value(Material.Gold, 6),
                        new Value(Material.Ore, 4)],
                    3,
                    new Benefit(Trigger.Income, null, null, [new Value(4, Material.Power), new Value(1, Material.Power)]));
                this.institute.push(baltaksInstitute);

            } else if (this.race === RaceType.Firaks) {
                const firaksInstitute = new Structure(StructureType.Institute,
                    [new Value(Material.Gold, 6),
                        new Value(Material.Ore, 4)],
                    3,
                    new Benefit(Trigger.Income, null, null, [new Value(4, Material.Power), new Value(1, Material.Power)]));

                this.institute.push(firaksInstitute);

            } else if (this.race === RaceType.Bescods) {
                const bescodsInstitute = new Structure(StructureType.Institute,
                    [new Value(Material.Gold, 6),
                        new Value(Material.Ore, 4)],
                    3,
                    new Benefit(Trigger.Income, null, null, [new Value(4, Material.Power), new Value(2, Material.Power)]));

                this.institute.push(bescodsInstitute);
            }
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
