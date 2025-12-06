var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/prando/dist/Prando.umd.js
var require_Prando_umd = __commonJS({
  "node_modules/prando/dist/Prando.umd.js"(exports2, module2) {
    (function(global2, factory) {
      typeof exports2 === "object" && typeof module2 !== "undefined" ? module2.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, global2.Prando = factory());
    })(exports2, function() {
      "use strict";
      var Prando2 = (
        /** @class */
        function() {
          function Prando3(seed) {
            this._value = NaN;
            if (typeof seed === "string") {
              this._seed = this.hashCode(seed);
            } else if (typeof seed === "number") {
              this._seed = this.getSafeSeed(seed);
            } else {
              this._seed = this.getSafeSeed(Prando3.MIN + Math.floor((Prando3.MAX - Prando3.MIN) * Math.random()));
            }
            this.reset();
          }
          Prando3.prototype.next = function(min, pseudoMax) {
            if (min === void 0) {
              min = 0;
            }
            if (pseudoMax === void 0) {
              pseudoMax = 1;
            }
            this.recalculate();
            return this.map(this._value, Prando3.MIN, Prando3.MAX, min, pseudoMax);
          };
          Prando3.prototype.nextInt = function(min, max) {
            if (min === void 0) {
              min = 10;
            }
            if (max === void 0) {
              max = 100;
            }
            this.recalculate();
            return Math.floor(this.map(this._value, Prando3.MIN, Prando3.MAX, min, max + 1));
          };
          Prando3.prototype.nextString = function(length, chars) {
            if (length === void 0) {
              length = 16;
            }
            if (chars === void 0) {
              chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            }
            var str = "";
            while (str.length < length) {
              str += this.nextChar(chars);
            }
            return str;
          };
          Prando3.prototype.nextChar = function(chars) {
            if (chars === void 0) {
              chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            }
            return chars.substr(this.nextInt(0, chars.length - 1), 1);
          };
          Prando3.prototype.nextArrayItem = function(array) {
            return array[this.nextInt(0, array.length - 1)];
          };
          Prando3.prototype.nextBoolean = function() {
            this.recalculate();
            return this._value > 0.5;
          };
          Prando3.prototype.skip = function(iterations) {
            if (iterations === void 0) {
              iterations = 1;
            }
            while (iterations-- > 0) {
              this.recalculate();
            }
          };
          Prando3.prototype.reset = function() {
            this._value = this._seed;
          };
          Prando3.prototype.recalculate = function() {
            this._value = this.xorshift(this._value);
          };
          Prando3.prototype.xorshift = function(value) {
            value ^= value << 13;
            value ^= value >> 17;
            value ^= value << 5;
            return value;
          };
          Prando3.prototype.map = function(val, minFrom, maxFrom, minTo, maxTo) {
            return (val - minFrom) / (maxFrom - minFrom) * (maxTo - minTo) + minTo;
          };
          Prando3.prototype.hashCode = function(str) {
            var hash = 0;
            if (str) {
              var l = str.length;
              for (var i = 0; i < l; i++) {
                hash = (hash << 5) - hash + str.charCodeAt(i);
                hash |= 0;
                hash = this.xorshift(hash);
              }
            }
            return this.getSafeSeed(hash);
          };
          Prando3.prototype.getSafeSeed = function(seed) {
            if (seed === 0)
              return 1;
            return seed;
          };
          Prando3.MIN = -2147483648;
          Prando3.MAX = 2147483647;
          return Prando3;
        }()
      );
      return Prando2;
    });
    module2.exports.default = module2.exports;
  }
});

// uma-skill-tools/RaceSolver.ts
var import_assert3 = require("assert");

// uma-skill-tools/HorseTypes.ts
var import_assert = require("assert");
var StrategyHelpers;
((StrategyHelpers3) => {
  function assertIsStrategy(strategy) {
    (0, import_assert.strict)(strategy >= 1 /* Nige */ && strategy <= 5 /* Oonige */);
  }
  StrategyHelpers3.assertIsStrategy = assertIsStrategy;
  function strategyMatches(s1, s2) {
    return s1 == s2 || s1 == 1 /* Nige */ && s2 == 5 /* Oonige */ || s1 == 5 /* Oonige */ && s2 == 1 /* Nige */;
  }
  StrategyHelpers3.strategyMatches = strategyMatches;
})(StrategyHelpers || (StrategyHelpers = {}));

// uma-skill-tools/CourseData.ts
var import_assert2 = require("assert");

