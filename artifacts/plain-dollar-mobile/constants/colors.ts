/**
 * The Plain Dollar — semantic design tokens.
 * Mirrors the web artifact palette: navy #1a3a5c, off-white #f8f7f4,
 * gold accent #c5973c.
 */

const colors = {
  light: {
    // Legacy aliases (kept for backward compatibility)
    text: '#26241f',
    tint: '#1a3a5c',

    // Core surfaces
    background: '#f8f7f4',
    foreground: '#26241f',

    // Cards / elevated surfaces
    card: '#ffffff',
    cardForeground: '#26241f',

    // Primary action color (buttons, links, active states)
    primary: '#1a3a5c',
    primaryForeground: '#f2f6fa',

    // Secondary / less-emphasis interactive surfaces
    secondary: '#eeeade',
    secondaryForeground: '#26241f',

    // Muted / subdued elements (dividers, timestamps, placeholders)
    muted: '#efece4',
    mutedForeground: '#6b675c',

    // Accent highlights (gold — badges, CTAs)
    accent: '#c5973c',
    accentForeground: '#241c0c',

    // Destructive actions (delete, error states)
    destructive: '#b3402e',
    destructiveForeground: '#ffffff',

    // Positive (winner rows, good values)
    success: '#2c6e49',

    // Borders and input outlines
    border: '#e3ded1',
    input: '#d8d2c2',
  },

  radius: 8,
};

export default colors;
