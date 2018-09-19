"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Player_1 = require("../logic/Player");
var Game_1 = require("../logic/Game");
var Request_1 = require("../logic/Request");
var Hex_1 = require("../logic/Hex");
var Action_1 = require("../logic/Action");
var Benefit_1 = require("../logic/Benefit");
var readline = require('readline');
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function readCommandLine(text) {
    return new Promise(function (resolve, reject) {
        rl.question(text + "\n", function (answer) {
            // TODO: Log the answer in a database
            resolve(answer);
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var g, request, out, i, request_1, hex, request_2, hex, request_3, hex, request_4, hex, request_5, hex, request_6, hex, request_7, hex, request_8, hex, request_9, request_10, request_11, request_12, request_13, player, request_14;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    g = new Game_1.Game(2);
                    g.clearSaveGame();
                    g.addPlayer(Player_1.CreatePlayer('Yousong', Player_1.RaceType.Terrans)); //blue
                    g.addPlayer(Player_1.CreatePlayer('Nina', Player_1.RaceType.Xenos)); //Yellow
                    g.addPlayer(Player_1.CreatePlayer('Yalei', Player_1.RaceType.HadschHallas)); //red
                    g.addPlayer(Player_1.CreatePlayer('Rong', Player_1.RaceType.Nevlas)); //white
                    request = new Request_1.Request();
                    i = 0;
                    return [4 /*yield*/, readCommandLine("Demo 1 : initialize map and add 4 players ")];
                case 1:
                    out = _a.sent();
                    g.saveGame();
                    return [4 /*yield*/, readCommandLine("Demo 2 : Setup Phase each Player build two mines on map ")];
                case 2:
                    out = _a.sent();
                    return [4 /*yield*/, readCommandLine("Demo 2 (1/8) : player(pid:0) build mine on location Hex(0, 0, 0) ")];
                case 3:
                    out = _a.sent();
                    {
                        request_1 = new Request_1.Request();
                        hex = new Hex_1.Hex(0, 0, 0);
                        request_1.type = Request_1.RequestType.FirstStructures;
                        request_1.pid = 0;
                        request_1.hex = hex;
                        g.processSetupFirstStructures(request_1);
                        g.saveGame();
                    }
                    return [4 /*yield*/, readCommandLine("Demo 2 (2/8) : player(pid:1) build mine on location Hex(2, 3, -5) ")];
                case 4:
                    out = _a.sent();
                    {
                        request_2 = new Request_1.Request();
                        hex = new Hex_1.Hex(2, 3, -5);
                        //console.log(hex)
                        request_2.type = Request_1.RequestType.FirstStructures;
                        request_2.pid = 1;
                        request_2.hex = hex;
                        console.log(g.turn);
                        g.processSetupFirstStructures(request_2);
                        g.saveGame();
                    }
                    return [4 /*yield*/, readCommandLine("Demo 2 (3/8) : player(pid:2) build mine on location Hex(5, -2, -3) ")];
                case 5:
                    out = _a.sent();
                    {
                        request_3 = new Request_1.Request();
                        hex = new Hex_1.Hex(5, -2, -3);
                        //console.log(hex)
                        request_3.type = Request_1.RequestType.FirstStructures;
                        request_3.pid = 2;
                        request_3.hex = hex;
                        g.processSetupFirstStructures(request_3);
                        g.saveGame();
                    }
                    return [4 /*yield*/, readCommandLine("Demo 2 (4/8) : player(pid:3) build mine on location Hex(-5, 2, 3) ")];
                case 6:
                    out = _a.sent();
                    {
                        request_4 = new Request_1.Request();
                        hex = new Hex_1.Hex(-5, 2, 3);
                        //console.log(hex)
                        request_4.type = Request_1.RequestType.FirstStructures;
                        request_4.pid = 3;
                        request_4.hex = hex;
                        g.processSetupFirstStructures(request_4);
                        g.saveGame();
                    }
                    return [4 /*yield*/, readCommandLine("Demo 2 (5/8) : player(pid:3) build mine on location Hex(-6, 3, 3) ")];
                case 7:
                    out = _a.sent();
                    {
                        request_5 = new Request_1.Request();
                        hex = new Hex_1.Hex(-6, 3, 3);
                        //console.log(hex)
                        request_5.type = Request_1.RequestType.FirstStructures;
                        request_5.pid = 3;
                        request_5.hex = hex;
                        g.processSetupFirstStructures(request_5);
                        g.saveGame();
                    }
                    return [4 /*yield*/, readCommandLine("Demo 2 (6/8) : player(pid:2) build mine on location Hex(4, -1, -3) ")];
                case 8:
                    out = _a.sent();
                    {
                        request_6 = new Request_1.Request();
                        hex = new Hex_1.Hex(4, -1, -3);
                        //console.log(hex)
                        request_6.type = Request_1.RequestType.FirstStructures;
                        request_6.pid = 2;
                        request_6.hex = hex;
                        g.processSetupFirstStructures(request_6);
                        g.saveGame();
                    }
                    return [4 /*yield*/, readCommandLine("Demo 2 (7/8) : player(pid:1) build mine on location Hex(3, 3, -6) ")];
                case 9:
                    out = _a.sent();
                    {
                        request_7 = new Request_1.Request();
                        hex = new Hex_1.Hex(3, 3, -6);
                        //console.log(hex)
                        request_7.type = Request_1.RequestType.FirstStructures;
                        request_7.pid = 1;
                        request_7.hex = hex;
                        g.processSetupFirstStructures(request_7);
                        g.saveGame();
                    }
                    return [4 /*yield*/, readCommandLine("Demo 2 (8/8) : player(pid:0) build mine on location Hex(4, 6, -10) ")];
                case 10:
                    out = _a.sent();
                    {
                        request_8 = new Request_1.Request();
                        hex = new Hex_1.Hex(4, 6, -10);
                        //console.log(hex)
                        request_8.type = Request_1.RequestType.FirstStructures;
                        request_8.pid = 0;
                        request_8.hex = hex;
                        g.processSetupFirstStructures(request_8);
                        g.saveGame();
                    }
                    {
                        request_9 = new Request_1.Request();
                        request_9.type = Request_1.RequestType.Roundbooter;
                        request_9.pid = 0;
                        request_9.roundBoosterID = 3;
                        g.processRoundRooter(request_9);
                    }
                    request_10 = new Request_1.Request();
                    request_10.type = Request_1.RequestType.Roundbooter;
                    request_10.pid = 1;
                    request_10.roundBoosterID = 4;
                    g.processRoundRooter(request_10);
                    request_10.pid = 2;
                    request_10.roundBoosterID = 0;
                    g.processRoundRooter(request_10);
                    return [4 /*yield*/, readCommandLine("Demo 3 : At beginning of each Round, Income Phase, calculate income of each player. all race will add 1 ore and 1 science.  Special Race : HadschHallas will add 5 Gold ( 3 from raceboard 2 from techBoard), Nevlas will add 1 science ")];
                case 11:
                    out = _a.sent();
                    request_10.pid = 3;
                    request_10.roundBoosterID = 9;
                    g.processRoundRooter(request_10);
                    g.saveGame();
                    return [4 /*yield*/, readCommandLine("Demo 4 :Action player(pid:0) build mine on location Hex(1, -1, 0) which cost  2 gold  1 ore ")];
                case 12:
                    out = _a.sent();
                    {
                        request_11 = new Request_1.Request();
                        request_11.type = Request_1.RequestType.Action;
                        request_11.actionType = Action_1.ActionType.BuildMine;
                        request_11.pid = 0;
                        request_11.hex = new Hex_1.Hex(1, -1, 0);
                        g.processPlayerRequest(request_11);
                        g.saveGame();
                    }
                    return [4 /*yield*/, readCommandLine("Demo 4 :Action player(pid:1) update mine structure to station on location Hex(2, 3, -5) which cost  3 gold  1 ore ")];
                case 13:
                    out = _a.sent();
                    {
                        request_12 = new Request_1.Request();
                        request_12.type = Request_1.RequestType.Action;
                        request_12.actionType = Action_1.ActionType.Upgrade;
                        request_12.upgradeType = Request_1.UpgradeType.MineToStation;
                        request_12.pid = 1;
                        request_12.hex = new Hex_1.Hex(2, 3, -5);
                        g.processPlayerRequest(request_12);
                        g.saveGame();
                    }
                    return [4 /*yield*/, readCommandLine("Demo 4 :Action player(pid:2)  Rearch Action which cost 4 science. Player(2) do Rearch (Dig Tech 0->1 ) Action  which will cost 4 science and ore will increase 2")];
                case 14:
                    out = _a.sent();
                    {
                        request_13 = new Request_1.Request();
                        request_13.type = Request_1.RequestType.Action;
                        request_13.actionType = Action_1.ActionType.Research;
                        request_13.techLane = Request_1.TechLaneType.Dig;
                        request_13.pid = 2;
                        player = g.getPlayer(request_13.pid);
                        g.processPlayerRequest(request_13);
                        g.saveGame();
                    }
                    return [4 /*yield*/, readCommandLine("Demo 4 :Action Player(pid 3)  free action one ore to one gold ")];
                case 15:
                    out = _a.sent();
                    {
                        request_14 = new Request_1.Request();
                        request_14.type = Request_1.RequestType.Action;
                        request_14.actionType = Action_1.ActionType.Free;
                        request_14.freeExchangeItems = [Benefit_1.Material.Ore, Benefit_1.Material.Gold];
                        request_14.freeExchangeTimes = 1;
                        request_14.pid = 3;
                        g.processPlayerRequest(request_14);
                        g.saveGame();
                    }
                    return [4 /*yield*/, readCommandLine("Demo End : Thank you ")];
                case 16:
                    out = _a.sent();
                    process.exit();
                    return [2 /*return*/];
            }
        });
    });
}
main();