// uma-skill-tools/data/course_data.json
var course_data_default = { "10101": { corners: [{ length: 275, start: 400 }, { length: 259, start: 675 }], course: 1, courseSetStatus: [], distance: 1200, distanceType: 1, finishTimeMax: 71e4, finishTimeMin: 675e3, laneMax: 13500, raceTrackId: 10001, slopes: [], straights: [{ end: 400, frontType: 2, start: 0 }, { end: 1200, frontType: 1, start: 934 }], surface: 1, turn: 1 }, "10102": { corners: [{ length: 275, start: 150 }, { length: 275, start: 700 }, { length: 259, start: 975 }], course: 1, courseSetStatus: [], distance: 1500, distanceType: 2, finishTimeMax: 95e4, finishTimeMin: 879e3, laneMax: 13500, raceTrackId: 10001, slopes: [], straights: [{ end: 700, frontType: 2, start: 425 }, { end: 1500, frontType: 1, start: 1234 }], surface: 1, turn: 1 }, "10103": { corners: [{ length: 275, start: 175 }, { length: 275, start: 450 }, { length: 275, start: 1e3 }, { length: 259, start: 1275 }], course: 1, courseSetStatus: [], distance: 1800, distanceType: 2, finishTimeMax: 11e5, finishTimeMin: 1044e3, laneMax: 13500, raceTrackId: 10001, slopes: [], straights: [{ end: 175, frontType: 1, start: 0 }, { end: 1e3, frontType: 2, start: 725 }, { end: 1800, frontType: 1, start: 1534 }], surface: 1, turn: 1 }, "10104": { corners: [{ length: 275, start: 375 }, { length: 275, start: 650 }, { length: 275, start: 1200 }, { length: 259, start: 1475 }], course: 1, courseSetStatus: [3], distance: 2e3, distanceType: 3, finishTimeMax: 123e4, finishTimeMin: 1171e3, laneMax: 13500, raceTrackId: 10001, slopes: [], straights: [{ end: 375, frontType: 1, start: 0 }, { end: 1200, frontType: 2, start: 925 }, { end: 2e3, frontType: 1, start: 1734 }], surface: 1, turn: 1 }, "10105": { corners: [{ length: 275, start: 175 }, { length: 275, start: 450 }, { length: 275, start: 975 }, { length: 275, start: 1250 }, { length: 275, start: 1800 }, { length: 259, start: 2075 }], course: 1, courseSetStatus: [2], distance: 2600, distanceType: 4, finishTimeMax: 165e4, finishTimeMin: 1576e3, laneMax: 13500, raceTrackId: 10001, slopes: [], straights: [{ end: 175, frontType: 2, start: 0 }, { end: 975, frontType: 1, start: 725 }, { end: 1800, frontType: 2, start: 1525 }, { end: 2600, frontType: 1, start: 2334 }], surface: 1, turn: 1 }, "10106": { corners: [{ length: 230, start: 280 }, { length: 226, start: 510 }], course: 1, courseSetStatus: [], distance: 1e3, distanceType: 1, finishTimeMax: 63e4, finishTimeMin: 574e3, laneMax: 11e3, raceTrackId: 10001, slopes: [], straights: [{ end: 280, frontType: 2, start: 0 }, { end: 1e3, frontType: 1, start: 736 }], surface: 2, turn: 1 }, "10107": { corners: [{ length: 230, start: 240 }, { length: 230, start: 470 }, { length: 230, start: 980 }, { length: 226, start: 1210 }], course: 1, courseSetStatus: [1], distance: 1700, distanceType: 2, finishTimeMax: 113e4, finishTimeMin: 1014e3, laneMax: 11e3, raceTrackId: 10001, slopes: [], straights: [{ end: 240, frontType: 1, start: 0 }, { end: 980, frontType: 2, start: 700 }, { end: 1700, frontType: 1, start: 1436 }], surface: 2, turn: 1 }, "10108": { corners: [{ length: 230, start: 200 }, { length: 230, start: 430 }, { length: 230, start: 940 }, { length: 230, start: 1170 }, { length: 230, start: 1680 }, { length: 226, start: 1910 }], course: 1, courseSetStatus: [], distance: 2400, distanceType: 3, finishTimeMax: 156e4, finishTimeMin: 1491e3, laneMax: 11e3, raceTrackId: 10001, slopes: [], straights: [{ end: 200, frontType: 2, start: 0 }, { end: 940, frontType: 1, start: 660 }, { end: 1680, frontType: 2, start: 1408 }, { end: 2400, frontType: 1, start: 2136 }], surface: 2, turn: 1 }, "10201": { corners: [{ length: 220, start: 310 }, { length: 208, start: 530 }], course: 1, courseSetStatus: [], distance: 1e3, distanceType: 1, finishTimeMax: 57e4, finishTimeMin: 547e3, laneMax: 14700, raceTrackId: 10002, slopes: [{ length: 555, slope: 1e4, start: 0 }], straights: [{ end: 310, frontType: 2, start: 0 }, { end: 1e3, frontType: 1, start: 738 }], surface: 1, turn: 1 }, "10202": { corners: [{ length: 220, start: 510 }, { length: 208, start: 730 }], course: 1, courseSetStatus: [], distance: 1200, distanceType: 1, finishTimeMax: 71e4, finishTimeMin: 675e3, laneMax: 14700, raceTrackId: 10002, slopes: [{ length: 755, slope: 1e4, start: 0 }], straights: [{ end: 510, frontType: 2, start: 0 }, { end: 1200, frontType: 1, start: 938 }], surface: 1, turn: 1 }, "10203": { corners: [{ length: 220, start: 320 }, { length: 220, start: 540 }, { length: 220, start: 1110 }, { length: 208, start: 1330 }], course: 1, courseSetStatus: [3], distance: 1800, distanceType: 2, finishTimeMax: 11e5, finishTimeMin: 1044e3, laneMax: 14700, raceTrackId: 10002, slopes: [{ length: 200, slope: -1e4, start: 220 }, { length: 720, slope: 1e4, start: 665 }], straights: [{ end: 320, frontType: 1, start: 0 }, { end: 1110, frontType: 2, start: 760 }, { end: 1800, frontType: 1, start: 1538 }], surface: 1, turn: 1 }, "10204": { corners: [{ length: 220, start: 520 }, { length: 220, start: 740 }, { length: 220, start: 1310 }, { length: 208, start: 1530 }], course: 1, courseSetStatus: [1], distance: 2e3, distanceType: 3, finishTimeMax: 123e4, finishTimeMin: 1171e3, laneMax: 14700, raceTrackId: 10002, slopes: [{ length: 200, slope: -1e4, start: 420 }, { length: 720, slope: 1e4, start: 865 }], straights: [{ end: 520, frontType: 1, start: 0 }, { end: 1310, frontType: 2, start: 960 }, { end: 2e3, frontType: 1, start: 1738 }], surface: 1, turn: 1 }, "10205": { corners: [{ length: 240, start: 260 }, { length: 230, start: 500 }, { length: 220, start: 1120 }, { length: 220, start: 1340 }, { length: 220, start: 1910 }, { length: 208, start: 2130 }], course: 1, courseSetStatus: [2], distance: 2600, distanceType: 4, finishTimeMax: 165e4, finishTimeMin: 1576e3, laneMax: 14700, raceTrackId: 10002, slopes: [{ length: 495, slope: 1e4, start: 0 }, { length: 200, slope: -1e4, start: 970 }, { length: 720, slope: 1e4, start: 1425 }], straights: [{ end: 260, frontType: 2, start: 0 }, { end: 1120, frontType: 1, start: 730 }, { end: 1910, frontType: 2, start: 1560 }, { end: 2600, frontType: 1, start: 2338 }], surface: 1, turn: 1 }, "10206": { corners: [{ length: 190, start: 370 }, { length: 180, start: 560 }], course: 1, courseSetStatus: [], distance: 1e3, distanceType: 1, finishTimeMax: 63e4, finishTimeMin: 574e3, laneMax: 11e3, raceTrackId: 10002, slopes: [], straights: [{ end: 370, frontType: 2, start: 0 }, { end: 1e3, frontType: 1, start: 740 }], surface: 2, turn: 1 }, "10207": { corners: [{ length: 190, start: 350 }, { length: 190, start: 540 }, { length: 190, start: 1070 }, { length: 180, start: 1260 }], course: 1, courseSetStatus: [], distance: 1700, distanceType: 2, finishTimeMax: 113e4, finishTimeMin: 1014e3, laneMax: 11e3, raceTrackId: 10002, slopes: [{ length: 340, slope: -1e4, start: 275 }, { length: 670, slope: 1e4, start: 615 }], straights: [{ end: 350, frontType: 1, start: 0 }, { end: 1070, frontType: 2, start: 730 }, { end: 1700, frontType: 1, start: 1440 }], surface: 2, turn: 1 }, "10208": { corners: [{ length: 190, start: 292 }, { length: 190, start: 482 }, { length: 190, start: 1040 }, { length: 190, start: 1230 }, { length: 190, start: 1770 }, { length: 180, start: 1960 }], course: 1, courseSetStatus: [2], distance: 2400, distanceType: 3, finishTimeMax: 156e4, finishTimeMin: 1491e3, laneMax: 11e3, raceTrackId: 10002, slopes: [], straights: [{ end: 292, frontType: 2, start: 0 }, { end: 1040, frontType: 1, start: 672 }, { end: 1770, frontType: 2, start: 1420 }, { end: 2400, frontType: 1, start: 2140 }], surface: 2, turn: 1 }, "10301": { corners: [], course: 1, courseSetStatus: [3], distance: 1e3, distanceType: 1, finishTimeMax: 57e4, finishTimeMin: 547e3, laneMax: 23500, raceTrackId: 10003, slopes: [{ length: 240, slope: 1e4, start: 0 }, { length: 60, slope: -1e4, start: 240 }], straights: [{ end: 1e3, frontType: 1, start: 0 }], surface: 1, turn: 4 }, "10302": { corners: [{ length: 200, start: 450 }, { length: 192, start: 650 }], course: 2, courseSetStatus: [], distance: 1200, distanceType: 1, finishTimeMax: 71e4, finishTimeMin: 675e3, laneMax: 13500, raceTrackId: 10003, slopes: [], straights: [{ end: 450, frontType: 2, start: 0 }, { end: 1200, frontType: 1, start: 842 }], surface: 1, turn: 2 }, "10303": { corners: [{ length: 200, start: 650 }, { length: 192, start: 850 }], course: 2, courseSetStatus: [], distance: 1400, distanceType: 1, finishTimeMax: 84e4, finishTimeMin: 8e5, laneMax: 13500, raceTrackId: 10003, slopes: [], straights: [{ end: 650, frontType: 2, start: 0 }, { end: 1400, frontType: 1, start: 1042 }], surface: 1, turn: 2 }, "10304": { corners: [{ length: 200, start: 550 }, { length: 192, start: 750 }], course: 3, courseSetStatus: [], distance: 1600, distanceType: 2, finishTimeMax: 95e4, finishTimeMin: 908e3, laneMax: 13500, raceTrackId: 10003, slopes: [{ length: 350, slope: 1e4, start: 250 }, { length: 300, slope: -15e3, start: 600 }], straights: [{ end: 550, frontType: 2, start: 0 }, { end: 1600, frontType: 1, start: 942 }], surface: 1, turn: 2 }, "10305": { corners: [{ length: 200, start: 750 }, { length: 192, start: 950 }], course: 3, courseSetStatus: [3], distance: 1800, distanceType: 2, finishTimeMax: 11e5, finishTimeMin: 1044e3, laneMax: 13500, raceTrackId: 10003, slopes: [{ length: 350, slope: 1e4, start: 450 }, { length: 300, slope: -15e3, start: 800 }], straights: [{ end: 750, frontType: 2, start: 0 }, { end: 1800, frontType: 1, start: 1142 }], surface: 1, turn: 2 }, "10306": { corners: [{ length: 200, start: 420 }, { length: 200, start: 620 }, { length: 200, start: 1250 }, { length: 192, start: 1450 }], course: 2, courseSetStatus: [2, 3], distance: 2e3, distanceType: 3, finishTimeMax: 123e4, finishTimeMin: 1171e3, laneMax: 13500, raceTrackId: 10003, slopes: [], straights: [{ end: 420, frontType: 1, start: 0 }, { end: 1250, frontType: 2, start: 820 }, { end: 2e3, frontType: 1, start: 1642 }], surface: 1, turn: 2 }, "10307": { corners: [{ length: 200, start: 950 }, { length: 192, start: 1150 }], course: 3, courseSetStatus: [2, 3], distance: 2e3, distanceType: 3, finishTimeMax: 123e4, finishTimeMin: 1171e3, laneMax: 13500, raceTrackId: 10003, slopes: [{ length: 350, slope: 1e4, start: 650 }, { length: 300, slope: -15e3, start: 1e3 }], straights: [{ end: 950, frontType: 2, start: 0 }, { end: 2e3, frontType: 1, start: 1342 }], surface: 1, turn: 2 }, "10308": { corners: [{ length: 200, start: 650 }, { length: 200, start: 850 }, { length: 200, start: 1450 }, { length: 192, start: 1650 }], course: 2, courseSetStatus: [1], distance: 2200, distanceType: 3, finishTimeMax: 135e4, finishTimeMin: 1302e3, laneMax: 13500, raceTrackId: 10003, slopes: [], straights: [{ end: 650, frontType: 1, start: 0 }, { end: 1450, frontType: 2, start: 1050 }, { end: 2200, frontType: 1, start: 1842 }], surface: 1, turn: 2 }, "10309": { corners: [{ length: 200, start: 810 }, { length: 200, start: 1010 }, { length: 200, start: 1650 }, { length: 192, start: 1850 }], course: 2, courseSetStatus: [], distance: 2400, distanceType: 3, finishTimeMax: 149e4, finishTimeMin: 1416e3, laneMax: 13500, raceTrackId: 10003, slopes: [], straights: [{ end: 810, frontType: 1, start: 0 }, { end: 1650, frontType: 2, start: 1210 }, { end: 2400, frontType: 1, start: 2042 }], surface: 1, turn: 2 }, "10310": { corners: [{ length: 160, start: 540 }, { length: 147, start: 700 }], course: 1, courseSetStatus: [], distance: 1200, distanceType: 1, finishTimeMax: 77e4, finishTimeMin: 69e4, laneMax: 11e3, raceTrackId: 10003, slopes: [], straights: [{ end: 540, frontType: 2, start: 0 }, { end: 1200, frontType: 1, start: 847 }], surface: 2, turn: 2 }, "10311": { corners: [{ length: 160, start: 400 }, { length: 160, start: 560 }, { length: 160, start: 1140 }, { length: 147, start: 1300 }], course: 1, courseSetStatus: [5], distance: 1800, distanceType: 2, finishTimeMax: 118e4, finishTimeMin: 1081e3, laneMax: 11e3, raceTrackId: 10003, slopes: [], straights: [{ end: 400, frontType: 1, start: 0 }, { end: 1140, frontType: 2, start: 720 }, { end: 1800, frontType: 1, start: 1447 }], surface: 2, turn: 2 }, "10312": { corners: [{ length: 160, start: 380 }, { length: 160, start: 540 }, { length: 160, start: 1120 }, { length: 160, start: 1280 }, { length: 160, start: 1850 }, { length: 160, start: 2010 }], course: 1, courseSetStatus: [], distance: 2500, distanceType: 4, finishTimeMax: 164e4, finishTimeMin: 1591e3, laneMax: 11e3, raceTrackId: 10003, slopes: [], straights: [{ end: 380, frontType: 2, start: 0 }, { end: 1120, frontType: 1, start: 700 }, { end: 1850, frontType: 2, start: 1440 }, { end: 2500, frontType: 1, start: 2170 }], surface: 2, turn: 2 }, "10401": { corners: [{ length: 300, start: 420 }, { length: 188, start: 720 }], course: 1, courseSetStatus: [], distance: 1200, distanceType: 1, finishTimeMax: 71e4, finishTimeMin: 675e3, laneMax: 13e3, raceTrackId: 10004, slopes: [{ length: 100, slope: 15e3, start: 180 }], straights: [{ end: 420, frontType: 2, start: 0 }, { end: 1200, frontType: 1, start: 908 }], surface: 1, turn: 1 }, "10402": { corners: [{ length: 200, start: 330 }, { length: 200, start: 530 }, { length: 300, start: 1020 }, { length: 188, start: 1320 }], course: 1, courseSetStatus: [2], distance: 1800, distanceType: 2, finishTimeMax: 11e5, finishTimeMin: 1044e3, laneMax: 13e3, raceTrackId: 10004, slopes: [{ length: 100, slope: 15e3, start: 780 }], straights: [{ end: 330, frontType: 1, start: 0 }, { end: 1020, frontType: 2, start: 730 }, { end: 1800, frontType: 1, start: 1508 }], surface: 1, turn: 1 }, "10403": { corners: [{ length: 200, start: 530 }, { length: 200, start: 730 }, { length: 300, start: 1220 }, { length: 188, start: 1520 }], course: 1, courseSetStatus: [2], distance: 2e3, distanceType: 3, finishTimeMax: 123e4, finishTimeMin: 1171e3, laneMax: 13e3, raceTrackId: 10004, slopes: [{ length: 100, slope: 15e3, start: 980 }], straights: [{ end: 530, frontType: 1, start: 0 }, { end: 1220, frontType: 2, start: 930 }, { end: 2e3, frontType: 1, start: 1708 }], surface: 1, turn: 1 }, "10404": { corners: [{ length: 300, start: 220 }, { length: 200, start: 520 }, { length: 200, start: 1130 }, { length: 200, start: 1330 }, { length: 300, start: 1820 }, { length: 188, start: 2120 }], course: 1, courseSetStatus: [], distance: 2600, distanceType: 4, finishTimeMax: 165e4, finishTimeMin: 1576e3, laneMax: 13e3, raceTrackId: 10004, slopes: [{ length: 80, slope: 15e3, start: 0 }, { length: 100, slope: 15e3, start: 1580 }], straights: [{ end: 220, frontType: 2, start: 0 }, { end: 1130, frontType: 1, start: 720 }, { end: 1820, frontType: 2, start: 1530 }, { end: 2600, frontType: 1, start: 2308 }], surface: 1, turn: 1 }, "10405": { corners: [{ length: 210, start: 500 }, { length: 145, start: 710 }], course: 1, courseSetStatus: [], distance: 1150, distanceType: 1, finishTimeMax: 72e4, finishTimeMin: 666e3, laneMax: 11500, raceTrackId: 10004, slopes: [], straights: [{ end: 500, frontType: 2, start: 0 }, { end: 1150, frontType: 1, start: 855 }], surface: 2, turn: 1 }, "10406": { corners: [{ length: 170, start: 360 }, { length: 170, start: 530 }, { length: 210, start: 1050 }, { length: 145, start: 1260 }], course: 1, courseSetStatus: [3], distance: 1700, distanceType: 2, finishTimeMax: 113e4, finishTimeMin: 1014e3, laneMax: 11500, raceTrackId: 10004, slopes: [{ length: 320, slope: -1e4, start: 285 }], straights: [{ end: 360, frontType: 1, start: 0 }, { end: 1050, frontType: 2, start: 700 }, { end: 1700, frontType: 1, start: 1405 }], surface: 2, turn: 1 }, "10407": { corners: [{ length: 210, start: 310 }, { length: 160, start: 520 }, { length: 170, start: 1060 }, { length: 170, start: 1230 }, { length: 210, start: 1750 }, { length: 145, start: 1960 }], course: 1, courseSetStatus: [2], distance: 2400, distanceType: 3, finishTimeMax: 156e4, finishTimeMin: 1491e3, laneMax: 11500, raceTrackId: 10004, slopes: [], straights: [{ end: 310, frontType: 2, start: 0 }, { end: 1060, frontType: 1, start: 680 }, { end: 1750, frontType: 2, start: 1400 }, { end: 2400, frontType: 1, start: 2105 }], surface: 2, turn: 1 }, "10501": { corners: [{ length: 350, start: 300 }, { length: 240, start: 650 }], course: 3, courseSetStatus: [], distance: 1200, distanceType: 1, finishTimeMax: 71e4, finishTimeMin: 675e3, laneMax: 12e3, raceTrackId: 10005, slopes: [{ length: 200, slope: -15e3, start: 0 }, { length: 110, slope: 2e4, start: 1025 }], straights: [{ end: 1200, frontType: 1, start: 890 }], surface: 1, turn: 1 }, "10502": { corners: [{ length: 450, start: 50 }, { length: 350, start: 700 }, { length: 240, start: 1050 }], course: 3, courseSetStatus: [3], distance: 1600, distanceType: 2, finishTimeMax: 95e4, finishTimeMin: 908e3, laneMax: 12e3, raceTrackId: 10005, slopes: [{ length: 300, slope: -15e3, start: 300 }, { length: 110, slope: 2e4, start: 1425 }], straights: [{ end: 1600, frontType: 1, start: 1290 }], surface: 1, turn: 1 }, "10503": { corners: [{ length: 250, start: 175 }, { length: 250, start: 425 }, { length: 250, start: 1e3 }, { length: 240, start: 1250 }], course: 2, courseSetStatus: [], distance: 1800, distanceType: 2, finishTimeMax: 11e5, finishTimeMin: 1044e3, laneMax: 12e3, raceTrackId: 10005, slopes: [{ length: 35, slope: 2e4, start: 1 }, { length: 200, slope: 15e3, start: 125 }, { length: 400, slope: -15e3, start: 425 }, { length: 110, slope: 2e4, start: 1625 }], straights: [{ end: 175, frontType: 1, start: 0 }, { end: 1e3, frontType: 2, start: 675 }, { end: 1800, frontType: 1, start: 1490 }], surface: 1, turn: 1 }, "10504": { corners: [{ length: 250, start: 375 }, { length: 250, start: 625 }, { length: 250, start: 1200 }, { length: 240, start: 1450 }], course: 2, courseSetStatus: [1], distance: 2e3, distanceType: 3, finishTimeMax: 123e4, finishTimeMin: 1171e3, laneMax: 12e3, raceTrackId: 10005, slopes: [{ length: 110, slope: 2e4, start: 125 }, { length: 200, slope: 15e3, start: 325 }, { length: 400, slope: -15e3, start: 625 }, { length: 110, slope: 2e4, start: 1825 }], straights: [{ end: 375, frontType: 1, start: 0 }, { end: 1200, frontType: 2, start: 875 }, { end: 2e3, frontType: 1, start: 1690 }], surface: 1, turn: 1 }, "10505": { corners: [{ length: 247, start: 403 }, { length: 450, start: 650 }, { length: 350, start: 1300 }, { length: 240, start: 1650 }], course: 3, courseSetStatus: [2, 4], distance: 2200, distanceType: 3, finishTimeMax: 135e4, finishTimeMin: 1302e3, laneMax: 12e3, raceTrackId: 10005, slopes: [{ length: 110, slope: 2e4, start: 153 }, { length: 200, slope: 15e3, start: 353 }, { length: 300, slope: -15e3, start: 900 }, { length: 110, slope: 2e4, start: 2025 }], straights: [{ end: 403, frontType: 1, start: 0 }, { end: 2200, frontType: 1, start: 1890 }], surface: 1, turn: 1 }, "10506": { corners: [{ length: 146, start: 100 }, { length: 250, start: 246 }, { length: 250, start: 875 }, { length: 250, start: 1125 }, { length: 250, start: 1700 }, { length: 240, start: 1950 }], course: 2, courseSetStatus: [2, 4], distance: 2500, distanceType: 4, finishTimeMax: 157e4, finishTimeMin: 1487e3, laneMax: 12e3, raceTrackId: 10005, slopes: [{ length: 110, slope: 2e4, start: 621 }, { length: 200, slope: 15e3, start: 825 }, { length: 400, slope: -15e3, start: 1125 }, { length: 110, slope: 2e4, start: 2325 }], straights: [{ end: 875, frontType: 1, start: 496 }, { end: 1700, frontType: 2, start: 1375 }, { end: 2500, frontType: 1, start: 2190 }], surface: 1, turn: 1 }, "10507": { corners: [{ length: 250, start: 290 }, { length: 250, start: 540 }, { length: 250, start: 1115 }, { length: 250, start: 1365 }, { length: 250, start: 1975 }, { length: 250, start: 2225 }, { length: 250, start: 2800 }, { length: 240, start: 3050 }], course: 2, courseSetStatus: [2], distance: 3600, distanceType: 4, finishTimeMax: 227e4, finishTimeMin: 2231e3, laneMax: 12e3, raceTrackId: 10005, slopes: [{ length: 110, slope: 2e4, start: 40 }, { length: 200, slope: 15e3, start: 240 }, { length: 400, slope: -15e3, start: 540 }, { length: 110, slope: 2e4, start: 1740 }, { length: 200, slope: 15e3, start: 1925 }, { length: 400, slope: -15e3, start: 2225 }, { length: 110, slope: 2e4, start: 3425 }], straights: [{ end: 290, frontType: 1, start: 0 }, { end: 1115, frontType: 2, start: 790 }, { end: 1975, frontType: 1, start: 1615 }, { end: 2800, frontType: 2, start: 2475 }, { end: 3600, frontType: 1, start: 3290 }], surface: 1, turn: 1 }, "10508": { corners: [{ length: 200, start: 500 }, { length: 192, start: 700 }], course: 1, courseSetStatus: [3], distance: 1200, distanceType: 1, finishTimeMax: 77e4, finishTimeMin: 69e4, laneMax: 12e3, raceTrackId: 10005, slopes: [{ length: 175, slope: -15e3, start: 175 }, { length: 175, slope: 15e3, start: 1e3 }], straights: [{ end: 500, frontType: 2, start: 0 }, { end: 1200, frontType: 1, start: 892 }], surface: 2, turn: 1 }, "10509": { corners: [{ length: 200, start: 350 }, { length: 200, start: 550 }, { length: 200, start: 1100 }, { length: 192, start: 1300 }], course: 1, courseSetStatus: [3], distance: 1800, distanceType: 2, finishTimeMax: 118e4, finishTimeMin: 1081e3, laneMax: 12e3, raceTrackId: 10005, slopes: [{ length: 175, slope: 15e3, start: 100 }, { length: 175, slope: 1e4, start: 350 }, { length: 175, slope: -15e3, start: 775 }, { length: 175, slope: 15e3, start: 1600 }], straights: [{ end: 350, frontType: 1, start: 0 }, { end: 1100, frontType: 1, start: 750 }, { end: 1800, frontType: 1, start: 1492 }], surface: 2, turn: 1 }, "10510": { corners: [{ length: 200, start: 200 }, { length: 200, start: 400 }, { length: 200, start: 950 }, { length: 200, start: 1150 }, { length: 200, start: 1700 }, { length: 192, start: 1900 }], course: 1, courseSetStatus: [2], distance: 2400, distanceType: 3, finishTimeMax: 156e4, finishTimeMin: 1491e3, laneMax: 12e3, raceTrackId: 10005, slopes: [], straights: [{ end: 200, frontType: 2, start: 0 }, { end: 950, frontType: 1, start: 600 }, { end: 1700, frontType: 2, start: 1350 }, { end: 2400, frontType: 1, start: 2092 }], surface: 2, turn: 1 }, "10511": { corners: [{ length: 200, start: 300 }, { length: 200, start: 500 }, { length: 200, start: 1050 }, { length: 200, start: 1250 }, { length: 200, start: 1800 }, { length: 192, start: 2e3 }], course: 1, courseSetStatus: [], distance: 2500, distanceType: 4, finishTimeMax: 164e4, finishTimeMin: 1591e3, laneMax: 12e3, raceTrackId: 10005, slopes: [], straights: [{ end: 300, frontType: 2, start: 0 }, { end: 1050, frontType: 1, start: 700 }, { end: 1800, frontType: 2, start: 1450 }, { end: 2500, frontType: 1, start: 2192 }], surface: 2, turn: 1 }, "10601": { corners: [{ length: 275, start: 350 }, { length: 250, start: 625 }], course: 1, courseSetStatus: [2, 3], distance: 1400, distanceType: 1, finishTimeMax: 84e4, finishTimeMin: 8e5, laneMax: 15e3, raceTrackId: 10006, slopes: [{ length: 75, slope: 2e4, start: 125 }, { length: 250, slope: -15e3, start: 250 }, { length: 150, slope: 15e3, start: 950 }], straights: [{ end: 350, frontType: 2, start: 0 }, { end: 1400, frontType: 1, start: 875 }], surface: 1, turn: 2 }, "10602": { corners: [{ length: 275, start: 550 }, { length: 250, start: 825 }], course: 1, courseSetStatus: [2, 4], distance: 1600, distanceType: 2, finishTimeMax: 95e4, finishTimeMin: 908e3, laneMax: 15e3, raceTrackId: 10006, slopes: [{ length: 75, slope: 2e4, start: 325 }, { length: 250, slope: -15e3, start: 450 }, { length: 150, slope: 15e3, start: 1150 }], straights: [{ end: 550, frontType: 2, start: 0 }, { end: 1600, frontType: 1, start: 1075 }], surface: 1, turn: 2 }, "10603": { corners: [{ length: 250, start: 75 }, { length: 275, start: 750 }, { length: 250, start: 1025 }], course: 1, courseSetStatus: [1], distance: 1800, distanceType: 2, finishTimeMax: 11e5, finishTimeMin: 1044e3, laneMax: 15e3, raceTrackId: 10006, slopes: [{ length: 75, slope: 2e4, start: 525 }, { length: 250, slope: -15e3, start: 650 }, { length: 150, slope: 15e3, start: 1350 }], straights: [{ end: 750, frontType: 2, start: 325 }, { end: 1800, frontType: 1, start: 1275 }], surface: 1, turn: 2 }, "10604": { corners: [{ length: 200, start: 200 }, { length: 275, start: 950 }, { length: 250, start: 1225 }], course: 1, courseSetStatus: [], distance: 2e3, distanceType: 3, finishTimeMax: 123e4, finishTimeMin: 1171e3, laneMax: 15e3, raceTrackId: 10006, slopes: [{ length: 75, slope: 2e4, start: 725 }, { length: 250, slope: -15e3, start: 850 }, { length: 150, slope: 15e3, start: 1550 }], straights: [{ end: 950, frontType: 2, start: 400 }, { end: 2e3, frontType: 1, start: 1475 }], surface: 1, turn: 2 }, "10605": { corners: [{ length: 250, start: 225 }, { length: 325, start: 475 }, { length: 275, start: 1250 }, { length: 250, start: 1525 }], course: 1, courseSetStatus: [3], distance: 2300, distanceType: 3, finishTimeMax: 143e4, finishTimeMin: 1393e3, laneMax: 15e3, raceTrackId: 10006, slopes: [{ length: 75, slope: 2e4, start: 1025 }, { length: 250, slope: -15e3, start: 1150 }, { length: 150, slope: 15e3, start: 1850 }], straights: [{ end: 225, frontType: 1, start: 0 }, { end: 1250, frontType: 2, start: 800 }, { end: 2300, frontType: 1, start: 1775 }], surface: 1, turn: 2 }, "10606": { corners: [{ length: 250, start: 325 }, { length: 325, start: 575 }, { length: 275, start: 1350 }, { length: 250, start: 1625 }], course: 1, courseSetStatus: [], distance: 2400, distanceType: 3, finishTimeMax: 149e4, finishTimeMin: 1416e3, laneMax: 15e3, raceTrackId: 10006, slopes: [{ length: 40, slope: 15e3, start: 0 }, { length: 75, slope: 2e4, start: 1125 }, { length: 250, slope: -15e3, start: 1250 }, { length: 150, slope: 15e3, start: 1950 }], straights: [{ end: 325, frontType: 1, start: 0 }, { end: 1350, frontType: 2, start: 900 }, { end: 2400, frontType: 1, start: 1875 }], surface: 1, turn: 2 }, "10607": { corners: [{ length: 250, start: 425 }, { length: 325, start: 675 }, { length: 275, start: 1450 }, { length: 250, start: 1725 }], course: 1, courseSetStatus: [2], distance: 2500, distanceType: 4, finishTimeMax: 157e4, finishTimeMin: 1487e3, laneMax: 15e3, raceTrackId: 10006, slopes: [{ length: 140, slope: 15e3, start: 0 }, { length: 75, slope: 2e4, start: 1225 }, { length: 250, slope: -15e3, start: 1350 }, { length: 150, slope: 15e3, start: 2050 }], straights: [{ end: 425, frontType: 1, start: 0 }, { end: 1450, frontType: 2, start: 1e3 }, { end: 2500, frontType: 1, start: 1975 }], surface: 1, turn: 2 }, "10608": { corners: [{ length: 275, start: 292 }, { length: 275, start: 567 }, { length: 250, start: 1325 }, { length: 325, start: 1575 }, { length: 275, start: 2350 }, { length: 250, start: 2625 }], course: 1, courseSetStatus: [], distance: 3400, distanceType: 4, finishTimeMax: 214e4, finishTimeMin: 2099e3, laneMax: 15e3, raceTrackId: 10006, slopes: [{ length: 75, slope: 2e4, start: 67 }, { length: 250, slope: -15e3, start: 192 }, { length: 150, slope: 15e3, start: 892 }, { length: 75, slope: 2e4, start: 2125 }, { length: 250, slope: -15e3, start: 2250 }, { length: 150, slope: 15e3, start: 2950 }], straights: [{ end: 292, frontType: 2, start: 0 }, { end: 1325, frontType: 1, start: 842 }, { end: 2350, frontType: 2, start: 1900 }, { end: 3400, frontType: 1, start: 2875 }], surface: 1, turn: 2 }, "10609": { corners: [{ length: 225, start: 350 }, { length: 224, start: 575 }], course: 1, courseSetStatus: [1], distance: 1300, distanceType: 1, finishTimeMax: 82e4, finishTimeMin: 766e3, laneMax: 12500, raceTrackId: 10006, slopes: [{ length: 200, slope: -1e4, start: 275 }, { length: 250, slope: 15e3, start: 800 }], straights: [{ end: 350, frontType: 2, start: 0 }, { end: 1300, frontType: 1, start: 799 }], surface: 2, turn: 2 }, "10610": { corners: [{ length: 225, start: 450 }, { length: 224, start: 675 }], course: 1, courseSetStatus: [2], distance: 1400, distanceType: 1, finishTimeMax: 94e4, finishTimeMin: 808e3, laneMax: 12500, raceTrackId: 10006, slopes: [{ length: 200, slope: -1e4, start: 375 }, { length: 250, slope: 15e3, start: 900 }], straights: [{ end: 450, frontType: 2, start: 0 }, { end: 1400, frontType: 1, start: 899 }], surface: 2, turn: 2 }, "10611": { corners: [{ length: 225, start: 650 }, { length: 224, start: 875 }], course: 1, courseSetStatus: [1, 2], distance: 1600, distanceType: 2, finishTimeMax: 108e4, finishTimeMin: 941e3, laneMax: 12500, raceTrackId: 10006, slopes: [{ length: 200, slope: -1e4, start: 575 }, { length: 250, slope: 15e3, start: 1100 }], straights: [{ end: 650, frontType: 2, start: 0 }, { end: 1600, frontType: 1, start: 1099 }], surface: 2, turn: 2 }, "10612": { corners: [{ length: 250, start: 200 }, { length: 250, start: 450 }, { length: 225, start: 1150 }, { length: 224, start: 1375 }], course: 1, courseSetStatus: [], distance: 2100, distanceType: 3, finishTimeMax: 133e4, finishTimeMin: 1274e3, laneMax: 12500, raceTrackId: 10006, slopes: [{ length: 200, slope: -1e4, start: 1075 }, { length: 250, slope: 15e3, start: 1600 }], straights: [{ end: 200, frontType: 1, start: 0 }, { end: 1150, frontType: 2, start: 700 }, { end: 2100, frontType: 1, start: 1599 }], surface: 2, turn: 2 }, "10613": { corners: [{ length: 250, start: 500 }, { length: 250, start: 750 }, { length: 225, start: 1450 }, { length: 225, start: 1675 }, { length: 500, start: 2348 }], course: 1, courseSetStatus: [2], distance: 2400, distanceType: 3, finishTimeMax: 156e4, finishTimeMin: 1491e3, laneMax: 12500, raceTrackId: 10006, slopes: [], straights: [{ end: 500, frontType: 1, start: 0 }, { end: 1450, frontType: 2, start: 1e3 }, { end: 2400, frontType: 1, start: 1900 }], surface: 2, turn: 2 }, "10701": { corners: [{ length: 250, start: 300 }, { length: 238, start: 550 }], course: 1, courseSetStatus: [], distance: 1200, distanceType: 1, finishTimeMax: 71e4, finishTimeMin: 675e3, laneMax: 14400, raceTrackId: 10007, slopes: [{ length: 775, slope: -1e4, start: 100 }, { length: 100, slope: 2e4, start: 875 }], straights: [{ end: 300, frontType: 2, start: 0 }, { end: 1200, frontType: 1, start: 788 }], surface: 1, turn: 2 }, "10702": { corners: [{ length: 250, start: 500 }, { length: 238, start: 750 }], course: 1, courseSetStatus: [], distance: 1400, distanceType: 1, finishTimeMax: 84e4, finishTimeMin: 8e5, laneMax: 14400, raceTrackId: 10007, slopes: [{ length: 775, slope: -1e4, start: 300 }, { length: 100, slope: 2e4, start: 1075 }], straights: [{ end: 500, frontType: 2, start: 0 }, { end: 1400, frontType: 1, start: 988 }], surface: 1, turn: 2 }, "10703": { corners: [{ length: 150, start: 150 }, { length: 250, start: 700 }, { length: 238, start: 950 }], course: 1, courseSetStatus: [1], distance: 1600, distanceType: 2, finishTimeMax: 95e4, finishTimeMin: 908e3, laneMax: 14400, raceTrackId: 10007, slopes: [{ length: 775, slope: -1e4, start: 500 }, { length: 100, slope: 2e4, start: 1275 }], straights: [{ end: 700, frontType: 2, start: 300 }, { end: 1600, frontType: 1, start: 1188 }], surface: 1, turn: 2 }, "10704": { corners: [{ length: 200, start: 300 }, { length: 200, start: 500 }, { length: 250, start: 1100 }, { length: 238, start: 1350 }], course: 1, courseSetStatus: [], distance: 2e3, distanceType: 3, finishTimeMax: 123e4, finishTimeMin: 1171e3, laneMax: 14400, raceTrackId: 10007, slopes: [{ length: 50, slope: 2e4, start: 0 }, { length: 775, slope: -1e4, start: 900 }, { length: 100, slope: 2e4, start: 1675 }], straights: [{ end: 300, frontType: 1, start: 0 }, { end: 1100, frontType: 2, start: 700 }, { end: 2e3, frontType: 1, start: 1588 }], surface: 1, turn: 2 }, "10705": { corners: [{ length: 200, start: 500 }, { length: 200, start: 700 }, { length: 250, start: 1300 }, { length: 238, start: 1550 }], course: 1, courseSetStatus: [2], distance: 2200, distanceType: 3, finishTimeMax: 135e4, finishTimeMin: 1302e3, laneMax: 14400, raceTrackId: 10007, slopes: [{ length: 150, slope: -1e4, start: 0 }, { length: 100, slope: 2e4, start: 150 }, { length: 775, slope: -1e4, start: 1100 }, { length: 100, slope: 2e4, start: 1875 }], straights: [{ end: 500, frontType: 1, start: 0 }, { end: 1300, frontType: 2, start: 900 }, { end: 2200, frontType: 1, start: 1788 }], surface: 1, turn: 2 }, "10706": { corners: [{ length: 200, start: 400 }, { length: 190, start: 600 }], course: 1, courseSetStatus: [], distance: 1200, distanceType: 1, finishTimeMax: 77e4, finishTimeMin: 69e4, laneMax: 13e3, raceTrackId: 10007, slopes: [], straights: [{ end: 400, frontType: 2, start: 0 }, { end: 1200, frontType: 1, start: 790 }], surface: 2, turn: 2 }, "10707": { corners: [{ length: 200, start: 600 }, { length: 190, start: 800 }], course: 1, courseSetStatus: [], distance: 1400, distanceType: 1, finishTimeMax: 94e4, finishTimeMin: 808e3, laneMax: 13e3, raceTrackId: 10007, slopes: [{ length: 600, slope: -15e3, start: 425 }, { length: 150, slope: 15e3, start: 1025 }], straights: [{ end: 600, frontType: 2, start: 0 }, { end: 1400, frontType: 1, start: 990 }], surface: 2, turn: 2 }, "10708": { corners: [{ length: 165, start: 270 }, { length: 165, start: 435 }, { length: 200, start: 1e3 }, { length: 190, start: 1200 }], course: 1, courseSetStatus: [2], distance: 1800, distanceType: 2, finishTimeMax: 118e4, finishTimeMin: 1081e3, laneMax: 13e3, raceTrackId: 10007, slopes: [{ length: 50, slope: 15e3, start: 0 }, { length: 600, slope: -15e3, start: 825 }, { length: 150, slope: 15e3, start: 1425 }], straights: [{ end: 270, frontType: 1, start: 0 }, { end: 1e3, frontType: 2, start: 600 }, { end: 1800, frontType: 1, start: 1390 }], surface: 2, turn: 2 }, "10709": { corners: [{ length: 165, start: 370 }, { length: 165, start: 535 }, { length: 200, start: 1100 }, { length: 190, start: 1300 }], course: 1, courseSetStatus: [], distance: 1900, distanceType: 3, finishTimeMax: 123e4, finishTimeMin: 1142e3, laneMax: 13e3, raceTrackId: 10007, slopes: [], straights: [{ end: 370, frontType: 1, start: 0 }, { end: 1100, frontType: 2, start: 700 }, { end: 1900, frontType: 1, start: 1490 }], surface: 2, turn: 2 }, "10801": { corners: [{ length: 275, start: 320 }, { length: 277, start: 595 }], course: 2, courseSetStatus: [], distance: 1200, distanceType: 1, finishTimeMax: 71e4, finishTimeMin: 675e3, laneMax: 14100, raceTrackId: 10008, slopes: [{ length: 175, slope: 15e3, start: 120 }, { length: 150, slope: -15e3, start: 420 }], straights: [{ end: 320, frontType: 2, start: 0 }, { end: 1200, frontType: 1, start: 872 }], surface: 1, turn: 1 }, "10802": { corners: [{ length: 275, start: 520 }, { length: 277, start: 795 }], course: 2, courseSetStatus: [], distance: 1400, distanceType: 1, finishTimeMax: 84e4, finishTimeMin: 8e5, laneMax: 14100, raceTrackId: 10008, slopes: [{ length: 175, slope: 15e3, start: 320 }, { length: 150, slope: -15e3, start: 620 }], straights: [{ end: 520, frontType: 2, start: 0 }, { end: 1400, frontType: 1, start: 1072 }], surface: 1, turn: 1 }, "10803": { corners: [{ length: 250, start: 500 }, { length: 247, start: 750 }], course: 3, courseSetStatus: [], distance: 1400, distanceType: 1, finishTimeMax: 84e4, finishTimeMin: 8e5, laneMax: 14100, raceTrackId: 10008, slopes: [{ length: 100, slope: 2e4, start: 250 }, { length: 225, slope: 1e4, start: 350 }, { length: 150, slope: -2e4, start: 575 }], straights: [{ end: 500, frontType: 2, start: 0 }, { end: 1400, frontType: 1, start: 997 }], surface: 1, turn: 1 }, "10804": { corners: [{ length: 275, start: 720 }, { length: 277, start: 995 }], course: 2, courseSetStatus: [1], distance: 1600, distanceType: 2, finishTimeMax: 95e4, finishTimeMin: 908e3, laneMax: 14100, raceTrackId: 10008, slopes: [{ length: 175, slope: 15e3, start: 520 }, { length: 150, slope: -15e3, start: 820 }], straights: [{ end: 720, frontType: 2, start: 200 }, { end: 1600, frontType: 1, start: 1272 }], surface: 1, turn: 1 }, "10805": { corners: [{ length: 250, start: 700 }, { length: 247, start: 950 }], course: 3, courseSetStatus: [1], distance: 1600, distanceType: 2, finishTimeMax: 95e4, finishTimeMin: 908e3, laneMax: 14100, raceTrackId: 10008, slopes: [{ length: 100, slope: 2e4, start: 450 }, { length: 225, slope: 1e4, start: 550 }, { length: 150, slope: -2e4, start: 775 }], straights: [{ end: 700, frontType: 2, start: 200 }, { end: 1600, frontType: 1, start: 1197 }], surface: 1, turn: 1 }, "10806": { corners: [{ length: 250, start: 900 }, { length: 247, start: 1150 }], course: 3, courseSetStatus: [], distance: 1800, distanceType: 2, finishTimeMax: 11e5, finishTimeMin: 1044e3, laneMax: 14100, raceTrackId: 10008, slopes: [{ length: 100, slope: 2e4, start: 650 }, { length: 225, slope: 1e4, start: 750 }, { length: 150, slope: -2e4, start: 975 }], straights: [{ end: 900, frontType: 2, start: 400 }, { end: 1800, frontType: 1, start: 1397 }], surface: 1, turn: 1 }, "10807": { corners: [{ length: 185, start: 400 }, { length: 185, start: 585 }, { length: 275, start: 1120 }, { length: 277, start: 1395 }], course: 2, courseSetStatus: [3], distance: 2e3, distanceType: 3, finishTimeMax: 123e4, finishTimeMin: 1171e3, laneMax: 14100, raceTrackId: 10008, slopes: [{ length: 175, slope: 15e3, start: 970 }, { length: 150, slope: -15e3, start: 1270 }], straights: [{ end: 400, frontType: 1, start: 0 }, { end: 1120, frontType: 2, start: 770 }, { end: 2e3, frontType: 1, start: 1672 }], surface: 1, turn: 1 }, "10808": { corners: [{ length: 200, start: 400 }, { length: 200, start: 600 }, { length: 250, start: 1300 }, { length: 247, start: 1550 }], course: 3, courseSetStatus: [1], distance: 2200, distanceType: 3, finishTimeMax: 135e4, finishTimeMin: 1302e3, laneMax: 14100, raceTrackId: 10008, slopes: [{ length: 100, slope: 2e4, start: 1050 }, { length: 225, slope: 1e4, start: 1150 }, { length: 150, slope: -2e4, start: 1375 }], straights: [{ end: 400, frontType: 1, start: 0 }, { end: 1300, frontType: 2, start: 800 }, { end: 2200, frontType: 1, start: 1797 }], surface: 1, turn: 1 }, "10809": { corners: [{ length: 200, start: 600 }, { length: 200, start: 800 }, { length: 250, start: 1500 }, { length: 247, start: 1750 }], course: 3, courseSetStatus: [3], distance: 2400, distanceType: 3, finishTimeMax: 149e4, finishTimeMin: 1416e3, laneMax: 14100, raceTrackId: 10008, slopes: [{ length: 100, slope: 2e4, start: 1250 }, { length: 225, slope: 1e4, start: 1350 }, { length: 150, slope: -2e4, start: 1575 }], straights: [{ end: 600, frontType: 1, start: 0 }, { end: 1500, frontType: 2, start: 1e3 }, { end: 2400, frontType: 1, start: 1997 }], surface: 1, turn: 1 }, "10810": { corners: [{ length: 250, start: 261 }, { length: 250, start: 511 }, { length: 200, start: 1250 }, { length: 200, start: 1450 }, { length: 250, start: 2100 }, { length: 247, start: 2350 }], course: 3, courseSetStatus: [3, 5], distance: 3e3, distanceType: 4, finishTimeMax: 19e5, finishTimeMin: 1815e3, laneMax: 14100, raceTrackId: 10008, slopes: [{ length: 100, slope: 2e4, start: 11 }, { length: 225, slope: 1e4, start: 111 }, { length: 150, slope: -2e4, start: 336 }, { length: 100, slope: 2e4, start: 1850 }, { length: 225, slope: 1e4, start: 1950 }, { length: 150, slope: -2e4, start: 2175 }], straights: [{ end: 261, frontType: 2, start: 0 }, { end: 1250, frontType: 1, start: 761 }, { end: 2100, frontType: 2, start: 1650 }, { end: 3e3, frontType: 1, start: 2597 }], surface: 1, turn: 1 }, "10811": { corners: [{ length: 250, start: 458 }, { length: 250, start: 708 }, { length: 200, start: 1450 }, { length: 200, start: 1650 }, { length: 250, start: 2300 }, { length: 247, start: 2550 }], course: 3, courseSetStatus: [], distance: 3200, distanceType: 4, finishTimeMax: 204e4, finishTimeMin: 193e4, laneMax: 14100, raceTrackId: 10008, slopes: [{ length: 100, slope: 2e4, start: 208 }, { length: 225, slope: 1e4, start: 308 }, { length: 150, slope: -2e4, start: 533 }, { length: 100, slope: 2e4, start: 2050 }, { length: 225, slope: 1e4, start: 2150 }, { length: 150, slope: -2e4, start: 2375 }], straights: [{ end: 458, frontType: 2, start: 0 }, { end: 1450, frontType: 1, start: 958 }, { end: 2300, frontType: 2, start: 1850 }, { end: 3200, frontType: 1, start: 2797 }], surface: 1, turn: 1 }, "10812": { corners: [{ length: 225, start: 400 }, { length: 246, start: 625 }], course: 1, courseSetStatus: [], distance: 1200, distanceType: 1, finishTimeMax: 77e4, finishTimeMin: 69e4, laneMax: 13e3, raceTrackId: 10008, slopes: [{ length: 200, slope: 15e3, start: 175 }, { length: 200, slope: -15e3, start: 475 }], straights: [{ end: 400, frontType: 2, start: 0 }, { end: 1200, frontType: 1, start: 871 }], surface: 2, turn: 1 }, "10813": { corners: [{ length: 225, start: 600 }, { length: 246, start: 825 }], course: 1, courseSetStatus: [], distance: 1400, distanceType: 1, finishTimeMax: 94e4, finishTimeMin: 808e3, laneMax: 13e3, raceTrackId: 10008, slopes: [{ length: 200, slope: 15e3, start: 375 }, { length: 200, slope: -15e3, start: 675 }], straights: [{ end: 600, frontType: 2, start: 100 }, { end: 1400, frontType: 1, start: 1071 }], surface: 2, turn: 1 }, "10814": { corners: [{ length: 150, start: 300 }, { length: 150, start: 450 }, { length: 225, start: 1e3 }, { length: 246, start: 1225 }], course: 1, courseSetStatus: [], distance: 1800, distanceType: 2, finishTimeMax: 118e4, finishTimeMin: 1081e3, laneMax: 13e3, raceTrackId: 10008, slopes: [{ length: 200, slope: 15e3, start: 775 }, { length: 200, slope: -15e3, start: 1075 }], straights: [{ end: 300, frontType: 1, start: 0 }, { end: 1e3, frontType: 2, start: 600 }, { end: 1800, frontType: 1, start: 1471 }], surface: 2, turn: 1 }, "10815": { corners: [{ length: 150, start: 400 }, { length: 150, start: 550 }, { length: 225, start: 1100 }, { length: 246, start: 1325 }], course: 1, courseSetStatus: [], distance: 1900, distanceType: 3, finishTimeMax: 123e4, finishTimeMin: 1142e3, laneMax: 13e3, raceTrackId: 10008, slopes: [{ length: 200, slope: 15e3, start: 875 }, { length: 200, slope: -15e3, start: 1175 }], straights: [{ end: 400, frontType: 1, start: 0 }, { end: 1100, frontType: 2, start: 700 }, { end: 1900, frontType: 1, start: 1571 }], surface: 2, turn: 1 }, "10901": { corners: [{ length: 300, start: 250 }, { length: 294, start: 550 }], course: 2, courseSetStatus: [], distance: 1200, distanceType: 1, finishTimeMax: 71e4, finishTimeMin: 675e3, laneMax: 12500, raceTrackId: 10009, slopes: [{ length: 595, slope: -1e4, start: 400 }, { length: 125, slope: 2e4, start: 1e3 }], straights: [{ end: 250, frontType: 2, start: 0 }, { end: 1200, frontType: 1, start: 844 }], surface: 1, turn: 1 }, "10902": { corners: [{ length: 300, start: 450 }, { length: 294, start: 750 }], course: 2, courseSetStatus: [], distance: 1400, distanceType: 1, finishTimeMax: 84e4, finishTimeMin: 8e5, laneMax: 12500, raceTrackId: 10009, slopes: [{ length: 595, slope: -1e4, start: 600 }, { length: 125, slope: 2e4, start: 1200 }], straights: [{ end: 450, frontType: 2, start: 0 }, { end: 1400, frontType: 1, start: 1044 }], surface: 1, turn: 1 }, "10903": { corners: [{ length: 350, start: 450 }, { length: 327, start: 800 }], course: 3, courseSetStatus: [3], distance: 1600, distanceType: 2, finishTimeMax: 95e4, finishTimeMin: 908e3, laneMax: 12500, raceTrackId: 10009, slopes: [{ length: 400, slope: -1e4, start: 950 }, { length: 120, slope: 2e4, start: 1405 }], straights: [{ end: 450, frontType: 2, start: 0 }, { end: 1600, frontType: 1, start: 1127 }], surface: 1, turn: 1 }, "10904": { corners: [{ length: 350, start: 650 }, { length: 327, start: 1e3 }], course: 3, courseSetStatus: [3], distance: 1800, distanceType: 2, finishTimeMax: 11e5, finishTimeMin: 1044e3, laneMax: 12500, raceTrackId: 10009, slopes: [{ length: 400, slope: -1e4, start: 1150 }, { length: 120, slope: 2e4, start: 1605 }], straights: [{ end: 650, frontType: 2, start: 0 }, { end: 1800, frontType: 1, start: 1327 }], surface: 1, turn: 1 }, "10905": { corners: [{ length: 190, start: 320 }, { length: 190, start: 510 }, { length: 300, start: 1050 }, { length: 294, start: 1350 }], course: 2, courseSetStatus: [4], distance: 2e3, distanceType: 3, finishTimeMax: 123e4, finishTimeMin: 1171e3, laneMax: 12500, raceTrackId: 10009, slopes: [{ length: 90, slope: -1e4, start: 0 }, { length: 125, slope: 2e4, start: 95 }, { length: 595, slope: -1e4, start: 1200 }, { length: 125, slope: 2e4, start: 1800 }], straights: [{ end: 320, frontType: 1, start: 0 }, { end: 1050, frontType: 2, start: 700 }, { end: 2e3, frontType: 1, start: 1644 }], surface: 1, turn: 1 }, "10906": { corners: [{ length: 190, start: 520 }, { length: 190, start: 710 }, { length: 300, start: 1250 }, { length: 294, start: 1550 }], course: 2, courseSetStatus: [1], distance: 2200, distanceType: 3, finishTimeMax: 135e4, finishTimeMin: 1302e3, laneMax: 12500, raceTrackId: 10009, slopes: [{ length: 290, slope: -1e4, start: 0 }, { length: 125, slope: 2e4, start: 295 }, { length: 595, slope: -1e4, start: 1400 }, { length: 125, slope: 2e4, start: 2e3 }], straights: [{ end: 520, frontType: 1, start: 0 }, { end: 1250, frontType: 2, start: 900 }, { end: 2200, frontType: 1, start: 1844 }], surface: 1, turn: 1 }, "10907": { corners: [{ length: 190, start: 370 }, { length: 190, start: 560 }, { length: 350, start: 1250 }, { length: 327, start: 1600 }], course: 3, courseSetStatus: [3], distance: 2400, distanceType: 3, finishTimeMax: 149e4, finishTimeMin: 1416e3, laneMax: 12500, raceTrackId: 10009, slopes: [{ length: 115, slope: -1e4, start: 0 }, { length: 120, slope: 2e4, start: 170 }, { length: 400, slope: -1e4, start: 1750 }, { length: 120, slope: 2e4, start: 2205 }], straights: [{ end: 370, frontType: 1, start: 0 }, { end: 1250, frontType: 2, start: 750 }, { end: 2400, frontType: 1, start: 1927 }], surface: 1, turn: 1 }, "10908": { corners: [{ length: 190, start: 570 }, { length: 190, start: 760 }, { length: 350, start: 1450 }, { length: 327, start: 1800 }], course: 3, courseSetStatus: [], distance: 2600, distanceType: 4, finishTimeMax: 165e4, finishTimeMin: 1576e3, laneMax: 12500, raceTrackId: 10009, slopes: [{ length: 315, slope: -1e4, start: 0 }, { length: 120, slope: 2e4, start: 370 }, { length: 400, slope: -1e4, start: 1950 }, { length: 120, slope: 2e4, start: 2405 }], straights: [{ end: 570, frontType: 1, start: 0 }, { end: 1450, frontType: 2, start: 950 }, { end: 2600, frontType: 1, start: 2127 }], surface: 1, turn: 1 }, "10909": { corners: [{ length: 300, start: 345 }, { length: 294, start: 645 }, { length: 190, start: 1320 }, { length: 190, start: 1510 }, { length: 300, start: 2050 }, { length: 294, start: 2350 }], course: 2, courseSetStatus: [3], distance: 3e3, distanceType: 4, finishTimeMax: 19e5, finishTimeMin: 1815e3, laneMax: 12500, raceTrackId: 10009, slopes: [{ length: 595, slope: -1e4, start: 495 }, { length: 125, slope: 2e4, start: 1095 }, { length: 595, slope: -1e4, start: 2200 }, { length: 125, slope: 2e4, start: 2800 }], straights: [{ end: 345, frontType: 2, start: 0 }, { end: 1320, frontType: 1, start: 939 }, { end: 2050, frontType: 2, start: 1700 }, { end: 3e3, frontType: 1, start: 2644 }], surface: 1, turn: 1 }, "10910": { corners: [{ length: 250, start: 350 }, { length: 248, start: 600 }], course: 1, courseSetStatus: [], distance: 1200, distanceType: 1, finishTimeMax: 77e4, finishTimeMin: 69e4, laneMax: 12e3, raceTrackId: 10009, slopes: [{ length: 800, slope: -1e4, start: 200 }, { length: 125, slope: 15e3, start: 1e3 }], straights: [{ end: 350, frontType: 2, start: 0 }, { end: 1200, frontType: 1, start: 848 }], surface: 2, turn: 1 }, "10911": { corners: [{ length: 250, start: 550 }, { length: 248, start: 800 }], course: 1, courseSetStatus: [], distance: 1400, distanceType: 1, finishTimeMax: 94e4, finishTimeMin: 808e3, laneMax: 12e3, raceTrackId: 10009, slopes: [{ length: 800, slope: -1e4, start: 400 }, { length: 125, slope: 15e3, start: 1200 }], straights: [{ end: 550, frontType: 2, start: 0 }, { end: 1400, frontType: 1, start: 1048 }], surface: 2, turn: 1 }, "10912": { corners: [{ length: 150, start: 300 }, { length: 150, start: 450 }, { length: 250, start: 950 }, { length: 248, start: 1200 }], course: 1, courseSetStatus: [], distance: 1800, distanceType: 2, finishTimeMax: 118e4, finishTimeMin: 1081e3, laneMax: 12e3, raceTrackId: 10009, slopes: [{ length: 125, slope: 15e3, start: 75 }, { length: 800, slope: -1e4, start: 800 }, { length: 125, slope: 15e3, start: 1600 }], straights: [{ end: 300, frontType: 1, start: 0 }, { end: 950, frontType: 2, start: 600 }, { end: 1800, frontType: 1, start: 1448 }], surface: 2, turn: 1 }, "10913": { corners: [{ length: 150, start: 500 }, { length: 150, start: 650 }, { length: 250, start: 1150 }, { length: 248, start: 1400 }], course: 1, courseSetStatus: [2, 3], distance: 2e3, distanceType: 3, finishTimeMax: 129e4, finishTimeMin: 1219e3, laneMax: 12e3, raceTrackId: 10009, slopes: [{ length: 275, slope: -1e4, start: 0 }, { length: 125, slope: 15e3, start: 275 }, { length: 800, slope: -1e4, start: 1e3 }, { length: 125, slope: 15e3, start: 1800 }], straights: [{ end: 500, frontType: 1, start: 0 }, { end: 1150, frontType: 2, start: 800 }, { end: 2e3, frontType: 1, start: 1648 }], surface: 2, turn: 1 }, "10914": { corners: [{ length: 350, start: 370 }, { length: 350, start: 720 }, { length: 190, start: 1520 }, { length: 190, start: 1710 }, { length: 300, start: 2250 }, { length: 294, start: 2550 }], course: 4, courseSetStatus: [], distance: 3200, distanceType: 4, finishTimeMax: 204e4, finishTimeMin: 193e4, laneMax: 12500, raceTrackId: 10009, slopes: [{ length: 400, slope: -1e4, start: 870 }, { length: 120, slope: 2e4, start: 1325 }, { length: 595, slope: -1e4, start: 2400 }, { length: 125, slope: 2e4, start: 3e3 }], straights: [{ end: 370, frontType: 2, start: 0 }, { end: 1520, frontType: 1, start: 1070 }, { end: 2250, frontType: 2, start: 1900 }, { end: 3200, frontType: 1, start: 2844 }], surface: 1, turn: 1 }, "11001": { corners: [{ length: 205, start: 500 }, { length: 202, start: 705 }], course: 1, courseSetStatus: [1], distance: 1200, distanceType: 1, finishTimeMax: 71e4, finishTimeMin: 675e3, laneMax: 14500, raceTrackId: 10010, slopes: [{ length: 60, slope: -15e3, start: 0 }], straights: [{ end: 500, frontType: 2, start: 0 }, { end: 1200, frontType: 1, start: 907 }], surface: 1, turn: 1 }, "11002": { corners: [{ length: 205, start: 290 }, { length: 205, start: 495 }, { length: 205, start: 1100 }, { length: 202, start: 1305 }], course: 1, courseSetStatus: [], distance: 1800, distanceType: 2, finishTimeMax: 11e5, finishTimeMin: 1044e3, laneMax: 14500, raceTrackId: 10010, slopes: [{ length: 255, slope: 15e3, start: 280 }], straights: [{ end: 290, frontType: 1, start: 0 }, { end: 1100, frontType: 2, start: 700 }, { end: 1800, frontType: 1, start: 1507 }], surface: 1, turn: 1 }, "11003": { corners: [{ length: 205, start: 490 }, { length: 205, start: 695 }, { length: 205, start: 1300 }, { length: 202, start: 1505 }], course: 1, courseSetStatus: [3], distance: 2e3, distanceType: 3, finishTimeMax: 123e4, finishTimeMin: 1171e3, laneMax: 14500, raceTrackId: 10010, slopes: [{ length: 255, slope: 15e3, start: 480 }], straights: [{ end: 490, frontType: 1, start: 0 }, { end: 1300, frontType: 2, start: 900 }, { end: 2e3, frontType: 1, start: 1707 }], surface: 1, turn: 1 }, "11004": { corners: [{ length: 205, start: 309 }, { length: 205, start: 514 }, { length: 205, start: 1110 }, { length: 205, start: 1315 }, { length: 205, start: 1900 }, { length: 202, start: 2105 }], course: 1, courseSetStatus: [2], distance: 2600, distanceType: 4, finishTimeMax: 165e4, finishTimeMin: 1576e3, laneMax: 14500, raceTrackId: 10010, slopes: [{ length: 255, slope: 15e3, start: 1100 }], straights: [{ end: 309, frontType: 2, start: 0 }, { end: 1110, frontType: 1, start: 719 }, { end: 1900, frontType: 2, start: 1520 }, { end: 2600, frontType: 1, start: 2307 }], surface: 1, turn: 1 }, "11005": { corners: [{ length: 180, start: 360 }, { length: 169, start: 540 }], course: 1, courseSetStatus: [1], distance: 1e3, distanceType: 1, finishTimeMax: 63e4, finishTimeMin: 574e3, laneMax: 12e3, raceTrackId: 10010, slopes: [], straights: [{ end: 360, frontType: 2, start: 0 }, { end: 1e3, frontType: 1, start: 709 }], surface: 2, turn: 1 }, "11006": { corners: [{ length: 180, start: 340 }, { length: 180, start: 520 }, { length: 180, start: 1060 }, { length: 169, start: 1240 }], course: 1, courseSetStatus: [], distance: 1700, distanceType: 2, finishTimeMax: 113e4, finishTimeMin: 1014e3, laneMax: 12e3, raceTrackId: 10010, slopes: [{ length: 150, slope: 15e3, start: 370 }], straights: [{ end: 340, frontType: 1, start: 0 }, { end: 1060, frontType: 2, start: 700 }, { end: 1700, frontType: 1, start: 1409 }], surface: 2, turn: 1 }, "11007": { corners: [{ length: 180, start: 312 }, { length: 180, start: 492 }, { length: 180, start: 1040 }, { length: 180, start: 1220 }, { length: 180, start: 1760 }, { length: 169, start: 1940 }], course: 1, courseSetStatus: [], distance: 2400, distanceType: 3, finishTimeMax: 156e4, finishTimeMin: 1491e3, laneMax: 12e3, raceTrackId: 10010, slopes: [], straights: [{ end: 312, frontType: 2, start: 0 }, { end: 1040, frontType: 1, start: 672 }, { end: 1760, frontType: 2, start: 1400 }, { end: 2400, frontType: 1, start: 2109 }], surface: 2, turn: 1 }, "11101": { corners: [{ length: 150, start: 500 }, { length: 164, start: 650 }], course: 1, courseSetStatus: [4, 5], distance: 1200, distanceType: 1, finishTimeMax: 77e4, finishTimeMin: 69e4, laneMax: 12e3, raceTrackId: 10101, slopes: [], straights: [{ end: 500, frontType: 2, start: 0 }, { end: 1200, frontType: 1, start: 814 }], surface: 2, turn: 1 }, "11102": { corners: [{ length: 150, start: 300 }, { length: 150, start: 500 }, { length: 150, start: 1100 }, { length: 164, start: 1250 }], course: 1, courseSetStatus: [3], distance: 1800, distanceType: 2, finishTimeMax: 118e4, finishTimeMin: 1081e3, laneMax: 12e3, raceTrackId: 10101, slopes: [], straights: [{ end: 301, frontType: 1, start: 0 }, { end: 1100.23, frontType: 2, start: 600 }, { end: 1800, frontType: 1, start: 1414 }], surface: 2, turn: 1 }, "11103": { corners: [{ length: 150, start: 500 }, { length: 150, start: 650 }, { length: 150, start: 1300 }, { length: 164, start: 1450 }], course: 1, courseSetStatus: [2], distance: 2e3, distanceType: 3, finishTimeMax: 129e4, finishTimeMin: 1219e3, laneMax: 12e3, raceTrackId: 10101, slopes: [], straights: [{ end: 500, frontType: 1, start: 0 }, { end: 1300, frontType: 2, start: 800 }, { end: 2e3, frontType: 1, start: 1614 }], surface: 2, turn: 1 }, "11203": { corners: [{ length: 417, start: 1e3 }, { length: 200, start: 1417 }], course: 1, courseSetStatus: [2, 3], distance: 2400, distanceType: 3, finishTimeMax: 165e4, finishTimeMin: 145e4, laneMax: 12e3, raceTrackId: 10201, slopes: [{ length: 600, slope: 2e4, start: 400 }, { length: 383, slope: -2e4, start: 1017 }, { length: 217, slope: -15e3, start: 1400 }], straights: [{ end: 1e3, frontType: 2, start: 0 }, { end: 1866, frontType: 3, start: 1617 }, { end: 2400, frontType: 1, start: 1867 }], surface: 1, turn: 1 }, "11301": { corners: [{ length: 100, start: 300 }, { length: 100, start: 400 }, { length: 100, start: 900 }, { length: 100, start: 1e3 }], course: 1, courseSetStatus: [5], distance: 1400, distanceType: 1, finishTimeMax: 94e4, finishTimeMin: 87e4, laneMax: 13500, raceTrackId: 10103, slopes: [], straights: [{ end: 300, frontType: 1, start: 0 }, { end: 900, frontType: 2, start: 500 }, { end: 1400, frontType: 1, start: 1100 }], surface: 2, turn: 2 }, "11302": { corners: [{ length: 100, start: 500 }, { length: 100, start: 600 }, { length: 100, start: 1100 }, { length: 100, start: 1200 }], course: 1, courseSetStatus: [5], distance: 1600, distanceType: 2, finishTimeMax: 108e4, finishTimeMin: 98e4, laneMax: 13500, raceTrackId: 10103, slopes: [], straights: [{ end: 500, frontType: 1, start: 100 }, { end: 1100, frontType: 2, start: 700 }, { end: 1600, frontType: 1, start: 1300 }], surface: 2, turn: 2 }, "11303": { corners: [{ length: 100, start: 400 }, { length: 100, start: 500 }, { length: 100, start: 1e3 }, { length: 100, start: 1100 }, { length: 100, start: 1600 }, { length: 100, start: 1700 }], course: 1, courseSetStatus: [2, 5], distance: 2100, distanceType: 3, finishTimeMax: 14e5, finishTimeMin: 131e4, laneMax: 13500, raceTrackId: 10103, slopes: [], straights: [{ end: 400, frontType: 2, start: 0 }, { end: 1e3, frontType: 1, start: 600 }, { end: 1600, frontType: 2, start: 1200 }, { end: 2100, frontType: 1, start: 1800 }], surface: 2, turn: 2 }, "11401": { corners: [{ length: 170, start: 370 }, { length: 152, start: 540 }], course: 1, courseSetStatus: [1], distance: 1e3, distanceType: 1, finishTimeMax: 63e4, finishTimeMin: 58e4, laneMax: 13500, raceTrackId: 10104, slopes: [], straights: [{ end: 370, frontType: 2, start: 0 }, { end: 1e3, frontType: 1, start: 692 }], surface: 2, turn: 2 }, "11402": { corners: [{ length: 180, start: 260 }, { length: 160, start: 440 }, { length: 170, start: 970 }, { length: 152, start: 1140 }], course: 1, courseSetStatus: [], distance: 1600, distanceType: 2, finishTimeMax: 108e4, finishTimeMin: 96e4, laneMax: 13500, raceTrackId: 10104, slopes: [], straights: [{ end: 260, frontType: 1, start: 0 }, { end: 970, frontType: 2, start: 600 }, { end: 1600, frontType: 1, start: 1292 }], surface: 2, turn: 2 }, "11403": { corners: [{ length: 180, start: 460 }, { length: 160, start: 640 }, { length: 170, start: 1170 }, { length: 152, start: 1340 }], course: 1, courseSetStatus: [], distance: 1800, distanceType: 2, finishTimeMax: 118e4, finishTimeMin: 108e4, laneMax: 13500, raceTrackId: 10104, slopes: [], straights: [{ end: 460, frontType: 1, start: 90 }, { end: 1170, frontType: 2, start: 800 }, { end: 1800, frontType: 1, start: 1492 }], surface: 2, turn: 2 }, "11404": { corners: [{ length: 170, start: 370 }, { length: 150, start: 540 }, { length: 180, start: 1060 }, { length: 160, start: 1240 }, { length: 170, start: 1770 }, { length: 152, start: 1940 }], course: 1, courseSetStatus: [2], distance: 2400, distanceType: 3, finishTimeMax: 156e4, finishTimeMin: 15e5, laneMax: 13500, raceTrackId: 10104, slopes: [], straights: [{ end: 370, frontType: 2, start: 0 }, { end: 1060, frontType: 1, start: 690 }, { end: 1770, frontType: 2, start: 1400 }, { end: 2400, frontType: 1, start: 2092 }], surface: 2, turn: 2 }, "11501": { corners: [{ length: 200, start: 500 }, { length: 200, start: 700 }], course: 1, courseSetStatus: [2], distance: 1200, distanceType: 1, finishTimeMax: 77e4, finishTimeMin: 69e4, laneMax: 13500, raceTrackId: 10105, slopes: [{ length: 375, slope: 1e4, start: 100 }, { length: 450, slope: -15e3, start: 475 }, { length: 175, slope: 1e4, start: 975 }], straights: [{ end: 500, frontType: 2, start: 100 }, { end: 1200, frontType: 1, start: 900 }], surface: 2, turn: 2 }, "11502": { corners: [{ length: 200, start: 900 }, { length: 200, start: 1100 }], course: 1, courseSetStatus: [2, 5], distance: 1600, distanceType: 2, finishTimeMax: 108e4, finishTimeMin: 93e4, laneMax: 13500, raceTrackId: 10105, slopes: [{ length: 375, slope: 1e4, start: 500 }, { length: 450, slope: -15e3, start: 875 }, { length: 175, slope: 1e4, start: 1375 }], straights: [{ end: 900, frontType: 2, start: 500 }, { end: 1600, frontType: 1, start: 1300 }], surface: 2, turn: 2 }, "11503": { corners: [{ length: 200, start: 300 }, { length: 200, start: 500 }, { length: 200, start: 1100 }, { length: 200, start: 1300 }], course: 1, courseSetStatus: [2, 5], distance: 1800, distanceType: 2, finishTimeMax: 118e4, finishTimeMin: 11e5, laneMax: 13500, raceTrackId: 10105, slopes: [{ length: 150, slope: 1e4, start: 0 }, { length: 450, slope: -15e3, start: 700 }, { length: 175, slope: 1e4, start: 1575 }], straights: [{ end: 300, frontType: 1, start: 0 }, { end: 1100, frontType: 2, start: 700 }, { end: 1800, frontType: 1, start: 1500 }], surface: 2, turn: 2 }, "11504": { corners: [{ length: 200, start: 500 }, { length: 200, start: 700 }, { length: 200, start: 1300 }, { length: 200, start: 1500 }], course: 1, courseSetStatus: [2], distance: 2e3, distanceType: 3, finishTimeMax: 129e4, finishTimeMin: 121e4, laneMax: 13500, raceTrackId: 10105, slopes: [{ length: 175, slope: 1e4, start: 175 }, { length: 375, slope: 1e4, start: 900 }, { length: 450, slope: -15e3, start: 1275 }, { length: 175, slope: 1e4, start: 1775 }], straights: [{ end: 500, frontType: 1, start: 100 }, { end: 1300, frontType: 2, start: 900 }, { end: 2e3, frontType: 1, start: 1700 }], surface: 2, turn: 2 }, "11605": { corners: [{ length: 150, start: 700 }, { length: 150, start: 850 }, { length: 150, start: 1400 }, { length: 150, start: 1550 }], course: 1, courseSetStatus: [], distance: 2e3, distanceType: 3, finishTimeMax: 1232e3, finishTimeMin: 1172e3, laneMax: 12e3, raceTrackId: 10202, slopes: [{ length: 150, slope: -2e4, start: 0 }], straights: [{ end: 700, frontType: 1, start: 300 }, { end: 1400, frontType: 2, start: 1e3 }, { end: 2e3, frontType: 1, start: 1700 }], surface: 1, turn: 2 }, "11612": { corners: [{ length: 200, start: 500 }, { length: 200, start: 700 }, { length: 200, start: 1300 }, { length: 200, start: 1500 }], course: 1, courseSetStatus: [2], distance: 2e3, distanceType: 3, finishTimeMax: 129e4, finishTimeMin: 121e4, laneMax: 135e3, raceTrackId: 10202, slopes: [{ length: 175, slope: 1e4, start: 175 }, { length: 375, slope: 1e4, start: 900 }, { length: 450, slope: -15e3, start: 1275 }, { length: 175, slope: 1e4, start: 1775 }], straights: [{ end: 500, frontType: 1, start: 100 }, { end: 1300, frontType: 2, start: 900 }, { end: 2e3, frontType: 1, start: 1700 }], surface: 1, turn: 2 } };

