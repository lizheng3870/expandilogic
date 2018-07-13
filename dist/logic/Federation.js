"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Federation = /** @class */ (function () {
    function Federation(planets, benefit) {
        this.planets = planets;
        this.benefit = benefit;
        this.used = false;
        //total 7 kinds of federation
        this.planets = planets;
        this.benefit = benefit;
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
    // add a planet with our building on it into this federation
    // this happens when building on a planet that touches an existing federation
    Federation.prototype.addPlanet = function (p) {
        this.planets.push(p);
    };
    // return total number of satellites
    Federation.prototype.getTotalSatellites = function () {
        return this.satellites.length;
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
    return Federation;
}());
exports.Federation = Federation;
