"use strict";
// Generated code -- http://www.redblobgames.com/grids/hexagons/
Object.defineProperty(exports, "__esModule", { value: true });
var Point = /** @class */ (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    return Point;
}());
exports.Point = Point;
var Hex = /** @class */ (function () {
    function Hex(q, r, s) {
        this.q = q;
        this.r = r;
        this.s = s;
        if (Math.round(q + r + s) !== 0)
            throw "q + r + s must be 0";
    }
    Hex.prototype.add = function (b) {
        return new Hex(this.q + b.q, this.r + b.r, this.s + b.s);
    };
    Hex.prototype.subtract = function (b) {
        return new Hex(this.q - b.q, this.r - b.r, this.s - b.s);
    };
    Hex.prototype.scale = function (k) {
        return new Hex(this.q * k, this.r * k, this.s * k);
    };
    Hex.prototype.rotateLeft = function () {
        return new Hex(-this.s, -this.q, -this.r);
    };
    Hex.prototype.rotateRight = function () {
        return new Hex(-this.r, -this.s, -this.q);
    };
    Hex.direction = function (direction) {
        return Hex.directions[direction];
    };
    Hex.prototype.neighbor = function (direction) {
        return this.add(Hex.direction(direction));
    };
    Hex.prototype.diagonalNeighbor = function (direction) {
        return this.add(Hex.diagonals[direction]);
    };
    Hex.prototype.len = function () {
        return (Math.abs(this.q) + Math.abs(this.r) + Math.abs(this.s)) / 2;
    };
    Hex.prototype.distance = function (b) {
        return this.subtract(b).len();
    };
    Hex.prototype.round = function () {
        var qi = Math.round(this.q);
        var ri = Math.round(this.r);
        var si = Math.round(this.s);
        var q_diff = Math.abs(qi - this.q);
        var r_diff = Math.abs(ri - this.r);
        var s_diff = Math.abs(si - this.s);
        if (q_diff > r_diff && q_diff > s_diff) {
            qi = -ri - si;
        }
        else if (r_diff > s_diff) {
            ri = -qi - si;
        }
        else {
            si = -qi - ri;
        }
        return new Hex(qi, ri, si);
    };
    Hex.prototype.lerp = function (b, t) {
        return new Hex(this.q * (1 - t) + b.q * t, this.r * (1 - t) + b.r * t, this.s * (1 - t) + b.s * t);
    };
    Hex.prototype.linedraw = function (b) {
        var N = this.distance(b);
        var a_nudge = new Hex(this.q + 0.000001, this.r + 0.000001, this.s - 0.000002);
        var b_nudge = new Hex(b.q + 0.000001, b.r + 0.000001, b.s - 0.000002);
        var results = [];
        var step = 1.0 / Math.max(N, 1);
        for (var i = 0; i <= N; i++) {
            results.push(a_nudge.lerp(b_nudge, step * i).round());
        }
        return results;
    };
    Hex.directions = [new Hex(1, 0, -1), new Hex(1, -1, 0), new Hex(0, -1, 1), new Hex(-1, 0, 1), new Hex(-1, 1, 0), new Hex(0, 1, -1)];
    Hex.diagonals = [new Hex(2, -1, -1), new Hex(1, -2, 1), new Hex(-1, -1, 2), new Hex(-2, 1, 1), new Hex(-1, 2, -1), new Hex(1, 1, -2)];
    return Hex;
}());
exports.Hex = Hex;
var OffsetCoord = /** @class */ (function () {
    function OffsetCoord(col, row) {
        this.col = col;
        this.row = row;
    }
    OffsetCoord.qoffsetFromCube = function (offset, h) {
        var col = h.q;
        var row = h.r + (h.q + offset * (h.q & 1)) / 2;
        return new OffsetCoord(col, row);
    };
    OffsetCoord.qoffsetToCube = function (offset, h) {
        var q = h.col;
        var r = h.row - (h.col + offset * (h.col & 1)) / 2;
        var s = -q - r;
        return new Hex(q, r, s);
    };
    OffsetCoord.roffsetFromCube = function (offset, h) {
        var col = h.q + (h.r + offset * (h.r & 1)) / 2;
        var row = h.r;
        return new OffsetCoord(col, row);
    };
    OffsetCoord.roffsetToCube = function (offset, h) {
        var q = h.col - (h.row + offset * (h.row & 1)) / 2;
        var r = h.row;
        var s = -q - r;
        return new Hex(q, r, s);
    };
    OffsetCoord.EVEN = 1;
    OffsetCoord.ODD = -1;
    return OffsetCoord;
}());
exports.OffsetCoord = OffsetCoord;
var DoubledCoord = /** @class */ (function () {
    function DoubledCoord(col, row) {
        this.col = col;
        this.row = row;
    }
    DoubledCoord.qdoubledFromCube = function (h) {
        var col = h.q;
        var row = 2 * h.r + h.q;
        return new DoubledCoord(col, row);
    };
    DoubledCoord.prototype.qdoubledToCube = function () {
        var q = this.col;
        var r = (this.row - this.col) / 2;
        var s = -q - r;
        return new Hex(q, r, s);
    };
    DoubledCoord.rdoubledFromCube = function (h) {
        var col = 2 * h.q + h.r;
        var row = h.r;
        return new DoubledCoord(col, row);
    };
    DoubledCoord.prototype.rdoubledToCube = function () {
        var q = (this.col - this.row) / 2;
        var r = this.row;
        var s = -q - r;
        return new Hex(q, r, s);
    };
    return DoubledCoord;
}());
exports.DoubledCoord = DoubledCoord;
var Orientation = /** @class */ (function () {
    function Orientation(f0, f1, f2, f3, b0, b1, b2, b3, start_angle) {
        this.f0 = f0;
        this.f1 = f1;
        this.f2 = f2;
        this.f3 = f3;
        this.b0 = b0;
        this.b1 = b1;
        this.b2 = b2;
        this.b3 = b3;
        this.start_angle = start_angle;
    }
    return Orientation;
}());
exports.Orientation = Orientation;
var Layout = /** @class */ (function () {
    function Layout(orientation, size, origin) {
        this.orientation = orientation;
        this.size = size;
        this.origin = origin;
    }
    Layout.prototype.hexToPixel = function (h) {
        var M = this.orientation;
        var size = this.size;
        var origin = this.origin;
        var x = (M.f0 * h.q + M.f1 * h.r) * size.x;
        var y = (M.f2 * h.q + M.f3 * h.r) * size.y;
        return new Point(x + origin.x, y + origin.y);
    };
    Layout.prototype.pixelToHex = function (p) {
        var M = this.orientation;
        var size = this.size;
        var origin = this.origin;
        var pt = new Point((p.x - origin.x) / size.x, (p.y - origin.y) / size.y);
        var q = M.b0 * pt.x + M.b1 * pt.y;
        var r = M.b2 * pt.x + M.b3 * pt.y;
        return new Hex(q, r, -q - r);
    };
    Layout.prototype.hexCornerOffset = function (corner) {
        var M = this.orientation;
        var size = this.size;
        var angle = 2.0 * Math.PI * (M.start_angle - corner) / 6;
        return new Point(size.x * Math.cos(angle), size.y * Math.sin(angle));
    };
    Layout.prototype.polygonCorners = function (h) {
        var corners = [];
        var center = this.hexToPixel(h);
        for (var i = 0; i < 6; i++) {
            var offset = this.hexCornerOffset(i);
            corners.push(new Point(center.x + offset.x, center.y + offset.y));
        }
        return corners;
    };
    Layout.pointy = new Orientation(Math.sqrt(3.0), Math.sqrt(3.0) / 2.0, 0.0, 3.0 / 2.0, Math.sqrt(3.0) / 3.0, -1.0 / 3.0, 0.0, 2.0 / 3.0, 0.5);
    Layout.flat = new Orientation(3.0 / 2.0, 0.0, Math.sqrt(3.0) / 2.0, Math.sqrt(3.0), 2.0 / 3.0, 0.0, -1.0 / 3.0, Math.sqrt(3.0) / 3.0, 0.0);
    return Layout;
}());
exports.Layout = Layout;