// uma-skill-tools/CourseData.ts
var CourseHelpers;
((CourseHelpers2) => {
  function assertIsPhase(phase) {
    (0, import_assert2.strict)(phase == 0 || phase == 1 || phase == 2 || phase == 3);
  }
  CourseHelpers2.assertIsPhase = assertIsPhase;
  function assertIsSurface(surface) {
    (0, import_assert2.strict)(surface === 1 /* Turf */ || surface === 2 /* Dirt */);
  }
  CourseHelpers2.assertIsSurface = assertIsSurface;
  function assertIsDistanceType(distanceType) {
    (0, import_assert2.strict)(distanceType >= 1 /* Short */ && distanceType <= 4 /* Long */);
  }
  CourseHelpers2.assertIsDistanceType = assertIsDistanceType;
  function assertIsOrientation(orientation) {
    (0, import_assert2.strict)(orientation >= 1 /* Clockwise */ && orientation <= 4 /* NoTurns */);
  }
  CourseHelpers2.assertIsOrientation = assertIsOrientation;
  function isSortedByStart(arr) {
    const init = [true, -1];
    function isSorted(a, b) {
      return [a[0] && b.start > a[1], b.start];
    }
    return arr.reduce(isSorted, init)[0];
  }
  CourseHelpers2.isSortedByStart = isSortedByStart;
  function phaseStart(distance, phase) {
    switch (phase) {
      case 0:
        return 0;
      case 1:
        return distance * 1 / 6;
      case 2:
        return distance * 2 / 3;
      case 3:
        return distance * 5 / 6;
    }
  }
  CourseHelpers2.phaseStart = phaseStart;
  function phaseEnd(distance, phase) {
    switch (phase) {
      case 0:
        return distance * 1 / 6;
      case 1:
        return distance * 2 / 3;
      case 2:
        return distance * 5 / 6;
      case 3:
        return distance;
    }
  }
  CourseHelpers2.phaseEnd = phaseEnd;
  function courseSpeedModifier(course, stats) {
    const statvalues = [0, stats.speed, stats.stamina, stats.power, stats.guts, stats.wisdom].map((x) => Math.min(x, 901));
    return 1 + course.courseSetStatus.map(
      (stat) => (1 + Math.floor(statvalues[stat] / 300.01)) * 0.05
    ).reduce((a, b) => a + b, 0) / Math.max(course.courseSetStatus.length, 1);
  }
  CourseHelpers2.courseSpeedModifier = courseSpeedModifier;
  function getCourse(courseId) {
    const course = course_data_default[courseId];
    if (!isSortedByStart(course.slopes))
      course.slopes.sort((a, b) => a.start - b.start);
    const courseWidth = 11.25;
    const horseLane = courseWidth / 18;
    const laneChangeAcceleration = 0.02 * 1.5;
    const laneChangeAccelerationPerFrame = laneChangeAcceleration / 15;
    const maxLaneDistance = courseWidth * course.laneMax / 1e4;
    const moveLanePoint = course.corners.length > 0 ? course.corners[0].start : 30;
    const course2 = {
      ...course,
      courseWidth,
      horseLane,
      laneChangeAcceleration,
      laneChangeAccelerationPerFrame,
      maxLaneDistance,
      moveLanePoint
    };
    Object.keys(course2).forEach((k) => Object.freeze(course2[k]));
    return Object.freeze(course2);
  }
  CourseHelpers2.getCourse = getCourse;
})(CourseHelpers || (CourseHelpers = {}));

