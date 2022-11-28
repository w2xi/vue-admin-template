module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'space-before-blocks': 'off',
    semi: 'off',
    'no-trailing-spaces': ['error', { skipBlankLines: true }],
    'eol-last': 'off',
    'no-trailing-spaces': 'off',
    'prefer-destructuring': 'off',
    'comma-dangle': 'off',
    'consistent-return': 'off',
  },
};
