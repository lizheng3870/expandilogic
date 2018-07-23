import {Hex } from './Hex'
import {StructureType } from './Structure'
import {ActionType } from './Action'
import {Merchandise} from './Exchange'



enum RequestType{
    Action,
    Roundbooter,
}

enum UpgradeType{
    MineToStation,
    StationToInstitute,
    StationToLab,
    LabToAcademy,
}

enum TokenType{
  Roundbooter,
  TechTile,
  Federation
}

class Request {
    public pid: number  // player id for game for example 0 1 2 3
    public type: RequestType
    public roundBoosterID: number
    public hex: Hex   // location of planet
    public actionType: ActionType
    public upgradeType: UpgradeType  // upgrade
    public path: Hex[]  // for Federation
    public techLane: number
    public techTileID: number
    public purchase: Merchandise  // for PowerAndQIC actions
    public specialTokenType:TokenType
    public freePurchase: Merchandise  // for free action


}

export {Request, RequestType, UpgradeType}
