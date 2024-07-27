module.exports = {
  env: { node: true, es2020: true },
  extends: [
    'eslint:recommended',
    './node_modules/gts/',
    'plugin:prettier/recommended',
  ],
  plugins: ['jsdoc'],
  rules: {
    'n/no-extraneous-require': 0,
    'n/no-unsupported-features/es-syntax': ['error', { version: '>=12.0.0' }],
    'no-undef': 0,
    'jsdoc/require-jsdoc': 1,
    'jsdoc/require-param': 1,
    'jsdoc/require-param-description': 1,
    'jsdoc/require-param-name': 1,
    'jsdoc/require-param-type': 1,
    'prettier/prettier': ['error', { endOfLine: 'auto', singleQuote: true }],
    indent: ['error', 2],
  },
  overrides: [
    {
      files: ['*.js', '*.jsx', '*.cjs'],
      rules: {
        'jsdoc/require-returns': 1,
        'jsdoc/require-returns-check': 1,
        'jsdoc/require-returns-type': 1,
      },
    },
  ],
};
