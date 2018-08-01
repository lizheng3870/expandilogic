import {Hex } from './Hex'
import {StructureType } from './Structure'
import {ActionType } from './Action'
import {Merchandise} from './Exchange'
import {StoreMerchandiseType} from './Store'
import {Material} from './Benefit'



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

enum SpecialActionSource{
  RoundBooster,
  TechTile,
  LastInstitute,
  LastAcademy,
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
    public techLane: TechLaneType   // search action
    public techTileID: number    // 0 - 14   for update action lab or academy pickup techtile , detail below
    public offTechId: number  // related with advanced techtile, see detail below
    public purchase: Merchandise  // for PowerAndQIC actions
    public specialActionSource:SpecialActionSource
    public freePurchase: Merchandise  // for free action
    public storeMerchandiseType: StoreMerchandiseType // Power and QIC
    public freeExchangeItems: Material[]   //
    public freeExchangeTimes:number //

}

/*
* You must have at least one uncovered standard tech tile.
   When you gain an advanced tech tile, place it faceup covering one

   update action lab or academy pickup techtile
   case one:  takeNormal6TechTiles  techTileID  0 1 2 3 4 5
   case two:  takeNormal3TechTiles  techTileID  6 7 8
   case three: takeAdvancedTechTiles techTileID 9 10 11 12 13 14 offTechId  0 - 8  offTechId is ID of covered standard tech tile



*/




export {Request, RequestType, UpgradeType, TechLaneType, SpecialActionSource}