// uma-skill-tools/Random.ts
var import_prando = __toESM(require_Prando_umd());
var SeededRng = class {
  constructor(seed) {
    this.prando = new import_prando.default(seed);
  }
  int32() {
    return Math.floor(this.prando.next() * 4294967296);
  }
  random() {
    return this.prando.next();
  }
  uniform(upper) {
    return this.prando.nextInt(0, upper - 1);
  }
};
var Rule30CARng = SeededRng;

// uma-skill-tools/ApproximateStartContinue.ts
var ApproximateStartContinue = class {
  constructor(name, startRate, continuationRate) {
    this.name = name;
    this.startRate = startRate;
    this.continuationRate = continuationRate;
  }
  get valueOnStart() {
    return 0;
  }
  update(state, currentValue) {
    const rng2 = state.simulation?.rng;
    if (currentValue === 0) {
      return rng2.random() < this.startRate ? 1 : 0;
    } else {
      return rng2.random() < this.continuationRate ? 1 : 0;
    }
  }
};
var ApproximateMultiCondition = class {
  constructor(name, conditions, valueOnStart = 0) {
    this.name = name;
    this.conditions = conditions;
    this.valueOnStart = valueOnStart;
  }
  update(state, currentValue) {
    let activeCondition = null;
    let fallbackCondition = null;
    for (const entry of this.conditions) {
      if (entry.predicate === null) {
        fallbackCondition = entry.condition;
      } else if (entry.predicate(state)) {
        activeCondition = entry.condition;
        break;
      }
    }
    const condition = activeCondition || fallbackCondition;
    if (!condition) {
      return currentValue;
    }
    const rng2 = state.simulation?.rng;
    if (currentValue === 0) {
      return rng2.random() < condition.startRate ? 1 : 0;
    } else {
      return rng2.random() < condition.continuationRate ? 1 : 0;
    }
  }
};

