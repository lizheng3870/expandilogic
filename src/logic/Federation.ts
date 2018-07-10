import {Benefit, Count, Trigger, Material, Structure} from './Benefit'


// todo rename a better name like VP VP
enum Fed{
  vp12,
  vp8qic1,
  vp8pw2,
  vp7ore2,
  vp7gold6,
  vp6Sci2,
  ore1Sci1gold2
}

class Federation {
  public fed: Fed
  public spendable: boolean
  public effect: Benefit

  constructor(){
    
  }
}

export {Federation, Fed};
