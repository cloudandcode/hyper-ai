export const RISK: Record<number, string> = {
  9: '\x1b[38;2;255;165;0m[DANGER]\x1b[0m',
  10: '\x1b[31m[EXTREME DANGER]\x1b[0m'
};

export const RISK_DESCRIPTION: Record<number, string> = {
  8: '\x1b[33m[AI: WARNING] - %s\x1b[0m',
  9: '\x1b[38;2;255;165;0m[AI: DANGER] - %s Delete the notice to execute at your own risk.\x1b[0m',
  10: '\x1b[31m[AI: EXTREME DANGER] - %s Delete the notice to execute at your own risk.\x1b[0m'
};