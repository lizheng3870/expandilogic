import { Benefit, Trigger, Count, BuildingType, Material, Value } from "./Benefit";
import { Player } from "./Player";

const enum SpecialPowerType {
    QIC1          = 'QIC1         ',
    Dig1          = 'Dig1         ',
    SpecialRange3 = 'SpecialRange3',
    Power4        = 'Power4       ',
    QIC1Gold5     = 'QIC1Gold5    ',
    Ore3          = 'Ore3         ',
    Science3      = 'Science3     '
}

class SpecialPower{
    public id: SpecialPowerType;
    public benefit: Benefit;
    // the power -> ifGet true -> can be use -> use it -> ifUsable false -> after a turn -> ifUsable true;
    public ifGet: boolean; // if this power is ifGet, after it is ifGet, you can use it
    public ifUsable: boolean; // if this power is used this turn, use it will cause ifUsable turn false

    constructor(id: SpecialPowerType){
        if(id === SpecialPowerType.QIC1){
            this.id = id;
            this.benefit = new Benefit(Trigger.Special, null, null, [new Value(1, Material.QIC)]);
            this.ifGet = false;
            this.ifUsable = false;
        }
        if(id === SpecialPowerType.Dig1){
            this.id = id;
            this.benefit = new Benefit(Trigger.Special, null, null, [new Value(1, Material.Dig)]);
            this.ifGet = false;
            this.ifUsable = false;
        }
        if(id === SpecialPowerType.SpecialRange3){
            this.id = id;
            this.benefit = new Benefit(Trigger.Special, null, null, [new Value(3, Material.SpecialRange)]);
            this.ifGet = false;
            this.ifUsable = false;
        }
        if(id === SpecialPowerType.Power4){
            this.id = id;
            this.benefit = new Benefit(Trigger.Special, null, null, [new Value(4, Material.Power)]);
            this.ifGet = false;
            this.ifUsable = false;
        }
        if(id === SpecialPowerType.QIC1Gold5){
            this.id = id;
            this.benefit = new Benefit(Trigger.Special, null, null, [new Value(1, Material.QIC), new Value(5, Material.Gold)]);
            this.ifGet = false;
            this.ifUsable = false;
        }
        if(id === SpecialPowerType.Ore3){
            this.id = id;
            this.benefit = new Benefit(Trigger.Special, null, null, [new Value(3, Material.Ore)]);
            this.ifGet = false;
            this.ifUsable = false;
        }
        if(id === SpecialPowerType.Science3){
            this.id = id;
            this.benefit = new Benefit(Trigger.Special, null, null, [new Value(3, Material.Science)]);
            this.ifGet = false;
            this.ifUsable = false;
        }
    }

    /**
     * when you get the special power, activate it and make it Usable;
     */
    public activatePower(){
        if(this.ifGet === true){
            console.log("special power already ifGet");
            return;
        }
        this.ifGet = true;
        this.ifUsable = true;
    }

    /**
     * when you get an advance techtile, you may need to turn off some one of special powers
     */
    public turnOffPower(){
        if(this.ifGet === false){
            console.log("special power is already off");
            return;
        }
        this.ifGet = false;
        this.ifUsable = false;
    }

    public usePower(player: Player){
        if(this.ifGet === false){
            console.log("special power is not ifGet, you can not use it");
            return;
        }
        if(this.ifUsable === false){
            console.log("you have already used this power, wait for the nxt turn");
            return;
        }
        const values = this.benefit.values;
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
            if(value.material === Material.Power){ player.power.bowl1 += value.quantity; }
            if(value.material === Material.Power){
                player.chargePower(value.quantity); 
            }
            if(value.material === Material.Dig){ player.specialDig += value.quantity; }
            if(value.material === Material.VP){ player.vp += value.quantity; }
            if(value.material === Material.SpecialRange){ player.specialRange += value.quantity; }
            if(value.material === Material.GaiaFormer){player.gaiaformer += value.quantity;}
        }
        this.ifUsable = false;
    }

    /**
     * every beginning of the turn the power will turn usable
     */
    public recoverPower(){
        if(this.ifGet) this.ifUsable = true;
    }

}

export {SpecialPowerType, SpecialPower}