// uma-skill-tools/RaceSolver.ts
if (typeof CC_GLOBAL == "undefined")
  global.CC_GLOBAL = false;
var Speed;
((Speed2) => {
  Speed2.StrategyPhaseCoefficient = Object.freeze([
    [],
    // strategies start numbered at 1
    [1, 0.98, 0.962],
    [0.978, 0.991, 0.975],
    [0.938, 0.998, 0.994],
    [0.931, 1, 1],
    [1.063, 0.962, 0.95]
  ].map((a) => Object.freeze(a)));
  Speed2.DistanceProficiencyModifier = Object.freeze([1.05, 1, 0.9, 0.8, 0.6, 0.4, 0.2, 0.1]);
})(Speed || (Speed = {}));
function baseSpeed(course) {
  return 20 - (course.distance - 2e3) / 1e3;
}
function baseTargetSpeed(horse2, course, phase) {
  return baseSpeed(course) * Speed.StrategyPhaseCoefficient[horse2.strategy][phase] + +(phase == 2) * Math.sqrt(500 * horse2.speed) * Speed.DistanceProficiencyModifier[horse2.distanceAptitude] * 2e-3;
}
function lastSpurtSpeed(horse2, course) {
  let v = (baseTargetSpeed(horse2, course, 2) + 0.01 * baseSpeed(course)) * 1.05 + Math.sqrt(500 * horse2.speed) * Speed.DistanceProficiencyModifier[horse2.distanceAptitude] * 2e-3;
  v += Math.pow(450 * horse2.guts, 0.597) * 1e-4;
  return v;
}
var Acceleration;
((Acceleration2) => {
  Acceleration2.StrategyPhaseCoefficient = Object.freeze([
    [],
    [1, 1, 0.996],
    [0.985, 1, 0.996],
    [0.975, 1, 1],
    [0.945, 1, 0.997],
    [1.17, 0.94, 0.956]
  ].map((a) => Object.freeze(a)));
  Acceleration2.GroundTypeProficiencyModifier = Object.freeze([1.05, 1, 0.9, 0.8, 0.7, 0.5, 0.3, 0.1]);
  Acceleration2.DistanceProficiencyModifier = Object.freeze([1, 1, 1, 1, 1, 0.6, 0.5, 0.4]);
})(Acceleration || (Acceleration = {}));
var BaseAccel = 6e-4;
var UphillBaseAccel = 4e-4;
function baseAccel(baseAccel2, horse2, phase) {
  return baseAccel2 * Math.sqrt(500 * horse2.power) * Acceleration.StrategyPhaseCoefficient[horse2.strategy][phase] * Acceleration.GroundTypeProficiencyModifier[horse2.surfaceAptitude] * Acceleration.DistanceProficiencyModifier[horse2.distanceAptitude];
}
var PhaseDeceleration = [-1.2, -0.8, -1];
var PositionKeep;
((PositionKeep2) => {
  PositionKeep2.BaseMinimumThreshold = Object.freeze([0, 0, 3, 6.5, 7.5]);
  PositionKeep2.BaseMaximumThreshold = Object.freeze([0, 0, 5, 7, 8]);
  function courseFactor(distance) {
    return 8e-4 * (distance - 1e3) + 1;
  }
  PositionKeep2.courseFactor = courseFactor;
  function minThreshold(strategy, distance) {
    return PositionKeep2.BaseMinimumThreshold[strategy] * (strategy == 2 /* Senkou */ ? 1 : courseFactor(distance));
  }
  PositionKeep2.minThreshold = minThreshold;
  function maxThreshold(strategy, distance) {
    return PositionKeep2.BaseMaximumThreshold[strategy] * courseFactor(distance);
  }
  PositionKeep2.maxThreshold = maxThreshold;
})(PositionKeep || (PositionKeep = {}));
var Timer = class {
  constructor(t) {
    this.t = t;
  }
};
var CompensatedAccumulator = class {
  constructor(acc, err = 0) {
    this.acc = acc;
    this.err = err;
  }
  add(n) {
    const t = this.acc + n;
    if (Math.abs(this.acc) >= Math.abs(n)) {
      this.err += this.acc - t + n;
    } else {
      this.err += n - t + this.acc;
    }
    this.acc = t;
  }
};
function noop(x) {
}
var RaceSolver = class {
  constructor(params) {
    this.conditionValues = /* @__PURE__ */ new Map();
    this.conditions = /* @__PURE__ */ new Map();
    this.horse = Object.assign({}, params.horse);
    this.course = params.course;
    this.hp = params.hp;
    this.rng = params.rng;
    this.pendingSkills = params.skills.slice();
    this.pendingRemoval = /* @__PURE__ */ new Set();
    this.usedSkills = /* @__PURE__ */ new Set();
    this.syncRng = new Rule30CARng(this.rng.int32());
    this.gorosiRng = new Rule30CARng(this.rng.int32());
    this.rushedRng = new Rule30CARng(this.rng.int32());
    this.downhillRng = new Rule30CARng(this.rng.int32());
    this.wisdomRollRng = new Rule30CARng(this.rng.int32());
    this.posKeepRng = new Rule30CARng(this.rng.int32());
    this.laneMovementRng = new Rule30CARng(this.rng.int32());
    this.timers = [];
    this.conditionTimer = this.getNewTimer(-1);
    this.accumulatetime = this.getNewTimer();
    this.gateRoll = this.rng.uniform(12252240);
    this.randomLot = this.rng.uniform(100);
    this.phase = 0;
    this.nextPhaseTransition = CourseHelpers.phaseStart(this.course.distance, 1);
    this.activeTargetSpeedSkills = [];
    this.activeCurrentSpeedSkills = [];
    this.activeAccelSkills = [];
    this.activeLaneMovementSkills = [];
    this.activeChangeLaneSkills = [];
    this.activateCount = [0, 0, 0];
    this.activateCountHeal = 0;
    this.onSkillActivate = params.onSkillActivate || noop;
    this.onSkillDeactivate = params.onSkillDeactivate || noop;
    this.sectionLength = this.course.distance / 24;
    this.posKeepMinThreshold = PositionKeep.minThreshold(this.horse.strategy, this.course.distance);
    this.posKeepMaxThreshold = PositionKeep.maxThreshold(this.horse.strategy, this.course.distance);
    this.posKeepNextTimer = this.getNewTimer();
    this.positionKeepState = 0 /* None */;
    this.posKeepMode = params.posKeepMode || 0 /* None */;
    this.posKeepStrategy = this.horse.strategy;
    this.mode = params.mode;
    this.posKeepEnd = this.sectionLength * (this.mode === "compare" ? 10 : 3);
    this.posKeepSpeedCoef = 1;
    this.isPacer = params.isPacer || false;
    this.pacerOverride = false;
    this.umas = [];
    this.pacer = null;
    this.speedUpProbability = params.speedUpProbability != null ? params.speedUpProbability : 100;
    this.isRushed = false;
    this.hasBeenRushed = false;
    this.rushedSection = -1;
    this.rushedEnterPosition = -1;
    this.rushedTimer = this.getNewTimer();
    this.rushedMaxDuration = 12;
    this.isDownhillMode = false;
    this.disableDownhill = params.disableDownhill || false;
    this.downhillModeStart = null;
    this.lastDownhillCheckFrame = 0;
    this.skillCheckChance = params.skillCheckChance !== false;
    this.rushedActivations = [];
    this.positionKeepActivations = [];
    this.firstUmaInLateRace = false;
    this.hpDied = false;
    this.fullSpurt = false;
    this.initRushedState(params.disableRushed || false);
    this.competeFight = false;
    this.competeFightStart = null;
    this.competeFightEnd = null;
    this.competeFightTimer = this.getNewTimer();
    this.leadCompetition = false;
    this.leadCompetitionStart = null;
    this.leadCompetitionEnd = null;
    this.leadCompetitionTimer = this.getNewTimer();
    const gateNumberRaw = this.gateRoll % 9;
    const gateNumber = gateNumberRaw < 9 ? gateNumberRaw : 1 + (24 - gateNumberRaw) % 8;
    const initialLane = gateNumber * this.course.horseLane;
    this.currentLane = initialLane;
    this.targetLane = initialLane;
    this.laneChangeSpeed = 0;
    this.extraMoveLane = -1;
    this.forceInSpeed = 0;
    this.modifiers = {
      targetSpeed: new CompensatedAccumulator(0),
      currentSpeed: new CompensatedAccumulator(0),
      accel: new CompensatedAccumulator(0),
      oneFrameAccel: 0,
      specialSkillDurationScaling: 1
    };
    this.initHills();
    this.startDelay = 0.1 * this.rng.random();
    this.pos = 0;
    this.accel = 0;
    this.currentSpeed = 3;
    this.targetSpeed = 0.85 * baseSpeed(this.course);
    this.processSkillActivations();
    this.minSpeed = 0.85 * baseSpeed(this.course) + Math.sqrt(200 * this.horse.guts) * 1e-3;
    this.startDash = true;
    this.modifiers.accel.add(24);
    this.startDelayAccumulator = this.startDelay;
    this.baseTargetSpeed = [0, 1, 2].map((phase) => baseTargetSpeed(this.horse, this.course, phase));
    this.lastSpurtSpeed = lastSpurtSpeed(this.horse, this.course);
    this.lastSpurtTransition = -1;
    this.sectionModifier = Array.from({ length: 24 }, () => {
      if (params.disableSectionModifier) {
        return 0;
      }
      const max = this.horse.wisdom / 5500 * Math.log10(this.horse.wisdom * 0.1);
      const factor = (max - 0.65 + this.wisdomRollRng.random() * 0.65) / 100;
      return baseSpeed(this.course) * factor;
    });
    this.sectionModifier.push(0);
    this.hp.init(this.horse);
    this.baseAccel = [0, 1, 2, 0, 1, 2].map((phase, i) => baseAccel(i > 2 ? UphillBaseAccel : BaseAccel, this.horse, phase));
    this.registerBlockedSideCondition();
    this.registerOvertakeCondition();
  }
  registerBlockedSideCondition() {
    const conditions = [
      {
        condition: new ApproximateStartContinue("Outer lane", 0, 0),
        predicate: (state) => {
          const sim = state.simulation;
          const section = Math.floor(sim.pos / sim.sectionLength);
          return section >= 1 && section <= 3 && sim.currentLane > 3 * this.course.horseLane;
        }
      },
      {
        condition: new ApproximateStartContinue("Early race", 0.1, 0.85),
        predicate: (state) => state.simulation.phase === 0
      },
      {
        condition: new ApproximateStartContinue("Mid race", 0.08, 0.75),
        predicate: (state) => state.simulation.phase === 1
      },
      {
        condition: new ApproximateStartContinue("Other", 0.07, 0.5),
        predicate: null
      }
    ];
    const blockedSideCondition = new ApproximateMultiCondition(
      "blocked_side",
      conditions,
      1
    );
    this.registerCondition("blocked_side", blockedSideCondition);
  }
  registerOvertakeCondition() {
    const conditions = [
      {
        condition: new ApproximateStartContinue("\u9003\u3052", 0.05, 0.5),
        predicate: (state) => {
          return state.simulation.horse.strategy === 1 /* Nige */;
        }
      },
      {
        condition: new ApproximateStartContinue("\u5148\u884C", 0.15, 0.55),
        predicate: (state) => {
          return state.simulation.horse.strategy === 2 /* Senkou */;
        }
      },
      {
        condition: new ApproximateStartContinue("\u305D\u306E\u4ED6", 0.2, 0.6),
        predicate: null
      }
    ];
    const overtakeCondition = new ApproximateMultiCondition(
      "overtake",
      conditions
    );
    this.registerCondition("overtake", overtakeCondition);
  }
  initUmas(umas) {
    this.umas = [...umas.filter((uma) => uma != null), this];
  }
  initHills() {
    (0, import_assert3.strict)(CourseHelpers.isSortedByStart(this.course.slopes), "slopes must be sorted by start location");
    this.nHills = this.course.slopes.length;
    this.hillStart = this.course.slopes.map((s) => s.start).reverse();
    this.hillEnd = this.course.slopes.map((s) => s.start + s.length).reverse();
    this.hillIdx = -1;
    if (this.hillStart.length > 0 && this.hillStart[this.hillStart.length - 1] == 0) {
      if (this.course.slopes[0].slope > 100) {
        this.hillIdx = 0;
      } else {
        this.hillEnd.pop();
      }
      this.hillStart.pop();
    }
  }
  getNewTimer(t = 0) {
    const tm = new Timer(t);
    this.timers.push(tm);
    return tm;
  }
  initRushedState(disabled) {
    if (disabled) {
      return;
    }
    const wisdomStat = this.horse.wisdom;
    const rushedChance = Math.pow(6.5 / Math.log10(0.1 * wisdomStat + 1), 2) / 100;
    const hasSelfControl = this.pendingSkills.some((s) => s.skillId === "202161");
    const finalRushedChance = Math.max(0, rushedChance - (hasSelfControl ? 0.03 : 0));
    if (this.rushedRng.random() < finalRushedChance) {
      this.rushedSection = 2 + this.rushedRng.uniform(8);
      this.rushedEnterPosition = this.sectionLength * this.rushedSection;
    }
  }
  updateRushedState() {
    if (this.rushedSection >= 0 && !this.isRushed && !this.hasBeenRushed && this.pos >= this.rushedEnterPosition) {
      this.isRushed = true;
      this.hasBeenRushed = true;
      this.rushedTimer.t = 0;
      this.rushedActivations.push([this.pos, -1]);
    }
    if (this.isRushed) {
      if (this.rushedTimer.t > 0 && Math.floor(this.rushedTimer.t / 3) > Math.floor((this.rushedTimer.t - 0.017) / 3)) {
        if (this.rushedRng.random() < 0.55) {
          this.endRushedState();
          return;
        }
      }
      if (this.rushedTimer.t >= this.rushedMaxDuration) {
        this.endRushedState();
      }
    }
  }
  endRushedState() {
    this.isRushed = false;
    if (this.rushedActivations.length > 0) {
      const lastIdx = this.rushedActivations.length - 1;
      if (this.rushedActivations[lastIdx][1] === -1) {
        this.rushedActivations[lastIdx][1] = this.pos;
      }
    }
  }
  getMaxStartDashSpeed() {
    return Math.min(this.targetSpeed, 0.85 * baseSpeed(this.course));
  }
  logVelocityData(dt2) {
    console.log("frame: ", this.accumulatetime.t);
    console.log("current speed: ", this.currentSpeed);
    console.log("accel: ", this.accel);
    console.log("dist:", this.pos);
    console.log("--------------------------------");
  }
  step(dt2) {
    let dtAfterDelay = dt2;
    this.timers.forEach((tm) => tm.t += dt2);
    if (this.conditionTimer.t >= 0) {
      this.tickConditions();
      this.conditionTimer.t = -1;
    }
    if (this.startDelayAccumulator > 0) {
      this.startDelayAccumulator -= dt2;
      if (this.startDelayAccumulator > 0) {
        return;
      }
    }
    this.updateHills();
    this.updatePhase();
    this.updateRushedState();
    this.updateDownhillMode();
    this.processSkillActivations();
    this.applyPositionKeepStates();
    this.updatePositionKeepCoefficient();
    this.updateLeadCompetition();
    this.updateLastSpurtState();
    this.updateTargetSpeed();
    this.applyForces();
    this.applyLaneMovement();
    let newSpeed = void 0;
    if (this.currentSpeed < this.targetSpeed) {
      newSpeed = Math.min(this.currentSpeed + this.accel * dt2, this.targetSpeed);
    } else {
      newSpeed = Math.max(this.currentSpeed + this.accel * dt2, this.targetSpeed);
    }
    if (this.startDash && newSpeed > this.getMaxStartDashSpeed()) {
      newSpeed = this.getMaxStartDashSpeed();
    }
    if (!this.startDash && this.currentSpeed < this.minSpeed) {
      newSpeed = this.minSpeed;
    }
    this.currentSpeed = newSpeed;
    const displacement = this.currentSpeed + this.modifiers.currentSpeed.acc + this.modifiers.currentSpeed.err;
    if (this.startDelayAccumulator < 0) {
      dtAfterDelay = Math.abs(this.startDelayAccumulator);
      this.startDelayAccumulator = 0;
    }
    this.pos += displacement * dtAfterDelay;
    this.hp.tick(this, dt2);
    if (!this.hp.hasRemainingHp() && !this.hpDied) {
      this.hpDied = true;
    }
    if (this.startDash && this.currentSpeed >= 0.85 * baseSpeed(this.course)) {
      this.startDash = false;
      this.modifiers.accel.add(-24);
    }
    this.modifiers.oneFrameAccel = 0;
  }
  applyLaneMovement() {
    const currentLane = this.currentLane;
    const sideBlocked = this.getConditionValue("blocked_side") === 1;
    const overtake = this.getConditionValue("overtake") === 1;
    if (this.extraMoveLane < 0 && this.isAfterFinalCornerOrInFinalStraight()) {
      this.extraMoveLane = Math.min(currentLane / 0.1, this.course.maxLaneDistance) * 0.5 + this.laneMovementRng.random() * 0.1;
    }
    if (this.activeChangeLaneSkills.length > 0) {
      this.targetLane = 9.5 * this.course.horseLane;
    } else if (overtake) {
      this.targetLane = Math.max(this.targetLane, this.course.horseLane, this.extraMoveLane);
    } else if (!this.hp.hasRemainingHp()) {
      this.targetLane = currentLane;
    } else if (this.positionKeepState === 2 /* PaceDown */) {
      this.targetLane = 0.18;
    } else if (this.extraMoveLane > currentLane) {
      this.targetLane = this.extraMoveLane;
    } else if (this.phase <= 1 && !sideBlocked) {
      this.targetLane = Math.max(0, currentLane - 0.05);
    } else {
      this.targetLane = currentLane;
    }
    if (sideBlocked && this.targetLane < currentLane || Math.abs(this.targetLane - currentLane) < 1e-5) {
      this.laneChangeSpeed = 0;
    } else {
      let targetSpeed = 0.02 * (0.3 + 1e-3 * this.horse.power);
      if (this.pos < this.course.moveLanePoint) {
        targetSpeed *= 1 + currentLane / this.course.maxLaneDistance * 0.05;
      }
      this.laneChangeSpeed = Math.min(this.laneChangeSpeed + this.course.laneChangeAccelerationPerFrame, targetSpeed);
      let actualSpeed = Math.min(this.laneChangeSpeed + this.activeLaneMovementSkills.reduce((sum, skill) => sum + skill.modifier, 0), 0.6);
      if (this.targetLane > currentLane) {
        this.currentLane = Math.min(this.targetLane, currentLane + actualSpeed);
      } else {
        this.currentLane = Math.max(this.targetLane, currentLane - actualSpeed * (1 + currentLane));
      }
    }
  }
  // Slightly scuffed way of ensuring all umas use the same pacemaker
  // in compare.ts, call .getPacer() on any uma (doesn't matter which)
  // and then call .updatePacer(result) on all umas to update pacer reference
  updatePacer(pacemaker) {
    this.pacer = pacemaker;
  }
  getPacer() {
    for (const strategy of [5 /* Oonige */, 1 /* Nige */]) {
      var umas = this.umas.filter((uma2) => uma2.posKeepStrategy === strategy);
      if (umas.length > 0) {
        var uma = umas.reduce((max, uma2) => {
          return uma2.pos > max.pos ? uma2 : max;
        }, umas[0]);
        return uma;
      }
    }
    var pacerOverrideUma = this.umas.find((uma2) => uma2.pacerOverride);
    if (pacerOverrideUma) {
      return pacerOverrideUma;
    }
    for (const strategy of [2 /* Senkou */, 3 /* Sasi */, 4 /* Oikomi */]) {
      var umas = this.umas.filter((uma2) => StrategyHelpers.strategyMatches(uma2.posKeepStrategy, strategy));
      if (umas.length > 0) {
        var uma = umas.reduce((max, uma2) => {
          return uma2.pos > max.pos ? uma2 : max;
        }, umas[0]);
        uma.pacerOverride = true;
        uma.posKeepStrategy = 1 /* Nige */;
        return uma;
      }
    }
    var pacer = this.umas.find((uma2) => uma2.isPacer);
    if (pacer) {
      pacer.posKeepStrategy = 1 /* Nige */;
      return pacer;
    }
  }
  getUmaByDistanceDescending() {
    return this.umas.sort((a, b) => b.pos - a.pos);
  }
  isOnlyFrontRunner() {
    var frontRunners = this.umas.filter((uma) => StrategyHelpers.strategyMatches(uma.posKeepStrategy, 1 /* Nige */));
    return frontRunners.length === 1 && frontRunners[0] === this;
  }
  // In Virtual Pacemaker mode, we care about the effects of position keep and the way
  // umas react during poskeep based on their wit
  //
  // In Approximate mode, we don't really care about poskeep - it's just a way to give out
  // PDM/PUM early-race to mimic what actually happens in game so we limit poskeep to 5 sections
  // and use synced rng to make skill comparison possible.
  speedUpOvertakeWitCheck() {
    return this.posKeepRng.random() < 0.2 * Math.log10(0.1 * this.horse.wisdom);
  }
  paceUpWitCheck() {
    return this.posKeepRng.random() < 0.15 * Math.log10(0.1 * this.horse.wisdom);
  }
  applyPositionKeepStates() {
    if (this.pos >= this.posKeepEnd || this.posKeepMode === 0 /* None */) {
      if (this.positionKeepState !== 0 /* None */ && this.positionKeepActivations.length > 0) {
        this.positionKeepActivations[this.positionKeepActivations.length - 1][1] = this.pos;
      }
      this.positionKeepState = 0 /* None */;
      return;
    }
    if (!this.pacer) {
      return;
    }
    var pacer = this.pacer;
    var behind = pacer.pos - this.pos;
    var myStrategy = this.posKeepStrategy;
    switch (this.positionKeepState) {
      case 0 /* None */:
        if (this.posKeepNextTimer.t < 0) {
          return;
        }
        if (StrategyHelpers.strategyMatches(myStrategy, 1 /* Nige */)) {
          if (pacer === this) {
            var umas = this.getUmaByDistanceDescending();
            var secondPlaceUma = umas[1];
            var distanceAhead = pacer.pos - secondPlaceUma.pos;
            let threshold = myStrategy === 5 /* Oonige */ ? 17.5 : 4.5;
            if (this.posKeepNextTimer.t < 0) {
              return;
            }
            if (distanceAhead < threshold && this.speedUpOvertakeWitCheck()) {
              this.positionKeepActivations.push([this.pos, 0, 3 /* SpeedUp */]);
              this.positionKeepState = 3 /* SpeedUp */;
              this.posKeepExitPosition = this.pos + Math.floor(this.sectionLength);
            }
          } else if (this.speedUpOvertakeWitCheck()) {
            this.positionKeepState = 4 /* Overtake */;
            this.positionKeepActivations.push([this.pos, 0, 4 /* Overtake */]);
          }
        } else {
          if (behind > this.posKeepMaxThreshold) {
            if (this.paceUpWitCheck()) {
              this.positionKeepState = 1 /* PaceUp */;
              this.positionKeepActivations.push([this.pos, 0, 1 /* PaceUp */]);
              this.posKeepExitDistance = this.syncRng.random() * (this.posKeepMaxThreshold - this.posKeepMinThreshold) + this.posKeepMinThreshold;
            }
          } else if (behind < this.posKeepMinThreshold) {
            if (this.activeTargetSpeedSkills.length == 0 && this.activeCurrentSpeedSkills.length == 0) {
              this.positionKeepState = 2 /* PaceDown */;
              this.positionKeepActivations.push([this.pos, 0, 2 /* PaceDown */]);
              this.posKeepExitDistance = this.syncRng.random() * (this.posKeepMaxThreshold - this.posKeepMinThreshold) + this.posKeepMinThreshold;
            }
          }
        }
        if (this.positionKeepState == 0 /* None */) {
          this.posKeepNextTimer.t = -2;
        } else {
          this.posKeepExitPosition = this.pos + Math.floor(this.sectionLength);
        }
        break;
      case 3 /* SpeedUp */:
        if (this.pos >= this.posKeepExitPosition) {
          this.positionKeepState = 0 /* None */;
          this.positionKeepActivations[this.positionKeepActivations.length - 1][1] = this.pos;
          this.posKeepNextTimer.t = -3;
        } else if (pacer == this) {
          var umas = this.getUmaByDistanceDescending();
          var secondPlaceUma = umas[1];
          var distanceAhead = pacer.pos - secondPlaceUma.pos;
          let threshold = myStrategy === 5 /* Oonige */ ? 17.5 : 4.5;
          if (distanceAhead >= threshold) {
            this.positionKeepState = 0 /* None */;
            this.positionKeepActivations[this.positionKeepActivations.length - 1][1] = this.pos;
            this.posKeepNextTimer.t = -3;
          }
        }
        break;
      case 4 /* Overtake */:
        if (this.pos >= this.posKeepExitPosition) {
          this.positionKeepState = 0 /* None */;
          this.positionKeepActivations[this.positionKeepActivations.length - 1][1] = this.pos;
          this.posKeepNextTimer.t = -3;
        } else if (pacer == this) {
          var umas = this.getUmaByDistanceDescending();
          var secondPlaceUma = umas[1];
          var distanceAhead = this.pos - secondPlaceUma.pos;
          let threshold = myStrategy === 5 /* Oonige */ ? 27.5 : 10;
          if (distanceAhead >= threshold) {
            this.positionKeepState = 0 /* None */;
            this.positionKeepActivations[this.positionKeepActivations.length - 1][1] = this.pos;
            this.posKeepNextTimer.t = -3;
          }
        }
        break;
      case 1 /* PaceUp */:
        if (this.pos >= this.posKeepExitPosition) {
          this.positionKeepState = 0 /* None */;
          this.positionKeepActivations[this.positionKeepActivations.length - 1][1] = this.pos;
          this.posKeepNextTimer.t = -3;
        } else {
          if (behind < this.posKeepExitDistance) {
            this.positionKeepState = 0 /* None */;
            this.positionKeepActivations[this.positionKeepActivations.length - 1][1] = this.pos;
            this.posKeepNextTimer.t = -3;
          }
        }
        break;
      case 2 /* PaceDown */:
        if (this.pos >= this.posKeepExitPosition) {
          this.positionKeepState = 0 /* None */;
          this.positionKeepActivations[this.positionKeepActivations.length - 1][1] = this.pos;
          this.posKeepNextTimer.t = -3;
        } else {
          if (behind > this.posKeepExitDistance || this.activeTargetSpeedSkills.length > 0 || this.activeCurrentSpeedSkills.length > 0) {
            this.positionKeepState = 0 /* None */;
            this.positionKeepActivations[this.positionKeepActivations.length - 1][1] = this.pos;
            this.posKeepNextTimer.t = -3;
          }
        }
        break;
      default:
        break;
    }
  }
  updatePositionKeepCoefficient() {
    switch (this.positionKeepState) {
      case 3 /* SpeedUp */:
        this.posKeepSpeedCoef = 1.04;
        break;
      case 4 /* Overtake */:
        this.posKeepSpeedCoef = 1.05;
      case 1 /* PaceUp */:
        this.posKeepSpeedCoef = 1.04;
        break;
      case 2 /* PaceDown */:
        this.posKeepSpeedCoef = 0.915;
        break;
      default:
        this.posKeepSpeedCoef = 1;
        break;
    }
  }
  isOnFinalStraight() {
    const lastStraight = this.course.straights[this.course.straights.length - 1];
    return this.pos >= lastStraight.start && this.pos <= lastStraight.end;
  }
  isAfterFinalCorner() {
    const finalCornerStart = this.course.corners.length > 0 ? this.course.corners[this.course.corners.length - 1].start : Infinity;
    return this.pos >= finalCornerStart;
  }
  isAfterFinalCornerOrInFinalStraight() {
    return this.isAfterFinalCorner() || this.isOnFinalStraight();
  }
  updateCompeteFight() {
    if (this.competeFight) {
      if (this.hp.hpRatioRemaining() <= 0.05) {
        this.competeFight = false;
        this.competeFightEnd = this.pos;
      }
      return;
    }
    if (StrategyHelpers.strategyMatches(this.posKeepStrategy, 1 /* Nige */)) {
      return;
    }
    if (this.hp.hpRatioRemaining() < 0.15 || !this.isOnFinalStraight()) {
      return;
    }
    if (this.competeFightTimer.t >= 2) {
      this.competeFight = true;
      this.competeFightStart = this.pos;
    }
  }
  updateLeadCompetition() {
    if (this.leadCompetition) {
      let leadCompeteDuration = Math.pow(700 * this.horse.guts, 0.5) * 0.012;
      if (this.leadCompetitionTimer.t >= leadCompeteDuration || this.pos >= this.leadCompetitionEnd) {
        this.leadCompetition = false;
        this.leadCompetitionEnd = this.pos;
      }
    }
    if (this.leadCompetitionStart !== null) {
      return;
    }
    if (this.pos >= 150 && this.pos <= Math.floor(this.sectionLength * 5) && StrategyHelpers.strategyMatches(this.posKeepStrategy, 1 /* Nige */)) {
      let otherUmas = this.umas.filter((u) => u.posKeepStrategy === this.posKeepStrategy);
      let distanceGap = this.posKeepStrategy === 1 /* Nige */ ? 3.75 : 5;
      let umasWithinGap = otherUmas.filter((u) => Math.abs(u.pos - this.pos) <= distanceGap);
      if (umasWithinGap.length >= 2) {
        for (let uma of umasWithinGap) {
          uma.leadCompetitionTimer.t = 0;
          uma.leadCompetition = true;
          uma.leadCompetitionStart = uma.pos;
          uma.leadCompetitionEnd = uma.pos + Math.floor(this.sectionLength * 8);
        }
      }
    }
  }
  updatefirstUmaInLateRace() {
    let existingFirstPlaceUma = this.umas.find((u) => u.firstUmaInLateRace);
    if (existingFirstPlaceUma) {
      return;
    }
    let firstPlaceUma = this.getUmaByDistanceDescending()[0];
    if (firstPlaceUma.pos < this.course.distance * 2 / 3) {
      return;
    }
    firstPlaceUma.firstUmaInLateRace = true;
  }
  updateLastSpurtState() {
    if (this.isLastSpurt || this.phase < 2)
      return;
    if (this.lastSpurtTransition == -1) {
      const v = this.hp.getLastSpurtPair(this, this.lastSpurtSpeed, this.baseTargetSpeed[2]);
      this.lastSpurtTransition = v[0];
      this.lastSpurtSpeed = v[1];
      if (this.hp.isMaxSpurt && this.hp.isMaxSpurt()) {
        this.fullSpurt = true;
      }
    }
    if (this.pos >= this.lastSpurtTransition) {
      this.isLastSpurt = true;
    }
  }
  updateDownhillMode() {
    const currentFrame = Math.floor(this.accumulatetime.t * 15);
    const changeSecond = currentFrame % 15 === 14;
    if (!changeSecond || currentFrame === this.lastDownhillCheckFrame) {
      return;
    }
    this.lastDownhillCheckFrame = currentFrame;
    const currentSlope = this.course.slopes.find((s) => this.pos >= s.start && this.pos <= s.start + s.length);
    const isOnDownhill = currentSlope && currentSlope.slope < -1;
    if (!this.disableDownhill && isOnDownhill) {
      const rng2 = this.posKeepMode === 2 /* Virtual */ && !this.pacer ? this.syncRng.random() : this.downhillRng.random();
      if (this.downhillModeStart === null) {
        if (rng2 < this.horse.wisdom * 4e-4) {
          this.downhillModeStart = currentFrame;
          this.isDownhillMode = true;
        }
      } else {
        if (rng2 < 0.2) {
          this.downhillModeStart = null;
          this.isDownhillMode = false;
        }
      }
    } else {
      if (this.isDownhillMode) {
        this.downhillModeStart = null;
        this.isDownhillMode = false;
      }
    }
  }
  updateTargetSpeed() {
    if (!this.hp.hasRemainingHp()) {
      this.targetSpeed = this.minSpeed;
    } else if (this.isLastSpurt) {
      this.targetSpeed = this.lastSpurtSpeed;
    } else {
      this.targetSpeed = this.baseTargetSpeed[this.phase] * this.posKeepSpeedCoef;
      this.targetSpeed += this.sectionModifier[Math.floor(this.pos / this.sectionLength)];
    }
    this.targetSpeed += this.modifiers.targetSpeed.acc + this.modifiers.targetSpeed.err;
    if (this.hillIdx != -1) {
      this.targetSpeed -= this.course.slopes[this.hillIdx].slope / 1e4 * 200 / this.horse.power;
      this.targetSpeed = Math.max(this.targetSpeed, this.minSpeed);
    }
    if (this.competeFight) {
      this.targetSpeed += Math.pow(200 * this.horse.guts, 0.709) * 1e-4;
    }
    if (this.leadCompetition) {
      this.targetSpeed += Math.pow(500 * this.horse.guts, 0.6) * 1e-4;
    }
    if (this.isDownhillMode) {
      const currentSlope = this.course.slopes.find((s) => this.pos >= s.start && this.pos <= s.start + s.length);
      if (currentSlope) {
        const downhillBonus = 0.3 + Math.abs(currentSlope.slope / 1e4) / 10;
        this.targetSpeed += downhillBonus;
      }
    }
    if (this.laneChangeSpeed > 0 && this.activeLaneMovementSkills.length > 0) {
      const moveLaneModifier = Math.sqrt(2e-4 * this.horse.power);
      this.targetSpeed += moveLaneModifier;
    }
  }
  applyForces() {
    if (!this.hp.hasRemainingHp()) {
      this.accel = -1.2;
      return;
    }
    if (this.currentSpeed > this.targetSpeed) {
      this.accel = this.positionKeepState === 2 /* PaceDown */ ? -0.5 : PhaseDeceleration[this.phase];
      return;
    }
    this.accel = this.baseAccel[+(this.hillIdx != -1) * 3 + this.phase];
    this.accel += this.modifiers.accel.acc + this.modifiers.accel.err;
    if (this.competeFight) {
      this.accel += Math.pow(160 * this.horse.guts, 0.59) * 1e-4;
    }
  }
  updateHills() {
    if (this.hillIdx == -1 && this.hillStart.length > 0 && this.pos >= this.hillStart[this.hillStart.length - 1]) {
      if (this.course.slopes[this.nHills - this.hillStart.length].slope > 100) {
        this.hillIdx = this.nHills - this.hillStart.length;
      } else {
        this.hillEnd.pop();
      }
      this.hillStart.pop();
    } else if (this.hillIdx != -1 && this.hillEnd.length > 0 && this.pos > this.hillEnd[this.hillEnd.length - 1]) {
      this.hillIdx = -1;
      this.hillEnd.pop();
    }
  }
  updatePhase() {
    if (this.pos >= this.nextPhaseTransition && this.phase < 2) {
      ++this.phase;
      this.nextPhaseTransition = CourseHelpers.phaseStart(this.course.distance, this.phase + 1);
    }
  }
  processSkillActivations() {
    for (let i = this.activeTargetSpeedSkills.length; --i >= 0; ) {
      const s = this.activeTargetSpeedSkills[i];
      if (s.durationTimer.t >= 0) {
        this.activeTargetSpeedSkills.splice(i, 1);
        this.modifiers.targetSpeed.add(-s.modifier);
        this.onSkillDeactivate(this, s.skillId, s.perspective);
      }
    }
    for (let i = this.activeCurrentSpeedSkills.length; --i >= 0; ) {
      const s = this.activeCurrentSpeedSkills[i];
      if (s.durationTimer.t >= 0) {
        this.activeCurrentSpeedSkills.splice(i, 1);
        this.modifiers.currentSpeed.add(-s.modifier);
        if (s.naturalDeceleration) {
          this.modifiers.oneFrameAccel += s.modifier;
        }
        this.onSkillDeactivate(this, s.skillId, s.perspective);
      }
    }
    for (let i = this.activeAccelSkills.length; --i >= 0; ) {
      const s = this.activeAccelSkills[i];
      if (s.durationTimer.t >= 0) {
        this.activeAccelSkills.splice(i, 1);
        this.modifiers.accel.add(-s.modifier);
        this.onSkillDeactivate(this, s.skillId, s.perspective);
      }
    }
    for (let i = this.activeLaneMovementSkills.length; --i >= 0; ) {
      const s = this.activeLaneMovementSkills[i];
      if (s.durationTimer.t >= 0) {
        this.activeLaneMovementSkills.splice(i, 1);
        this.onSkillDeactivate(this, s.skillId, s.perspective);
      }
    }
    for (let i = this.activeChangeLaneSkills.length; --i >= 0; ) {
      const s = this.activeChangeLaneSkills[i];
      if (s.durationTimer.t >= 0) {
        this.activeChangeLaneSkills.splice(i, 1);
        this.onSkillDeactivate(this, s.skillId, s.perspective);
      }
    }
    for (let i = this.pendingSkills.length; --i >= 0; ) {
      const s = this.pendingSkills[i];
      if (this.pos >= s.trigger.end || this.pendingRemoval.has(s.skillId)) {
        this.pendingSkills.splice(i, 1);
        this.pendingRemoval.delete(s.skillId);
      } else if (this.pos >= s.trigger.start && s.extraCondition(this)) {
        if (this.skillCheckChance && !this.shouldSkipWisdomCheck(s) && !this.checkWisdomForSkill(s)) {
          this.pendingSkills.splice(i, 1);
        } else {
          this.activateSkill(s);
          this.pendingSkills.splice(i, 1);
        }
      }
    }
  }
  checkWisdomForSkill(skill) {
    let rngRoll = this.wisdomRollRng.random();
    const wisdom = skill.perspective === 2 /* Other */ && skill.originWisdom !== void 0 ? skill.originWisdom : this.horse.wisdom;
    let wisdomCheck = Math.max(100 - 9e3 / wisdom, 20) * 0.01;
    return rngRoll <= wisdomCheck;
  }
  shouldSkipWisdomCheck(skill) {
    if (skill.effects.length > 0 && skill.effects[0].type >= 1 && skill.effects[0].type <= 5) {
      return true;
    }
    if (skill.rarity === 3 /* Unique */) {
      return true;
    }
    return false;
  }
  activateSkill(s) {
    s.effects.sort((a, b) => +(a.type == 42) - +(b.type == 42)).forEach((ef) => {
      const scaledDuration = ef.baseDuration * (this.course.distance / 1e3) * (s.rarity == 6 /* Evolution */ ? this.modifiers.specialSkillDurationScaling : 1);
      switch (ef.type) {
        case 1 /* SpeedUp */:
          this.horse.speed = Math.max(this.horse.speed + ef.modifier, 1);
          break;
        case 2 /* StaminaUp */:
          this.horse.stamina = Math.max(this.horse.stamina + ef.modifier, 1);
          this.horse.rawStamina = Math.max(this.horse.rawStamina + ef.modifier, 1);
          break;
        case 3 /* PowerUp */:
          this.horse.power = Math.max(this.horse.power + ef.modifier, 1);
          break;
        case 4 /* GutsUp */:
          this.horse.guts = Math.max(this.horse.guts + ef.modifier, 1);
          break;
        case 5 /* WisdomUp */:
          this.horse.wisdom = Math.max(this.horse.wisdom + ef.modifier, 1);
          break;
        case 10 /* MultiplyStartDelay */:
          this.startDelay *= ef.modifier;
          break;
        case 14 /* SetStartDelay */:
          this.startDelay = ef.modifier;
          break;
        case 27 /* TargetSpeed */:
          this.modifiers.targetSpeed.add(ef.modifier);
          this.activeTargetSpeedSkills.push({ skillId: s.skillId, perspective: s.perspective, durationTimer: this.getNewTimer(-scaledDuration), modifier: ef.modifier });
          break;
        case 31 /* Accel */:
          this.modifiers.accel.add(ef.modifier);
          this.activeAccelSkills.push({ skillId: s.skillId, perspective: s.perspective, durationTimer: this.getNewTimer(-scaledDuration), modifier: ef.modifier });
          break;
        case 28 /* LaneMovementSpeed */:
          this.activeLaneMovementSkills.push({ skillId: s.skillId, perspective: s.perspective, durationTimer: this.getNewTimer(-scaledDuration), modifier: ef.modifier });
          break;
        case 21 /* CurrentSpeed */:
        case 22 /* CurrentSpeedWithNaturalDeceleration */:
          this.modifiers.currentSpeed.add(ef.modifier);
          this.activeCurrentSpeedSkills.push({
            skillId: s.skillId,
            perspective: s.perspective,
            durationTimer: this.getNewTimer(-scaledDuration),
            modifier: ef.modifier,
            naturalDeceleration: ef.type == 22 /* CurrentSpeedWithNaturalDeceleration */
          });
          break;
        case 9 /* Recovery */:
          ++this.activateCountHeal;
          this.hp.recover(ef.modifier, this);
          if (this.phase >= 2 && !this.isLastSpurt) {
            this.updateLastSpurtState();
          }
          break;
        case 37 /* ActivateRandomGold */:
          this.doActivateRandomGold(ef.modifier);
          break;
        case 42 /* ExtendEvolvedDuration */:
          this.modifiers.specialSkillDurationScaling = ef.modifier;
          break;
        case 35 /* ChangeLane */:
          this.activeChangeLaneSkills.push({ skillId: s.skillId, perspective: s.perspective, durationTimer: this.getNewTimer(-scaledDuration), modifier: ef.modifier });
          break;
      }
    });
    ++this.activateCount[this.phase];
    this.usedSkills.add(s.skillId);
    this.onSkillActivate(this, s.skillId, s.perspective);
  }
  doActivateRandomGold(ngolds) {
    const goldIndices = this.pendingSkills.reduce((acc, skill, i) => {
      if ((skill.rarity == 2 /* Gold */ || skill.rarity == 6 /* Evolution */) && skill.effects.every((ef) => ef.type > 5 /* WisdomUp */))
        acc.push(i);
      return acc;
    }, []);
    for (let i = goldIndices.length; --i >= 0; ) {
      const j = this.gorosiRng.uniform(i + 1);
      [goldIndices[i], goldIndices[j]] = [goldIndices[j], goldIndices[i]];
    }
    for (let i = 0; i < Math.min(ngolds, goldIndices.length); ++i) {
      const s = this.pendingSkills[goldIndices[i]];
      this.activateSkill(s);
      this.pendingRemoval.add(s.skillId);
    }
  }
  // deactivate any skills that haven't finished their durations yet (intended to be called at the end of a simulation, when a skill
  // might have activated towards the end of the race and the race finished before the skill's duration)
  cleanup() {
    const callDeactivateHook = (s) => {
      this.onSkillDeactivate(this, s.skillId, s.perspective);
    };
    this.activeTargetSpeedSkills.forEach(callDeactivateHook);
    this.activeCurrentSpeedSkills.forEach(callDeactivateHook);
    this.activeAccelSkills.forEach(callDeactivateHook);
    this.activeLaneMovementSkills.forEach(callDeactivateHook);
    this.activeChangeLaneSkills.forEach(callDeactivateHook);
  }
  registerCondition(name, condition) {
    this.conditions.set(name, condition);
    if (!this.conditionValues.has(name)) {
      this.conditionValues.set(name, condition.valueOnStart);
    }
  }
  getConditionValue(name) {
    if (!this.conditionValues.has(name)) {
      if (this.conditions.has(name)) {
        const condition = this.conditions.get(name);
        return condition.valueOnStart;
      }
      throw new Error(`Condition "${name}" is not registered`);
    }
    return this.conditionValues.get(name);
  }
  tickConditions() {
    const state = {
      simulation: this
    };
    for (const [name, condition] of this.conditions.entries()) {
      const currentValue = this.conditionValues.get(name) ?? condition.valueOnStart;
      const newValue = condition.update(state, currentValue);
      this.conditionValues.set(name, newValue);
    }
  }
};

