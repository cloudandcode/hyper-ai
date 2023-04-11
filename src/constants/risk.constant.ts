export const RISK: Record<number, string> = {
  9: '[DANGER]',
  10: '[DANGER]'
};

export const RISK_DESCRIPTION: Record<number, string> = {
  5: '\x1b[33m[AI: NOTICE] - %s\x1b[0m',
  6: '\x1b[33m[AI: NOTICE] - %s\x1b[0m',
  7: '\x1b[33m[AI: NOTICE] - %s\x1b[0m',
  8: '\x1b[33m[AI: WARNING] - %s\x1b[0m',
  9: '\x1b[38;2;255;165;0m[AI: DANGER] - %s\x1b[0m',
  10: '\x1b[31m[AI: DANGER] - %s\x1b[0m'
};

export const FUNNY_DESCRIPTION = {
  0: '\x1B[32m[AI: INFO] - %s\x1b[0m'
};