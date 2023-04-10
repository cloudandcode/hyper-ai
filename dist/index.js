"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decorateTerm = exports.reduceUI = exports.onWindow = exports.onApp = void 0;
const hooks_1 = require("./hooks");
Object.defineProperty(exports, "decorateTerm", { enumerable: true, get: function () { return hooks_1.decorateTerm; } });
Object.defineProperty(exports, "onApp", { enumerable: true, get: function () { return hooks_1.onApp; } });
Object.defineProperty(exports, "onWindow", { enumerable: true, get: function () { return hooks_1.onWindow; } });
const reducer_1 = require("./reducer");
Object.defineProperty(exports, "reduceUI", { enumerable: true, get: function () { return reducer_1.reduceUI; } });
