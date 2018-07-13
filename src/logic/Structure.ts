import {Benefit, Value}   from './Benefit'

enum Building {
  Mine,
  Station,
  Lab,
  Academy,
  Institute,
}
enum BuildingStatus{
  Built,
  Unbuilt
}

class StructureType {
  public value : number
  public cost : Value[]
  public type : Building
  public owner : number  // change type from player to numer for playerID
  public status : BuildingStatus
  public benefit : Benefit
  public location : Location | null = null
  
  constructor(type: Building, price: Value[], power: number, benefit: Benefit){
    this.value = power
    this.status = BuildingStatus.Unbuilt
    this.type = type
    this.cost = price
    this.benefit = benefit
  }

  /**
   * when get or loose the tech tile of changing value, this function will work
   * @param value 
   */
  public changePowerValue(value: number){
    this.value = value;
  }

}

export {StructureType, Building}
