enum Material {
    Gold,
    Ore,
    Science,
    QIC,
    Power, 
  //  ExtraPower,
    Charge,
    GaiaFormingPower,//yalei: the type of gaia forming way
    Dig,
    VP,
    SpecialDig,
    SpecialRange,
    GaiaFormer
}

class Value {
    public quantity : number;
    public material : Material
    constructor(quantity : number, material : Material){
      this.quantity = quantity;
      this.material = material;

    }
}

const enum Trigger {
    Now,
    Fed,
    Dig,
    Build,
    Income,
    Pass,
    Special,
    ScienceUp,
    GaiaBuild,
    Buy
}

enum Count {
    Sectors = 'sectors',
    Mines = 'mines',
    TradingStations = 'tradingstations',
    Labs = 'labs',
    BigBuildings = 'bigbuildings',
    Feds = 'feds',
    PlanetTypes = 'planetTypes',
    Satellites = 'satellites',
    Gaia = 'gaia',
    None = 'none'
}

enum Struct {
    Mine = 'mine',
    TradingStation = 'trading',
    Lab = 'Lab',
    Academy = 'academy',
    Institute = 'institute',
    None = "none"
}


class Benefit {
    public trigger: Trigger
    public count: Count | null
    public object: Struct | null
    public benefits : Value[]
    constructor(trigger: Trigger, count: Count, object: Struct, benefits: Value[]){
        this.trigger = trigger
        this.count = count
        this.object = object
        this.benefits = benefits
    }
}

export  {Benefit, Value, Material, Count, Struct, Trigger}
