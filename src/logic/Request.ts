//import { Player } from './Player'
import {Hex } from './Hex'

enum RequestType{
    Roundbooter,
    Mine,
    Gaia,
    Upgrade,
    Federate,
    Research,
    Special,
    Pass

}

class Request {
    public pid: number  // player id for game for example 0 1 2 3
    public type:RequestType
    public roundBoosterID:number
    public hex:Hex
}

export {Request, RequestType}
