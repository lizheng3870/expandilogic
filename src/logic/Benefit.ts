enum Material {
    Gold,
    Ore,
    Science,
    QIC,
    Power, 
    ExtraPower,
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
    Buy,
}

enum Count {
    Sectors,
    Mines,
    TradingStations,
    Labs,
    BigBuildings,
    Feds,
    PlanetTypes,
    Satellites,
    Gaia,
    None // this none means the benefit do not need to count anything
}

enum Structure {
    Mine,
    // there is a techtile which is get 3 VP when you build a mine on gaia;
    // and there is a techtile which is get 3 VP when you build a mine;
    // so we need a new type MineOnGaia to distinguish them;
    MineOnGaia, 
    TradingStation,
    Lab,
    Academy,
    Institute,
    None // this none means the benefit do not require the building type
}

class Benefit {
    // this is when the benefit happens
    public trigger: Trigger
    // this is an optional multiplier for the benefit
    public count: Count | null
    // an optional Structure component
    public object: Structure | null
    // a list of the total benefits here - usually, but not always, one entry
    public benefits : Value[]
    constructor( trigger: Trigger, count: Count, object: Structure, benefits: Value[] ){
        this.trigger = trigger
        this.count = count
        this.object = object
        this.benefits = benefits
    }
}

export  {Benefit, Value, Material, Count, Structure, Trigger}