// uma-skill-tools/EnhancedHpPolicy.ts
var HpStrategyCoefficient = Object.freeze([0, 0.95, 0.89, 1, 0.995, 0.86]);
var HpConsumptionGroundModifier = Object.freeze([
  [],
  [0, 1, 1, 1.02, 1.02],
  [0, 1, 1, 1.01, 1.02]
].map((o) => Object.freeze(o)));
var EnhancedHpPolicy = class {
  constructor(course, ground2, rng2, recalculateOnHeal = false) {
    this.spurtParameters = null;
    this.recalculationCount = 0;
    // Track if max spurt was achieved on FIRST calculation (matches Kotlin behavior)
    this.maxSpurtAchieved = false;
    this.hasCalculatedSpurtOnce = false;
    this.distance = course.distance;
    this.baseSpeed = 20 - (course.distance - 2e3) / 1e3;
    this.groundModifier = HpConsumptionGroundModifier[course.surface][ground2];
    this.rng = rng2;
    this.maxHp = 1;
    this.hp = 1;
    this.baseTargetSpeed2 = 0;
    this.maxSpurtSpeed = 0;
    this.recalculateOnHeal = recalculateOnHeal;
  }
  init(horse2) {
    this.maxHp = 0.8 * HpStrategyCoefficient[horse2.strategy] * horse2.stamina + this.distance;
    this.hp = this.maxHp;
    this.gutsModifier = 1 + 200 / Math.sqrt(600 * horse2.guts);
    this.subparAcceptChance = Math.round((15 + 0.05 * horse2.wisdom) * 1e3);
    this.baseTargetSpeed2 = this.calculateBaseTargetSpeed(horse2, 2);
    this.maxSpurtSpeed = this.calculateMaxSpurtSpeed(horse2);
    this.spurtParameters = null;
    this.recalculationCount = 0;
    this.maxSpurtAchieved = false;
    this.hasCalculatedSpurtOnce = false;
  }
  calculateBaseTargetSpeed(horse2, phase) {
    const StrategyPhaseCoefficient = [
      [],
      [1, 0.98, 0.962],
      [0.978, 0.991, 0.975],
      [0.938, 0.998, 0.994],
      [0.931, 1, 1],
      [1.063, 0.962, 0.95]
    ];
    const DistanceProficiencyModifier = [1.05, 1, 0.9, 0.8, 0.6, 0.4, 0.2, 0.1];
    return this.baseSpeed * StrategyPhaseCoefficient[horse2.strategy][phase] + (phase == 2 ? Math.sqrt(500 * horse2.speed) * DistanceProficiencyModifier[horse2.distanceAptitude] * 2e-3 : 0);
  }
  calculateMaxSpurtSpeed(horse2) {
    const DistanceProficiencyModifier = [1.05, 1, 0.9, 0.8, 0.6, 0.4, 0.2, 0.1];
    let v = (this.baseTargetSpeed2 + 0.01 * this.baseSpeed) * 1.05 + Math.sqrt(500 * horse2.speed) * DistanceProficiencyModifier[horse2.distanceAptitude] * 2e-3;
    return v;
  }
  getStatusModifier(state) {
    let modifier = 1;
    if (state.positionKeepState === 2 /* PaceDown */) {
      modifier *= 0.6;
    }
    if (state.isRushed) {
      modifier *= 1.6;
    }
    if (state.isDownhillMode) {
      modifier *= 0.4;
    }
    return modifier;
  }
  hpPerSecond(state, velocity) {
    const gutsModifier = state.phase >= 2 ? this.gutsModifier : 1;
    return 20 * Math.pow(velocity - this.baseSpeed + 12, 2) / 144 * this.getStatusModifier(state) * this.groundModifier * gutsModifier;
  }
  tick(state, dt2) {
    this.hp -= this.hpPerSecond(state, state.currentSpeed) * dt2;
  }
  hasRemainingHp() {
    return this.hp > 0;
  }
  hpRatioRemaining() {
    return Math.max(0, this.hp / this.maxHp);
  }
  recover(modifier, state) {
    this.hp = Math.min(this.maxHp, this.hp + this.maxHp * modifier);
    if (this.recalculateOnHeal && state && state.phase >= 2 && this.spurtParameters) {
      this.recalculationCount++;
      const maxDistance = this.distance - state.pos;
      const spurtDistance = this.calcSpurtDistance(state, this.maxSpurtSpeed);
      if (spurtDistance >= maxDistance) {
        this.spurtParameters = {
          distance: maxDistance,
          speed: this.maxSpurtSpeed,
          spDiff: this.hp - this.calcRequiredHp(this.maxSpurtSpeed, maxDistance - 60, true, false),
          time: 0
        };
      } else {
        const totalConsumeV3 = this.calcRequiredHp(this.baseTargetSpeed2, maxDistance - 60, true, false);
        const excessHp = this.hp - totalConsumeV3;
        if (excessHp < 0) {
          this.spurtParameters = {
            distance: 0,
            speed: this.baseTargetSpeed2,
            spDiff: this.hp - this.calcRequiredHp(this.maxSpurtSpeed, maxDistance - 60, true, false),
            time: 0
          };
        } else {
          const candidates = [];
          for (let speed = this.baseTargetSpeed2; speed < this.maxSpurtSpeed; speed += 0.1) {
            const distanceV = Math.min(maxDistance, this.calcSpurtDistance(state, speed));
            const time = distanceV / speed + (maxDistance - distanceV) / this.baseTargetSpeed2;
            candidates.push({
              distance: distanceV,
              speed,
              spDiff: this.hp - this.calcRequiredHp(this.maxSpurtSpeed, maxDistance - 60, true, false),
              time
            });
          }
          candidates.sort((a, b) => a.time - b.time);
          const randomRoll = this.rng.uniform(1e5);
          let selected = candidates[candidates.length - 1];
          for (const candidate of candidates) {
            if (randomRoll <= this.subparAcceptChance) {
              selected = candidate;
              break;
            }
          }
          this.spurtParameters = selected;
        }
      }
    }
  }
  /**
   * Calculate required HP for a given velocity and distance
   * Ported from RaceState.calcRequiredSp in Kotlin
   */
  calcRequiredHp(velocity, length = this.distance - 60, spurtPhase = true, applyStatusModifier = false) {
    const state = { phase: 2, positionKeepState: 0 /* None */ };
    const baseConsumption = 20 * Math.pow(velocity - this.baseSpeed + 12, 2) / 144;
    const gutsModifier = spurtPhase ? this.gutsModifier : 1;
    const statusModifier = applyStatusModifier ? this.getStatusModifier(state) : 1;
    return length / velocity * baseConsumption * this.groundModifier * gutsModifier * statusModifier;
  }
  /**
   * Calculate how far the horse can spurt at a given speed
   * Ported from RaceState.calcSpurtDistance in Kotlin
   */
  calcSpurtDistance(state, targetSpeed) {
    const remainingDistance = this.distance - state.pos;
    const v3 = this.baseTargetSpeed2;
    const hpForBase = (remainingDistance - 60) * 20 * this.groundModifier * this.gutsModifier * Math.pow(v3 - this.baseSpeed + 12, 2) / 144 / v3;
    const excessHp = this.hp - hpForBase;
    const consumptionDiff = 20 * this.groundModifier * this.gutsModifier * (Math.pow(targetSpeed - this.baseSpeed + 12, 2) / 144 / targetSpeed - Math.pow(v3 - this.baseSpeed + 12, 2) / 144 / v3);
    return excessHp / consumptionDiff + 60;
  }
  /**
   * Enhanced last spurt calculation using Kotlin algorithm
   * Ported from RaceState.calcSpurtParameter in Kotlin
   * 
   * This method:
   * 1. Checks if we have enough HP to spurt at max speed
   * 2. If not, calculates optimal suboptimal speed
   * 3. Uses wisdom-based random selection for suboptimal choices
   * 
   * IMPORTANT: To ensure consistent RNG consumption for fair comparisons,
   * this method consumes exactly ONE RNG call regardless of the outcome.
   * This prevents "cross-contamination" where different horses consume
   * different numbers of random values, desynchronizing comparison runs.
   * 
   * In accuracy mode (recalculateOnHeal=true), this will be called multiple
   * times if heals occur in phase 2+, matching Kotlin's dynamic behavior.
   */
  getLastSpurtPair(state, maxSpeed, baseTargetSpeed2) {
    this.maxSpurtSpeed = maxSpeed;
    this.baseTargetSpeed2 = baseTargetSpeed2;
    if (state.phase < 2) {
      return [-1, maxSpeed];
    }
    if (this.spurtParameters !== null && !this.recalculateOnHeal) {
      return [this.distance - this.spurtParameters.distance, this.spurtParameters.speed];
    }
    const isFirstCalcEver = !this.hasCalculatedSpurtOnce;
    const maxDistance = this.distance - state.pos;
    const spurtDistance = this.calcSpurtDistance(state, this.maxSpurtSpeed);
    const totalConsume = this.calcRequiredHp(this.maxSpurtSpeed, maxDistance - 60, true, false);
    if (spurtDistance >= maxDistance) {
      const inEarlyPhase2 = state.pos <= this.distance * 2 / 3 + 5;
      if (inEarlyPhase2 && isFirstCalcEver) {
        this.maxSpurtAchieved = true;
      }
      if (isFirstCalcEver) {
        this.hasCalculatedSpurtOnce = true;
      }
      this.spurtParameters = {
        distance: maxDistance,
        speed: this.maxSpurtSpeed,
        spDiff: this.hp - totalConsume,
        time: 0
      };
      return [-1, this.maxSpurtSpeed];
    }
    if (isFirstCalcEver) {
      this.hasCalculatedSpurtOnce = true;
    }
    const totalConsumeV3 = this.calcRequiredHp(this.baseTargetSpeed2, maxDistance - 60, true, false);
    const excessHp = this.hp - totalConsumeV3;
    if (excessHp < 0) {
      this.spurtParameters = {
        distance: 0,
        speed: this.baseTargetSpeed2,
        spDiff: this.hp - totalConsume,
        time: 0
      };
      return [-1, this.baseTargetSpeed2];
    }
    const candidates = [];
    const remainDistance = maxDistance - 60;
    for (let speed = this.baseTargetSpeed2; speed < this.maxSpurtSpeed; speed += 0.1) {
      const distanceV = Math.min(maxDistance, this.calcSpurtDistance(state, speed));
      const time = distanceV / speed + (maxDistance - distanceV) / this.baseTargetSpeed2;
      candidates.push({
        distance: distanceV,
        speed,
        spDiff: this.hp - totalConsume,
        time
      });
    }
    candidates.sort((a, b) => a.time - b.time);
    const randomRoll = this.rng.uniform(1e5);
    for (let i = 0; i < candidates.length; ++i) {
      if (randomRoll <= this.subparAcceptChance) {
        const candidate = candidates[i];
        this.spurtParameters = candidate;
        return [this.distance - candidate.distance, candidate.speed];
      }
    }
    const lastCandidate = candidates[candidates.length - 1];
    this.spurtParameters = lastCandidate;
    return [this.distance - lastCandidate.distance, lastCandidate.speed];
  }
  /**
   * Get current spurt parameters (for debugging/analysis)
   */
  getSpurtParameters() {
    return this.spurtParameters;
  }
  /**
   * Check if currently in max spurt mode
   */
  isMaxSpurt() {
    return this.maxSpurtAchieved;
  }
  getRecalculationCount() {
    return this.recalculationCount;
  }
};

