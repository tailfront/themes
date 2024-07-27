/**
 * @file preset.js
 * @overview Base theme preset configuration.
 * @example
 * ```js
// tailwind.config.js
export default {
  presets: [
    require('./base.config'),
  ],
  // ...
}
 * ```
 * @require npx tailfront@latest themes base
 * @see https://tailfront.io/themes/base
 * @see https://tailwindcss.com/docs/presets
 */
/**
MIT License

Copyright (c) 2024 Tailfront

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
 */

const colors = require('tailwindcss/colors');
const plugin = require('tailwindcss/plugin');

module.exports = {
  theme: {
    accentColor: ({ theme }) => theme('colors.accent'),
    borderColor: ({ theme }) => ({
      ...theme('colors'),
      DEFAULT: theme('colors.stroke.200', 'currentColor'),
    }),
    caretColor: ({ theme }) => theme('colors.accent'),
    outlineColor: ({ theme }) => theme('borderColor'),
    ringColor: ({ theme }) => ({
      ...theme('colors'),
      DEFAULT: theme('colors.accent.500', '#60A5FA'),
    }),
    ringOffsetColor: ({ theme }) => theme('ringColor'),
    borderRadius: {
      // px for squircle
      none: '0px',
      sm: '2px',
      DEFAULT: '4px',
      md: '6px',
      lg: '8px',
      xl: '10px',
      '2xl': '16px',
      '3xl': '24px',
      full: '9999px',
    },
    borderWidth: {
      // Duplicate to persist
      DEFAULT: '1px',
      0: '0px',
      2: '2px',
      4: '4px',
      8: '8px',
    },
    fontFamily: {
      sans: [
        'Inter',
        'ui-sans-serif',
        'system-ui',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
      ],
      serif: [
        'ui-serif',
        'Georgia',
        'Cambria',
        '"Times New Roman"',
        'Times',
        'serif',
      ],
      mono: [
        'JetBrainsMono',
        'ui-monospace',
        'SFMono-Regular',
        'Menlo',
        'Monaco',
        'Consolas',
        '"Liberation Mono"',
        '"Courier New"',
        'monospace',
      ],
    },
    extend: {
      colors: {
        accent: colors.blue,
        type: colors.neutral,
        container: colors.neutral,
        stroke: colors.neutral,
      },
    },
  },
  plugins: [
    plugin(({ addUtilities, theme }) => {
      const shape = Object.entries(theme('borderRadius')).reduce(
        (acc, [key, value]) => {
          const base = '.squircle.rounded';
          const name = 'DEFAULT' === key ? base : `${base}-${key}`;
          acc[name] = { '--squircle-radius': value };
          return acc;
        },
        {},
      );
      const border = Object.entries(theme('borderWidth')).reduce(
        (acc, [key, value]) => {
          const base = '.squircle.border';
          const name = 'DEFAULT' === key ? base : `${base}-${key}`;
          acc[name] = {
            border: 'none',
            position: 'relative',
            '&>*': {
              position: 'relative',
              'z-index': 1,
            },
            '&:after': {
              content: "''",
              position: 'absolute',
              top: '0',
              left: '0',
              width: '100%',
              height: '100%',
              mask: 'paint(squircle)',
              '--squircle-outline': value,
            },
          };
          return acc;
        },
        {},
      );
      const borderColor = Object.entries(theme('borderColor')).reduce(
        (acc, [key, value]) => {
          const base = '.squircle.border';
          const colors = Object.entries(value);
          if ('DEFAULT' === key) {
            acc['.squircle'] = { '&:after': { background: value } };
          } else {
            colors.forEach(([shade, color]) => {
              const name = `${base}-${key}-${shade}`;
              acc[name] = { '&:after': { background: color } };
            });
          }
          return acc;
        },
        {},
      );
      addUtilities({
        // Constant values
        '.squircle': {
          '--squircle-smooth': '1',
          'mask-image': 'paint(squircle)',
        },
      });
      addUtilities(shape, ['responsive']);
      addUtilities(border, ['responsive']);
      addUtilities(borderColor, ['responsive']);
    }),
  ],
};
