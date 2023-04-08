/**
 * Handles app startup event
 *
 * @param {Object} options - The app config options
 * @param {Object} options.config - The app configuration object
 */
exports.onApp = ({ config }) => {
  console.log('HYPER-AI ON APP STARTUP');
  console.log('CONFIG', config);
};

/**
 * Opens dev tools for a window instance.
 *
 * @param {Object} win - The window instance.
 */
exports.onWindow = (win) => {
  win.webContents.openDevTools();
};