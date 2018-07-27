import {Hex } from './Hex'
import {StructureType } from './Structure'
import {ActionType } from './Action'
import {Merchandise} from './Exchange'
import {StoreMerchandiseType} from './Store'



enum RequestType{
    Action,
    Roundbooter,
    FirstStructures,  // Placing Your First Structures
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

enum TechLaneType{
  Dig = 0,
  Range = 1,
  QIC = 2,
  Gaia = 3,
  Resource = 4,
  Science = 5,
}

class Request {
    public pid: number  // player id for game for example 0 1 2 3
    public type: RequestType
    public roundBoosterID: number
    public hex: Hex   // location of planet
    public actionType: ActionType
    public upgradeType: UpgradeType  // upgrade
    public path: Hex[]  // for Federation
    public techLane: TechLaneType
    public techTileID: number
    public purchase: Merchandise  // for PowerAndQIC actions
    public specialTokenType:TokenType
    public freePurchase: Merchandise  // for free action
    public storeMerchandiseType: StoreMerchandiseType // Power and QIC



}

export {Request, RequestType, UpgradeType, TechLaneType}
