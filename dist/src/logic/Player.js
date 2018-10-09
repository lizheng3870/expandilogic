"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Terrans_1 = require("./Races/Terrans");
var Nevlas_1 = require("./Races/Nevlas");
var HadschHallas_1 = require("./Races/HadschHallas");
var Xenos_1 = require("./Races/Xenos");
var Lantids_1 = require("./Races/Lantids");
var Gleens_1 = require("./Races/Gleens");
var Taklons_1 = require("./Races/Taklons");
var Ambas_1 = require("./Races/Ambas");
var Itars_1 = require("./Races/Itars");
var Ivits_1 = require("./Races/Ivits");
var Geodens_1 = require("./Races/Geodens");
var Baltaks_1 = require("./Races/Baltaks");
var Firaks_1 = require("./Races/Firaks");
var Bescods_1 = require("./Races/Bescods");
var Race_1 = require("./Race");
exports.RaceType = Race_1.RaceType;
/**
 * Create a player
 * Used by Game.ts
 * @param name
 * @param raceType
 */
function CreatePlayer(name, raceType) {
    var player = new Terrans_1.Terrans("");
    if (raceType === Race_1.RaceType.Terrans) { //blue
        player = new Terrans_1.Terrans(name);
    }
    if (raceType === Race_1.RaceType.Xenos) {
        player = new Xenos_1.Xenos(name);
    }
    if (raceType === Race_1.RaceType.HadschHallas) {
        player = new HadschHallas_1.HadschHallas(name);
    }
    if (raceType === Race_1.RaceType.Nevlas) {
        player = new Nevlas_1.Nevlas(name);
    }
    // add new 10
    if (raceType === Race_1.RaceType.Lantids) { //blue
        player = new Lantids_1.Lantids(name);
    }
    if (raceType === Race_1.RaceType.Gleens) {
        player = new Gleens_1.Gleens(name);
    }
    if (raceType === Race_1.RaceType.Taklons) {
        player = new Taklons_1.Taklons(name);
    }
    if (raceType === Race_1.RaceType.Ambas) {
        player = new Ambas_1.Ambas(name);
    }
    if (raceType === Race_1.RaceType.Itars) { //blue
        player = new Itars_1.Itars(name);
    }
    if (raceType === Race_1.RaceType.Ivits) {
        player = new Ivits_1.Ivits(name);
    }
    if (raceType === Race_1.RaceType.Geodens) {
        player = new Geodens_1.Geodens(name);
    }
    if (raceType === Race_1.RaceType.Baltaks) {
        player = new Baltaks_1.Baltaks(name);
    }
    if (raceType === Race_1.RaceType.Firaks) { //blue
        player = new Firaks_1.Firaks(name);
    }
    if (raceType === Race_1.RaceType.Bescods) {
        player = new Bescods_1.Bescods(name);
    }
    return player;
}
exports.CreatePlayer = CreatePlayer;
