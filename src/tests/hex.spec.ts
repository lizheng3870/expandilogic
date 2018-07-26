// import {Hex, OffsetCoord, DoubledCoord, Layout, Point, } from '../logic/Hex'
//
// class Tests
// {
//     constructor () {}
//
//     public static equalHex(name:string, a:Hex, b:Hex):void
//     {
//         if (!(a.q === b.q && a.s === b.s && a.r === b.r))
//         {
//             complain(name);
//         }
//     }
//
//
//     public static equalOffsetcoord(name:string, a:OffsetCoord, b:OffsetCoord):void
//     {
//         if (!(a.col === b.col && a.row === b.row))
//         {
//             complain(name);
//         }
//     }
//
//
//     public static equalDoubledcoord(name:string, a:DoubledCoord, b:DoubledCoord):void
//     {
//         if (!(a.col === b.col && a.row === b.row))
//         {
//             complain(name);
//         }
//     }
//
//
//     public static equalInt(name:string, a:number, b:number):void
//     {
//         if (!(a === b))
//         {
//             complain(name);
//         }
//     }
//
//
//     public static equalHexArray(name:string, a:Hex[], b:Hex[]):void
//     {
//         Tests.equalInt(name, a.length, b.length);
//         for (var i = 0; i < a.length; i++)
//         {
//             Tests.equalHex(name, a[i], b[i]);
//         }
//     }
//
//
//     public static testHexArithmetic():void
//     {
//         Tests.equalHex("hex_add", new Hex(4, -10, 6), new Hex(1, -3, 2).add(new Hex(3, -7, 4)));
//         Tests.equalHex("hex_subtract", new Hex(-2, 4, -2), new Hex(1, -3, 2).subtract(new Hex(3, -7, 4)));
//     }
//
//
//     public static testHexDirection():void
//     {
//         Tests.equalHex("hex_direction", new Hex(0, -1, 1), Hex.direction(2));
//     }
//
//
//     public static testHexNeighbor():void
//     {
//         Tests.equalHex("hex_neighbor", new Hex(1, -3, 2), new Hex(1, -2, 1).neighbor(2));
//     }
//
//
//     public static testHexDiagonal():void
//     {
//         Tests.equalHex("hex_diagonal", new Hex(-1, -1, 2), new Hex(1, -2, 1).diagonalNeighbor(3));
//     }
//
//
//     public static testHexDistance():void
//     {
//         Tests.equalInt("hex_distance", 7, new Hex(3, -7, 4).distance(new Hex(0, 0, 0)));
//     }
//
//
//     public static testHexRotateRight():void
//     {
//         Tests.equalHex("hex_rotate_right", new Hex(1, -3, 2).rotateRight(), new Hex(3, -2, -1));
//     }
//
//
//     public static testHexRotateLeft():void
//     {
//         Tests.equalHex("hex_rotate_left", new Hex(1, -3, 2).rotateLeft(), new Hex(-2, -1, 3));
//     }
//
//
//     public static testHexRound():void
//     {
//         var a:Hex = new Hex(0, 0, 0);
//         var b:Hex = new Hex(1, -1, 0);
//         var c:Hex = new Hex(0, -1, 1);
//         Tests.equalHex("hex_round 1", new Hex(5, -10, 5), new Hex(0, 0, 0).lerp(new Hex(10, -20, 10), 0.5).round());
//         Tests.equalHex("hex_round 2", a.round(), a.lerp(b, 0.499).round());
//         Tests.equalHex("hex_round 3", b.round(), a.lerp(b, 0.501).round());
//         Tests.equalHex("hex_round 4", a.round(), new Hex(a.q * 0.4 + b.q * 0.3 + c.q * 0.3, a.r * 0.4 + b.r * 0.3 + c.r * 0.3, a.s * 0.4 + b.s * 0.3 + c.s * 0.3).round());
//         Tests.equalHex("hex_round 5", c.round(), new Hex(a.q * 0.3 + b.q * 0.3 + c.q * 0.4, a.r * 0.3 + b.r * 0.3 + c.r * 0.4, a.s * 0.3 + b.s * 0.3 + c.s * 0.4).round());
//     }
//
//
//     public static testHexLinedraw():void
//     {
//         Tests.equalHexArray("hex_linedraw", [new Hex(0, 0, 0), new Hex(0, -1, 1), new Hex(0, -2, 2), new Hex(1, -3, 2), new Hex(1, -4, 3), new Hex(1, -5, 4)], new Hex(0, 0, 0).linedraw(new Hex(1, -5, 4)));
//     }
//
//
//     public static testLayout():void
//     {
//         var h:Hex = new Hex(3, 4, -7);
//         var flat:Layout = new Layout(Layout.flat, new Point(10, 15), new Point(35, 71));
//         Tests.equalHex("layout", h, flat.pixelToHex(flat.hexToPixel(h)).round());
//         var pointy:Layout = new Layout(Layout.pointy, new Point(10, 15), new Point(35, 71));
//         Tests.equalHex("layout", h, pointy.pixelToHex(pointy.hexToPixel(h)).round());
//     }
//
//
//     public static testOffsetRoundtrip():void
//     {
//         var a:Hex = new Hex(3, 4, -7);
//         var b:OffsetCoord = new OffsetCoord(1, -3);
//         Tests.equalHex("conversion_roundtrip even-q", a, OffsetCoord.qoffsetToCube(OffsetCoord.EVEN, OffsetCoord.qoffsetFromCube(OffsetCoord.EVEN, a)));
//         Tests.equalOffsetcoord("conversion_roundtrip even-q", b, OffsetCoord.qoffsetFromCube(OffsetCoord.EVEN, OffsetCoord.qoffsetToCube(OffsetCoord.EVEN, b)));
//         Tests.equalHex("conversion_roundtrip odd-q", a, OffsetCoord.qoffsetToCube(OffsetCoord.ODD, OffsetCoord.qoffsetFromCube(OffsetCoord.ODD, a)));
//         Tests.equalOffsetcoord("conversion_roundtrip odd-q", b, OffsetCoord.qoffsetFromCube(OffsetCoord.ODD, OffsetCoord.qoffsetToCube(OffsetCoord.ODD, b)));
//         Tests.equalHex("conversion_roundtrip even-r", a, OffsetCoord.roffsetToCube(OffsetCoord.EVEN, OffsetCoord.roffsetFromCube(OffsetCoord.EVEN, a)));
//         Tests.equalOffsetcoord("conversion_roundtrip even-r", b, OffsetCoord.roffsetFromCube(OffsetCoord.EVEN, OffsetCoord.roffsetToCube(OffsetCoord.EVEN, b)));
//         Tests.equalHex("conversion_roundtrip odd-r", a, OffsetCoord.roffsetToCube(OffsetCoord.ODD, OffsetCoord.roffsetFromCube(OffsetCoord.ODD, a)));
//         Tests.equalOffsetcoord("conversion_roundtrip odd-r", b, OffsetCoord.roffsetFromCube(OffsetCoord.ODD, OffsetCoord.roffsetToCube(OffsetCoord.ODD, b)));
//     }
//
//
//     public static testOffsetFromCube():void
//     {
//         Tests.equalOffsetcoord("offset_from_cube even-q", new OffsetCoord(1, 3), OffsetCoord.qoffsetFromCube(OffsetCoord.EVEN, new Hex(1, 2, -3)));
//         Tests.equalOffsetcoord("offset_from_cube odd-q", new OffsetCoord(1, 2), OffsetCoord.qoffsetFromCube(OffsetCoord.ODD, new Hex(1, 2, -3)));
//     }
//
//
//     public static testOffsetToCube():void
//     {
//         Tests.equalHex("offset_to_cube even-", new Hex(1, 2, -3), OffsetCoord.qoffsetToCube(OffsetCoord.EVEN, new OffsetCoord(1, 3)));
//         Tests.equalHex("offset_to_cube odd-q", new Hex(1, 2, -3), OffsetCoord.qoffsetToCube(OffsetCoord.ODD, new OffsetCoord(1, 2)));
//     }
//
//
//     public static testDoubledRoundtrip():void
//     {
//         var a:Hex = new Hex(3, 4, -7);
//         var b:DoubledCoord = new DoubledCoord(1, -3);
//         Tests.equalHex("conversion_roundtrip doubled-q", a, DoubledCoord.qdoubledFromCube(a).qdoubledToCube());
//         Tests.equalDoubledcoord("conversion_roundtrip doubled-q", b, DoubledCoord.qdoubledFromCube(b.qdoubledToCube()));
//         Tests.equalHex("conversion_roundtrip doubled-r", a, DoubledCoord.rdoubledFromCube(a).rdoubledToCube());
//         Tests.equalDoubledcoord("conversion_roundtrip doubled-r", b, DoubledCoord.rdoubledFromCube(b.rdoubledToCube()));
//     }
//
//
//     public static testDoubledFromCube():void
//     {
//         Tests.equalDoubledcoord("doubled_from_cube doubled-q", new DoubledCoord(1, 5), DoubledCoord.qdoubledFromCube(new Hex(1, 2, -3)));
//         Tests.equalDoubledcoord("doubled_from_cube doubled-r", new DoubledCoord(4, 2), DoubledCoord.rdoubledFromCube(new Hex(1, 2, -3)));
//     }
//
//
//     public static testDoubledToCube():void
//     {
//         Tests.equalHex("doubled_to_cube doubled-q", new Hex(1, 2, -3), new DoubledCoord(1, 5).qdoubledToCube());
//         Tests.equalHex("doubled_to_cube doubled-r", new Hex(1, 2, -3), new DoubledCoord(4, 2).rdoubledToCube());
//     }
//
//
//     public static testAll():void
//     {
//         Tests.testHexArithmetic();
//         Tests.testHexDirection();
//         Tests.testHexNeighbor();
//         Tests.testHexDiagonal();
//         Tests.testHexDistance();
//         Tests.testHexRotateRight();
//         Tests.testHexRotateLeft();
//         Tests.testHexRound();
//         Tests.testHexLinedraw();
//         Tests.testLayout();
//         Tests.testOffsetRoundtrip();
//         Tests.testOffsetFromCube();
//         Tests.testOffsetToCube();
//         Tests.testDoubledRoundtrip();
//         Tests.testDoubledFromCube();
//         Tests.testDoubledToCube();
//     }
//
// }
// // Tests
// function complain(name:string) { console.log("FAIL", name); }
// Tests.testAll();
