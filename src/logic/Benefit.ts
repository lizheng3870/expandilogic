enum Material {
    Gold,
    Ore,
    Science,
    QIC,
    Power, // charge power
    ExtraPower,
    VP,
    Dig, // you can buy the dig chance from the store
    SpecialRange, // some special power or round booster can give you temporary range
    GaiaFormer, // the tech of Gaia will give the player new gaia former
    techtile,
    Feds,
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
    Sectors,
    Mines,
    TradingStations,
    Labs,
    BigBuildings,
    Feds,
    PlanetTypes,
    Satellites,
    Gaia
}

class Value {
    constructor(public quantity : number, public material : Material){}
}

enum BuildingType {  // when trigger is build, and buiding same BuildingType will get benefit
    Mine,
    // there is a techtile which is get 3 VP when you build a mine on gaia;
    // and there is a techtile which is get 3 VP when you build a mine;
    // so we need a new type MineOnGaia to distinguish them;
    MineOnGaia,
    TradingStation,
    Lab,
    Academy,
    Institute,
    BigBuildings
}

class Benefit {
    // this is when the benefit happens
    public trigger: Trigger
    // this is an optional multiplier for the benefit
    public count: Count | null
    // an optional Structure component
    // i.e., when you build this, you get something
    public object: BuildingType | null
    // a list of the total benefits here - usually, but not always, one entry
    public values : Value[]
    constructor( trigger: Trigger, count: Count | null, object: BuildingType|null, values: Value[] ){
        this.trigger = trigger
        this.count = count
        this.object = object
        this.values = values
    }
}

export  {Benefit, Value, Material, Count, BuildingType, Trigger}