// uma-skill-tools/HpPolicy.ts
var HpStrategyCoefficient2 = Object.freeze([0, 0.95, 0.89, 1, 0.995, 0.86]);
var HpConsumptionGroundModifier2 = Object.freeze([
  [],
  [0, 1, 1, 1.02, 1.02],
  [0, 1, 1, 1.01, 1.02]
].map((o) => Object.freeze(o)));
var GameHpPolicy = class {
  constructor(course, ground2, rng2) {
    this.achievedMaxSpurt = false;
    this.distance = course.distance;
    this.baseSpeed = 20 - (course.distance - 2e3) / 1e3;
    this.groundModifier = HpConsumptionGroundModifier2[course.surface][ground2];
    this.rng = rng2;
    this.maxHp = 1;
    this.hp = 1;
    this.achievedMaxSpurt = false;
  }
  init(horse2) {
    this.maxHp = 0.8 * HpStrategyCoefficient2[horse2.strategy] * horse2.stamina + this.distance;
    this.hp = this.maxHp;
    this.gutsModifier = 1 + 200 / Math.sqrt(600 * horse2.guts);
    this.subparAcceptChance = Math.round((15 + 0.05 * horse2.wisdom) * 1e3);
    this.achievedMaxSpurt = false;
  }
  getStatusModifier(state) {
    let modifier = 1;
    if (state.isDownhillMode) {
      modifier *= 0.4;
    }
    if (state.leadCompetition) {
      const isOonige = state.posKeepStrategy === 5 /* Oonige */;
      if (state.isRushed) {
        modifier *= isOonige ? 7.7 : 3.6;
      } else {
        modifier *= isOonige ? 3.5 : 1.4;
      }
    } else if (state.isRushed) {
      modifier *= 1.6;
    }
    if (state.positionKeepState === 2 /* PaceDown */) {
      modifier *= 0.6;
    }
    return modifier;
  }
  hpPerSecond(state, velocity) {
    const gutsModifier = state.phase >= 2 ? this.gutsModifier : 1;
    return 20 * Math.pow(velocity - this.baseSpeed + 12, 2) / 144 * this.getStatusModifier(state) * this.groundModifier * gutsModifier;
  }
  tick(state, dt2) {
    this.hp -= this.hpPerSecond(state, state.currentSpeed) * dt2;
  }
  hasRemainingHp() {
    return this.hp > 0;
  }
  hpRatioRemaining() {
    return Math.max(0, this.hp / this.maxHp);
  }
  recover(modifier, _state) {
    this.hp = Math.min(this.maxHp, this.hp + this.maxHp * modifier);
  }
  getLastSpurtPair(state, maxSpeed, baseTargetSpeed2) {
    const maxDist = this.distance - CourseHelpers.phaseStart(this.distance, 2);
    const s = (maxDist - 60) / maxSpeed;
    const lastleg = { phase: 2, positionKeepState: 0 /* None */, leadCompetition: false, posKeepStrategy: state.posKeepStrategy };
    const hpNeeded = this.hpPerSecond(lastleg, maxSpeed) * s;
    if (this.hp >= hpNeeded) {
      if (!this.achievedMaxSpurt) {
        this.achievedMaxSpurt = true;
      }
      return [-1, maxSpeed];
    }
    const candidates = [];
    const remainDistance = this.distance - 60 - state.pos;
    const statusModifier = this.getStatusModifier(lastleg);
    for (let speed = maxSpeed - 0.1; speed >= baseTargetSpeed2; speed -= 0.1) {
      const spurtDuration = Math.min(
        remainDistance / speed,
        Math.max(
          0,
          (baseTargetSpeed2 * this.hp - this.hpPerSecond(lastleg, baseTargetSpeed2) * remainDistance) / (baseTargetSpeed2 * this.hpPerSecond(lastleg, speed) - this.hpPerSecond(lastleg, baseTargetSpeed2) * speed)
        )
      );
      const spurtDistance = spurtDuration * speed;
      candidates.push([this.distance - spurtDistance, speed]);
    }
    candidates.sort((a, b) => (a[0] - state.pos) / baseTargetSpeed2 + (this.distance - a[0]) / a[1] - ((b[0] - state.pos) / baseTargetSpeed2 + (this.distance - b[0]) / b[1]));
    const randomRoll = this.rng.uniform(1e5);
    for (let i = 0; i < candidates.length; ++i) {
      if (randomRoll <= this.subparAcceptChance) {
        return candidates[i];
      }
    }
    return candidates[candidates.length - 1];
  }
  /**
   * Check if max spurt was achieved
   */
  isMaxSpurt() {
    return this.achievedMaxSpurt;
  }
};

