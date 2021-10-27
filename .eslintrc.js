const path = require('path');
const fs = require('fs');

const prettierOptions = JSON.parse(
  fs.readFileSync(path.join(__dirname, '.prettierrc'), 'utf8'),
);

module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: ['airbnb-base', 'prettier'],
  plugins: ['prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    'prettier/prettier': ['error', prettierOptions],
    camelcase: 0,
  },
};
