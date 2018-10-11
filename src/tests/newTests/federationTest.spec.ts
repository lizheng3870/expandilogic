
import * as Lab from 'lab'

import { expect } from 'code'
import { Player , CreatePlayer, RaceType} from '../../logic/Player';
import { Benefit, Trigger, Value, Material, BuildingType } from '../../logic/Benefit';
import TechBoard from '../../logic/TechBoard';
import Tech from '../../logic/Tech';
import { FederationLib, FederationTokenType } from '../../logic/Federation';
import { MapBoard, Hex } from '../../logic/MapBoard';
import { Action } from '../../logic/Action';
import { Game } from '../../logic/Game';
import { Request } from '../../logic/Request';
import { PlanetType } from '../../logic/Planet';

const lab = Lab.script()
const { describe, it, before, beforeEach } = lab
export { lab }



describe('Federation Test', () => {
    let g = new Game(4);
    let board = g.board;
    let h1 = new Hex(-2,9,-7);
    let h2 = new Hex(0,8,-8);
    let h3 = new Hex(-1,7,-6);
    let h4 = new Hex(1,8,-9);
    let h5 = new Hex(-1,6,-5);
    let h6 = new Hex(-3,9,-6);

    let p1 = board.getPlanet(h1);
    let p2 = board.getPlanet(h2);
    let p3 = board.getPlanet(h3);
    let p4 = board.getPlanet(h4);
    let p5 = board.getPlanet(h5);
    let p6 = board.getPlanet(h6);

    p1.playerID = 1;
    p2.playerID = 1;
    p3.playerID = 1;
    p4.playerID = 1;
    p5.playerID = 1;
    p6.playerID = 1;

    // p1.type = PlanetType.Blue;
    // p2.type = PlanetType.Blue;
    // p3.type = PlanetType.Blue;
    // p4.type = PlanetType.Blue;
    // p5.type = PlanetType.Blue;



    
    let p: Player;
    g.federationlib = new FederationLib(false);
    let request: Request;
    let action: Action;

    beforeEach(() => {
        p = CreatePlayer('yifan', RaceType.Terrans);
        p.pid = 1;
        request = new Request();
    })


    it('can not fed with low value buildings', () => {
        p1.building = 0;
        p2.building = 0;
        p3.building = 0;

        request.path.push(h1);
        request.path.push(h2);
        request.path.push(h3);
        request.federationTokenType = 1;
        action = new Action(g, p, request);
        let judge = action.checkFederation();
        expect(judge).to.equal(false);
        expect(action.message).to.equal("value of the buildings is too low");
    })



    it('can not let a player federate without enough power', () => {
        p2.building = 4;
        p3.building = 3;
        p4.building = 3;
        request.path.push(h2);
        request.path.push(h3);
        request.path.push(new Hex(0,7,-7));
        request.path.push(h4);
        p.power.bowl1 = 0;
        p.power.bowl2 = 0;
        request.federationTokenType = 1;
        action = new Action(g, p, request);
        let judge = action.checkFederation();
        expect(judge).to.equal(false);
        expect(action.message).to.equal("player do not have enough power to federate");
    })

    it('can pass the check fed with all settings rightly set', () => {
        p2.building = 4;
        p3.building = 3;
        p4.building = 3;
        request.path.push(h2);
        request.path.push(h3);
        request.path.push(new Hex(0,7,-7));
        request.path.push(h4);
        request.federationTokenType = 1;
        action = new Action(g, p, request);
        let judge = action.checkFederation();
        expect(judge).to.equal(true);
    })

    it('can form federation', () => {
        p2.building = 4;
        p3.building = 3;
        p4.building = 3;
        request.path.push(h2);
        request.path.push(h3);
        request.path.push(new Hex(0,7,-7));
        request.path.push(h4);
        request.federationTokenType = 1;
        action = new Action(g, p, request);
        let judge = action.FormFederation();
        console.log("number satellite " + p.satellites)
        expect(judge).to.equal(true);
    })
    
    it('Test find shortest path given a plant list', () => {
        p1.building = 0
        p2.building = 1;
        p3.building = 3;
        p4.building = 3;
        p5.building = 2;
        p6.building = 4;

        console.log("mines "+ p.getAvalibleMine.length) 
        console.log("station "+p.getAvalibleStation.length) 
        console.log("academies "+p.getAvalibleAcademies.length) 
        console.log("lab "+p.getAvalibleLab.length) 
        console.log("institute "+p.getAvalibleInstitute.length) 

        console.log("Planets "+ p.planets.length) 

        request.path.push(h2);
        request.path.push(h3);
        request.path.push(new Hex(0,7,-7));
        request.path.push(h4);
        request.federationTokenType = 1;
        action = new Action(g, p, request);
        let judge = action.FormFederation();
        expect(judge).to.equal(true);
    })

})