// uma-skill-tools/RaceSolverEnhanced.ts
function createRaceSolver(config) {
  const hp = config.useEnhancedSpurt ? new EnhancedHpPolicy(config.course, config.ground, config.rng) : new GameHpPolicy(config.course, config.ground, config.rng);
  return new RaceSolver({
    horse: config.horse,
    course: config.course,
    rng: config.rng,
    skills: config.skills,
    hp,
    pacer: config.pacer,
    onSkillActivate: config.onSkillActivate,
    onSkillDeactivate: config.onSkillDeactivate,
    disableRushed: config.disableRushed,
    disableDownhill: config.disableDownhill
  });
}

// reproduce_stamina.ts
if (typeof global.CC_GLOBAL === "undefined") {
  global.CC_GLOBAL = false;
}
var courseData = {
  "corners": [{ "length": 250, "start": 458 }, { "length": 250, "start": 708 }, { "length": 200, "start": 1450 }, { "length": 200, "start": 1650 }, { "length": 250, "start": 2300 }, { "length": 247, "start": 2550 }],
  "course": 3,
  "courseSetStatus": [],
  "distance": 3200,
  "distanceType": 4,
  "finishTimeMax": 204e4,
  "finishTimeMin": 193e4,
  "laneMax": 14100,
  "raceTrackId": 10008,
  "slopes": [{ "length": 100, "slope": 2e4, "start": 208 }, { "length": 225, "slope": 1e4, "start": 308 }, { "length": 150, "slope": -2e4, "start": 533 }, { "length": 100, "slope": 2e4, "start": 2050 }, { "length": 225, "slope": 1e4, "start": 2150 }, { "length": 150, "slope": -2e4, "start": 2375 }],
  "straights": [{ "end": 458, "frontType": 2, "start": 0 }, { "end": 1450, "frontType": 1, "start": 958 }, { "end": 2300, "frontType": 2, "start": 1850 }, { "end": 3200, "frontType": 1, "start": 2797 }],
  "surface": 1,
  "turn": 1,
  "horseLane": 2.5,
  // Standard lane width simulation
  "laneChangeAccelerationPerFrame": 6e-3,
  // Default value
  "moveLanePoint": 200,
  // Standard move lane point
  "maxLaneDistance": 15
  // Standard max lane distance
};
var horse = {
  speed: 1200,
  stamina: 300,
  // Very low for 3200m
  power: 1e3,
  guts: 1e3,
  wisdom: 1e3,
  surfaceAptitude: 0,
  distanceAptitude: 0,
  strategyAptitude: 0,
  strategy: 1 /* Nige */,
  // 1
  mood: 0,
  // Normal
  properRunStrategy: 1 /* Nige */
};
var ground = 1 /* Good */;
var rng = new SeededRng(12345);
console.log("Creating RaceSolver with EnhancedHpPolicy...");
var solver = createRaceSolver({
  horse,
  course: courseData,
  ground,
  rng,
  skills: [],
  useEnhancedSpurt: false
});
console.log(`Initial HP: ${solver.hp.hp} / ${solver.hp.maxHp}`);
console.log(`Course Distance: ${solver.course.distance}`);
var dt = 1 / 15;
var frames = 0;
while (solver.pos < solver.course.distance) {
  solver.step(dt);
  frames++;
  if (frames % 150 === 0) {
  }
}
console.log("Race finished.");
console.log(`Final HP: ${solver.hp.hp.toFixed(1)}`);
console.log(`HP Died: ${solver.hpDied}`);
console.log(`Full Spurt: ${solver.fullSpurt}`);
var expectedMaxHp = 0.8 * 0.95 * 300 + 3200;
console.log(`Expected MaxHP (approx): ${expectedMaxHp}`);
if (solver.hp.hp > 0) {
  console.error("FAILURE: Horse finished with remaining HP despite low stamina!");
} else {
  console.log("SUCCESS: Horse ran out of HP as expected.");
}
