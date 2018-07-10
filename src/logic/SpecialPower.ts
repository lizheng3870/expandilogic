import { Benefit, Trigger, Count, Structure, Material, Value } from "./Benefit";
import { Player } from "./Player";

const enum SpecialPowerType {
    QIC1,
    Dig1,
    SpecialRange3,
    Power4,
    QIC1Gold5,
    Ore3,
    Science3
}

class SpecialPower{
    public id: SpecialPowerType;
    public benefit: Benefit;
    // the power -> activated true -> can be use -> use it -> available false -> after a turn -> available true;
    public activated: boolean; // if this power is activated, after it is activated, you can use it
    public available: boolean; // if this power is used this turn, use it will cause available turn false

    constructor(id: SpecialPowerType){
        if(id === SpecialPowerType.QIC1){
            this.id = id;
            this.benefit = new Benefit(Trigger.Special, Count.None, Structure.None, [new Value(1, Material.QIC)]);
            this.activated = false;
            this.activated = false;
        }
        if(id === SpecialPowerType.Dig1){
            this.id = id;
            this.benefit = new Benefit(Trigger.Special, Count.None, Structure.None, [new Value(1, Material.SpecialDig)]);
            this.activated = false;
            this.activated = false;
        }
        if(id === SpecialPowerType.SpecialRange3){
            this.id = id;
            this.benefit = new Benefit(Trigger.Special, Count.None, Structure.None, [new Value(3, Material.SpecialRange)]);
            this.activated = false;
            this.activated = false;
        }
        if(id === SpecialPowerType.Power4){
            this.id = id;
            this.benefit = new Benefit(Trigger.Special, Count.None, Structure.None, [new Value(4, Material.Power)]);
            this.activated = false;
            this.activated = false;
        }
        if(id === SpecialPowerType.QIC1Gold5){
            this.id = id;
            this.benefit = new Benefit(Trigger.Special, Count.None, Structure.None, [new Value(1, Material.QIC), new Value(5, Material.Gold)]);
            this.activated = false;
            this.activated = false;
        }
        if(id === SpecialPowerType.Ore3){
            this.id = id;
            this.benefit = new Benefit(Trigger.Special, Count.None, Structure.None, [new Value(3, Material.Ore)]);
            this.activated = false;
            this.activated = false;
        }
        if(id === SpecialPowerType.Science3){
            this.id = id;
            this.benefit = new Benefit(Trigger.Special, Count.None, Structure.None, [new Value(3, Material.Science)]);
            this.activated = false;
            this.activated = false;
        }
    }

    /**
     * when you get the special power, activate it and make it available;
     */
    public activatePower(){
        if(this.activated === true){
            console.log("special power already activated");
            return;
        }
        this.activated = true;
        this.available = true;
    }

    /**
     * when you get an advance techtile, you may need to turn off some kind of special power
     */
    public turnOffPower(){
        if(this.activated === false){
            console.log("special power is already off");
            return;
        }
        this.activated = false;
        this.available = false;
    }

    public usePower(player: Player){
        if(this.activated === false){
            console.log("special power is not activated, you can not use it");
            return;
        }
        if(this.available === false){
            console.log("you have already used this power, wait for the nxt turn");
            return;
        }
        const values = this.benefit.benefits;
        let i = 0;
        let value;
        for(; i < values.length; i++){
            value = values[i];
            if(value.material === Material.Gold){ 
                player.gold += value.quantity; 
            }
            if(value.material === Material.Ore){ 
                player.ore += value.quantity;
            }
            if(value.material === Material.Science){
                player.science += value.quantity;
            }
            if(value.material === Material.QIC){ player.qic += value.quantity; }
            if(value.material === Material.Power){ player.power1 += value.quantity; }
            if(value.material === Material.Power){
                player.chargePower(value.quantity); 
            }
            if(value.material === Material.Dig){ /*lets discuss player part later --- by yalei*/ }
            if(value.material === Material.VP){ player.vp += value.quantity; }
            if(value.material === Material.SpecialDig){ /*what is the special dig? ---by yalei*/ }
            if(value.material === Material.SpecialRange){ player.specialRange += value.quantity; }
            if(value.material === Material.GaiaFormer){player.gaiaformer += value.quantity;}
        }
        this.available = false;
    }

    /**
     * every beginning of the turn the power will turn available
     */
    public recoverPower(){
        this.available = true;
    }

}

export {SpecialPowerType, SpecialPower}