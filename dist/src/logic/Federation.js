import { Benefit, Count, Material, Structure, Value } from './Benefit';
var Fed;
(function (Fed) {
    Fed[Fed["vp12"] = 0] = "vp12";
    Fed[Fed["vp8qic1"] = 1] = "vp8qic1";
    Fed[Fed["vp8pw2"] = 2] = "vp8pw2";
    Fed[Fed["vp7ore2"] = 3] = "vp7ore2";
    Fed[Fed["vp7gold6"] = 4] = "vp7gold6";
    Fed[Fed["vp6Sci2"] = 5] = "vp6Sci2";
    Fed[Fed["ore1Sci1gold2"] = 6] = "ore1Sci1gold2"; // id 6
})(Fed || (Fed = {}));
var Federation = /** @class */ (function () {
    function Federation(fedName, planets, benefit) {
        this.used = false;
        //total 7 kinds of federation
        this.planets = planets;
        this.benefit = benefit;
        if (fedName === Fed.vp12) {
            this.fed = fedName;
            this.used = true;
            this.benefit = new Benefit(0 /* Now */, Count.None, Structure.None, [new Value(12, Material.VP)]);
        }
        if (fedName === Fed.vp8qic1) {
            this.fed = fedName;
            this.benefit = new Benefit(0 /* Now */, Count.None, Structure.None, [new Value(8, Material.VP), new Value(1, Material.QIC)]);
        }
        if (fedName === Fed.vp8pw2) {
            this.fed = fedName;
            this.benefit = new Benefit(0 /* Now */, Count.None, Structure.None, [new Value(8, Material.VP), new Value(2, Material.Power)]);
        }
        if (fedName === Fed.vp7ore2) {
            this.fed = fedName;
            this.benefit = new Benefit(0 /* Now */, Count.None, Structure.None, [new Value(7, Material.VP), new Value(2, Material.Ore)]);
        }
        if (fedName === Fed.vp7gold6) {
            this.fed = fedName;
            this.benefit = new Benefit(0 /* Now */, Count.None, Structure.None, [new Value(7, Material.VP), new Value(6, Material.Gold)]);
        }
        if (fedName === Fed.vp6Sci2) {
            this.fed = fedName;
            this.benefit = new Benefit(0 /* Now */, Count.None, Structure.None, [new Value(6, Material.VP), new Value(2, Material.Science)]);
        }
        if (fedName === Fed.ore1Sci1gold2) {
            this.fed = fedName;
            this.benefit = new Benefit(0 /* Now */, Count.None, Structure.None, [new Value(2, Material.Gold), new Value(1, Material.Science), new Value(1, Material.Ore)]);
        }
    }
    // use the federation to go into the top spot on a tech track
    Federation.prototype.spend = function () {
        if (this.used) {
            throw new Error("can't spend a federation twice");
        }
        else {
            this.used = true;
        }
    };
    /**
     * when buy a specific stuff in the store, the grey fed can turn green
     */
    Federation.prototype.turnGreen = function () {
        this.used = false;
    };
    // return the total number of buildings in the federation
    Federation.prototype.getTotalBuildings = function () {
        return this.planets.length;
    };
    Federation.prototype.getTotalPower = function () {
        var sum = 0;
        this.planets.forEach(function (p) {
            sum += p.type;
        });
        return sum;
    };
    /**
     * for output to screen purpose. return a readable string
     */
    Federation.prototype.getFedName = function () {
        if (this.fed === Fed.vp12)
            return "12 VP";
        if (this.fed === Fed.vp8qic1)
            return "8 VP, 1 qic";
        if (this.fed === Fed.vp8pw2)
            return "8 VP, 2 power";
        if (this.fed === Fed.vp7ore2)
            return "7 VP, 2 ore";
        if (this.fed === Fed.vp7gold6)
            return "7 VP, 6 gold";
        if (this.fed === Fed.vp6Sci2)
            return "6 VP, 2 science";
        if (this.fed === Fed.ore1Sci1gold2)
            return "1 ore, 2 gold, 1 science";
    };
    return Federation;
}());
var Federations = /** @class */ (function () {
    function Federations() {
        var tempArr = [0, 1, 2, 3, 4, 5];
        tempArr.sort(function () { return 0.5 - Math.random(); });
        // assign the special one;
        var tempNum = tempArr[5];
        var fed = this.hashFed(tempNum);
        if (fed != null)
            this.specialOne = new Federation(fed);
        // assign the five
        for (var i = 0; i < 5; i++) {
            fed = this.hashFed(tempNum[i]);
            if (fed != null)
                this.sixNormal[i] = new Federation(fed);
        }
    }
    /**
     * return the special one
     */
    Federations.prototype.getSpecial = function () {
        return this.specialOne;
    };
    /**
     * an suport function to hash the id to the fed;
     * @param id
     */
    Federations.prototype.hashFed = function (id) {
        if (id === 0)
            return Fed.vp12;
        if (id === 1)
            return Fed.vp8qic1;
        if (id === 2)
            return Fed.vp8pw2;
        if (id === 3)
            return Fed.vp7ore2;
        if (id === 4)
            return Fed.vp7gold6;
        if (id === 5)
            return Fed.vp6Sci2;
        if (id === 6)
            return Fed.ore1Sci1gold2;
        return null;
    };
    return Federations;
}());
export { Federations, Federation, Fed };
