import { decorateTerm, onApp, onWindow } from './hooks';
import { reduceUI } from './reducer';

/**
 * Exporting Hyper terminal hooks.
 * 
 * @property {onAppCallback} onApp - Called when a new app is created.
 * @property {onWindowCallback} onWindow - Called when a new window is created.
 * @property {middlewareCallback} middleware - Middleware function for manipulating incoming data before it reaches the terminal UI.
 * @property {reduceUICallback} reduceUI - Function that manipulates the terminal UI state via Redux.
 * @property {getTermPropsCallback} getTermProps - Function that returns props to be spread over a terminal component.
 */
export {
  onApp,
  onWindow,
  reduceUI,
  decorateTerm
};
