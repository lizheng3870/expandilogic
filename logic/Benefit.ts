

class Value {
    public quantity : number;
    public material : Material
    constructor(quantity : number, material : Material){
      this.quantity = quantity;
      this.material = material;

    }
}

enum Material {
    Gold,
    Ore,
    Science,
    QIC,
    Power, 
  //  ExtraPower,
    Charge,
    Dig,
    VP,
    SpecialDig,
    SpecialRange
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
    Gaia = 'gaia'
}

enum Struct {
    Mine = 'mine',
    TradingStation = 'trading',
    Lab = 'Lab',
    BigBuildings = 'bigbuildings',
    Academy = 'academy',
    Institute = 'institute'
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


class Benefit {
    public trigger: Trigger
    public count: Count
    public object: Struct
    public benefits : Value[]
    constructor(trigger: Trigger, count: Count, object: Struct, benefits: Value[]){
        this.trigger = trigger
        this.count = count
        this.object = object
        this.benefits = benefits
    }


}

export  { Benefit, Value, Material, Count, Struct, Trigger}
