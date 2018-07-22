import {Hex } from './Hex'
import {StructureType } from './Structure'
import {ActionType } from './Action'


enum RequestType{
    Action,
    Roundbooter,
}

class Request {
    public pid: number  // player id for game for example 0 1 2 3
    public type: RequestType
    public roundBoosterID: number
    public hex: Hex
    public actionType: ActionType
    public upateTo: StructureType  // upgrade
}

export {Request, RequestType}
