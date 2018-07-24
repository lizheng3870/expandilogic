"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Hex_1 = require("../logic/Hex");
var Tests = /** @class */ (function () {
    function Tests() {
    }
    Tests.equalHex = function (name, a, b) {
        if (!(a.q === b.q && a.s === b.s && a.r === b.r)) {
            complain(name);
        }
    };
    Tests.equalOffsetcoord = function (name, a, b) {
        if (!(a.col === b.col && a.row === b.row)) {
            complain(name);
        }
    };
    Tests.equalDoubledcoord = function (name, a, b) {
        if (!(a.col === b.col && a.row === b.row)) {
            complain(name);
        }
    };
    Tests.equalInt = function (name, a, b) {
        if (!(a === b)) {
            complain(name);
        }
    };
    Tests.equalHexArray = function (name, a, b) {
        Tests.equalInt(name, a.length, b.length);
        for (var i = 0; i < a.length; i++) {
            Tests.equalHex(name, a[i], b[i]);
        }
    };
    Tests.testHexArithmetic = function () {
        Tests.equalHex("hex_add", new Hex_1.Hex(4, -10, 6), new Hex_1.Hex(1, -3, 2).add(new Hex_1.Hex(3, -7, 4)));
        Tests.equalHex("hex_subtract", new Hex_1.Hex(-2, 4, -2), new Hex_1.Hex(1, -3, 2).subtract(new Hex_1.Hex(3, -7, 4)));
    };
    Tests.testHexDirection = function () {
        Tests.equalHex("hex_direction", new Hex_1.Hex(0, -1, 1), Hex_1.Hex.direction(2));
    };
    Tests.testHexNeighbor = function () {
        Tests.equalHex("hex_neighbor", new Hex_1.Hex(1, -3, 2), new Hex_1.Hex(1, -2, 1).neighbor(2));
    };
    Tests.testHexDiagonal = function () {
        Tests.equalHex("hex_diagonal", new Hex_1.Hex(-1, -1, 2), new Hex_1.Hex(1, -2, 1).diagonalNeighbor(3));
    };
    Tests.testHexDistance = function () {
        Tests.equalInt("hex_distance", 7, new Hex_1.Hex(3, -7, 4).distance(new Hex_1.Hex(0, 0, 0)));
    };
    Tests.testHexRotateRight = function () {
        Tests.equalHex("hex_rotate_right", new Hex_1.Hex(1, -3, 2).rotateRight(), new Hex_1.Hex(3, -2, -1));
    };
    Tests.testHexRotateLeft = function () {
        Tests.equalHex("hex_rotate_left", new Hex_1.Hex(1, -3, 2).rotateLeft(), new Hex_1.Hex(-2, -1, 3));
    };
    Tests.testHexRound = function () {
        var a = new Hex_1.Hex(0, 0, 0);
        var b = new Hex_1.Hex(1, -1, 0);
        var c = new Hex_1.Hex(0, -1, 1);
        Tests.equalHex("hex_round 1", new Hex_1.Hex(5, -10, 5), new Hex_1.Hex(0, 0, 0).lerp(new Hex_1.Hex(10, -20, 10), 0.5).round());
        Tests.equalHex("hex_round 2", a.round(), a.lerp(b, 0.499).round());
        Tests.equalHex("hex_round 3", b.round(), a.lerp(b, 0.501).round());
        Tests.equalHex("hex_round 4", a.round(), new Hex_1.Hex(a.q * 0.4 + b.q * 0.3 + c.q * 0.3, a.r * 0.4 + b.r * 0.3 + c.r * 0.3, a.s * 0.4 + b.s * 0.3 + c.s * 0.3).round());
        Tests.equalHex("hex_round 5", c.round(), new Hex_1.Hex(a.q * 0.3 + b.q * 0.3 + c.q * 0.4, a.r * 0.3 + b.r * 0.3 + c.r * 0.4, a.s * 0.3 + b.s * 0.3 + c.s * 0.4).round());
    };
    Tests.testHexLinedraw = function () {
        Tests.equalHexArray("hex_linedraw", [new Hex_1.Hex(0, 0, 0), new Hex_1.Hex(0, -1, 1), new Hex_1.Hex(0, -2, 2), new Hex_1.Hex(1, -3, 2), new Hex_1.Hex(1, -4, 3), new Hex_1.Hex(1, -5, 4)], new Hex_1.Hex(0, 0, 0).linedraw(new Hex_1.Hex(1, -5, 4)));
    };
    Tests.testLayout = function () {
        var h = new Hex_1.Hex(3, 4, -7);
        var flat = new Hex_1.Layout(Hex_1.Layout.flat, new Hex_1.Point(10, 15), new Hex_1.Point(35, 71));
        Tests.equalHex("layout", h, flat.pixelToHex(flat.hexToPixel(h)).round());
        var pointy = new Hex_1.Layout(Hex_1.Layout.pointy, new Hex_1.Point(10, 15), new Hex_1.Point(35, 71));
        Tests.equalHex("layout", h, pointy.pixelToHex(pointy.hexToPixel(h)).round());
    };
    Tests.testOffsetRoundtrip = function () {
        var a = new Hex_1.Hex(3, 4, -7);
        var b = new Hex_1.OffsetCoord(1, -3);
        Tests.equalHex("conversion_roundtrip even-q", a, Hex_1.OffsetCoord.qoffsetToCube(Hex_1.OffsetCoord.EVEN, Hex_1.OffsetCoord.qoffsetFromCube(Hex_1.OffsetCoord.EVEN, a)));
        Tests.equalOffsetcoord("conversion_roundtrip even-q", b, Hex_1.OffsetCoord.qoffsetFromCube(Hex_1.OffsetCoord.EVEN, Hex_1.OffsetCoord.qoffsetToCube(Hex_1.OffsetCoord.EVEN, b)));
        Tests.equalHex("conversion_roundtrip odd-q", a, Hex_1.OffsetCoord.qoffsetToCube(Hex_1.OffsetCoord.ODD, Hex_1.OffsetCoord.qoffsetFromCube(Hex_1.OffsetCoord.ODD, a)));
        Tests.equalOffsetcoord("conversion_roundtrip odd-q", b, Hex_1.OffsetCoord.qoffsetFromCube(Hex_1.OffsetCoord.ODD, Hex_1.OffsetCoord.qoffsetToCube(Hex_1.OffsetCoord.ODD, b)));
        Tests.equalHex("conversion_roundtrip even-r", a, Hex_1.OffsetCoord.roffsetToCube(Hex_1.OffsetCoord.EVEN, Hex_1.OffsetCoord.roffsetFromCube(Hex_1.OffsetCoord.EVEN, a)));
        Tests.equalOffsetcoord("conversion_roundtrip even-r", b, Hex_1.OffsetCoord.roffsetFromCube(Hex_1.OffsetCoord.EVEN, Hex_1.OffsetCoord.roffsetToCube(Hex_1.OffsetCoord.EVEN, b)));
        Tests.equalHex("conversion_roundtrip odd-r", a, Hex_1.OffsetCoord.roffsetToCube(Hex_1.OffsetCoord.ODD, Hex_1.OffsetCoord.roffsetFromCube(Hex_1.OffsetCoord.ODD, a)));
        Tests.equalOffsetcoord("conversion_roundtrip odd-r", b, Hex_1.OffsetCoord.roffsetFromCube(Hex_1.OffsetCoord.ODD, Hex_1.OffsetCoord.roffsetToCube(Hex_1.OffsetCoord.ODD, b)));
    };
    Tests.testOffsetFromCube = function () {
        Tests.equalOffsetcoord("offset_from_cube even-q", new Hex_1.OffsetCoord(1, 3), Hex_1.OffsetCoord.qoffsetFromCube(Hex_1.OffsetCoord.EVEN, new Hex_1.Hex(1, 2, -3)));
        Tests.equalOffsetcoord("offset_from_cube odd-q", new Hex_1.OffsetCoord(1, 2), Hex_1.OffsetCoord.qoffsetFromCube(Hex_1.OffsetCoord.ODD, new Hex_1.Hex(1, 2, -3)));
    };
    Tests.testOffsetToCube = function () {
        Tests.equalHex("offset_to_cube even-", new Hex_1.Hex(1, 2, -3), Hex_1.OffsetCoord.qoffsetToCube(Hex_1.OffsetCoord.EVEN, new Hex_1.OffsetCoord(1, 3)));
        Tests.equalHex("offset_to_cube odd-q", new Hex_1.Hex(1, 2, -3), Hex_1.OffsetCoord.qoffsetToCube(Hex_1.OffsetCoord.ODD, new Hex_1.OffsetCoord(1, 2)));
    };
    Tests.testDoubledRoundtrip = function () {
        var a = new Hex_1.Hex(3, 4, -7);
        var b = new Hex_1.DoubledCoord(1, -3);
        Tests.equalHex("conversion_roundtrip doubled-q", a, Hex_1.DoubledCoord.qdoubledFromCube(a).qdoubledToCube());
        Tests.equalDoubledcoord("conversion_roundtrip doubled-q", b, Hex_1.DoubledCoord.qdoubledFromCube(b.qdoubledToCube()));
        Tests.equalHex("conversion_roundtrip doubled-r", a, Hex_1.DoubledCoord.rdoubledFromCube(a).rdoubledToCube());
        Tests.equalDoubledcoord("conversion_roundtrip doubled-r", b, Hex_1.DoubledCoord.rdoubledFromCube(b.rdoubledToCube()));
    };
    Tests.testDoubledFromCube = function () {
        Tests.equalDoubledcoord("doubled_from_cube doubled-q", new Hex_1.DoubledCoord(1, 5), Hex_1.DoubledCoord.qdoubledFromCube(new Hex_1.Hex(1, 2, -3)));
        Tests.equalDoubledcoord("doubled_from_cube doubled-r", new Hex_1.DoubledCoord(4, 2), Hex_1.DoubledCoord.rdoubledFromCube(new Hex_1.Hex(1, 2, -3)));
    };
    Tests.testDoubledToCube = function () {
        Tests.equalHex("doubled_to_cube doubled-q", new Hex_1.Hex(1, 2, -3), new Hex_1.DoubledCoord(1, 5).qdoubledToCube());
        Tests.equalHex("doubled_to_cube doubled-r", new Hex_1.Hex(1, 2, -3), new Hex_1.DoubledCoord(4, 2).rdoubledToCube());
    };
    Tests.testAll = function () {
        Tests.testHexArithmetic();
        Tests.testHexDirection();
        Tests.testHexNeighbor();
        Tests.testHexDiagonal();
        Tests.testHexDistance();
        Tests.testHexRotateRight();
        Tests.testHexRotateLeft();
        Tests.testHexRound();
        Tests.testHexLinedraw();
        Tests.testLayout();
        Tests.testOffsetRoundtrip();
        Tests.testOffsetFromCube();
        Tests.testOffsetToCube();
        Tests.testDoubledRoundtrip();
        Tests.testDoubledFromCube();
        Tests.testDoubledToCube();
    };
    return Tests;
}());
// Tests
function complain(name) { console.log("FAIL", name); }
Tests.testAll();
