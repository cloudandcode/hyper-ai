"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onWindow = exports.onApp = void 0;
/**
 * Handles app startup event
 *
 * @param {Object} options - The app config options
 * @param {Object} options.config - The app configuration object
 */
const onApp = (app) => {
    console.log('HYPER-AI ON APP STARTUP');
    console.log('CONFIG', app.config);
};
exports.onApp = onApp;
/**
 * Opens dev tools for a window instance.
 *
 * @param {Object} win - The window instance.
 */
const onWindow = (win) => {
    win.webContents.openDevTools();
};
exports.onWindow = onWindow;
