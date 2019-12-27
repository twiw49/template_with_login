module.exports = {
  env: {
    browser: true,
    commonjs: true,
    node: true,
    es6: true
  },
  extends: [
    'airbnb',
    'prettier',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended'
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true
    },
    sourceType: 'module'
  },
  plugins: ['react', 'prettier'],
  rules: {
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'linebreak-style': ['error', 'unix'],
    'prettier/prettier': 'error',
    'no-unused-vars': ['warn', { vars: 'all', args: 'none', ignoreRestSiblings: false }],
    'no-console': 'off',
    'no-undef': 'off',
    'no-underscore-dangle': ['error', { allow: ['_id', '_json', '_profile'] }],
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/no-autofocus': 0,
    'jsx-a11y/anchor-is-valid': [
      2,
      {
        components: ['Link'],
        specialLink: ['to', 'hrefLeft', 'hrefRight'],
        aspects: ['noHref', 'invalidHref', 'preferButton']
      }
    ],
    'react/no-array-index-key': 0,
    'react/no-did-mount-set-state': 0,
    'react/require-default-props': 0,
    'react/display-name': 0,
    'react/forbid-prop-types': 0,
    'react/prefer-stateless-function': 0,
    'import/prefer-default-export': 0
  }
};
