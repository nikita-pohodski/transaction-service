const tsParser = require('@typescript-eslint/parser');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const prettierPlugin = require('eslint-plugin-prettier');

module.exports = [
  {
    files: ['src/**/*.ts', 'apps/**/*.ts', 'libs/**/*.ts', 'test/**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: 'tsconfig.json',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      ...prettierPlugin.configs.recommended.rules,
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      semi: ['error', 'always'],
      'eol-last': ['error', 'always'],
      'no-unused-expressions': 'error',
      'no-var': 'error',
      'no-eval': 'error',
      'no-fallthrough': 'error',
      'no-implicit-globals': 'off',
      'no-new-func': 'error',
      'no-new-wrappers': 'error',
      'no-return-await': 'error',
      'no-self-assign': ['error', { props: true }],
      'no-self-compare': 'error',
      'no-sequences': 'error',
      'no-throw-literal': 'error',
      'no-unmodified-loop-condition': 'off',
      'no-useless-catch': 'error',
      'no-useless-concat': 'error',
      'no-useless-escape': 'error',
      'no-useless-return': 'error',
      'no-void': 'error',
      yoda: 'error',
      'no-buffer-constructor': 'error',
      'no-process-env': 'off',
      'no-process-exit': 'off',
      'for-direction': 'error',
      'no-console': 'error',
      'no-empty': 'error',
      'no-extra-boolean-cast': 'error',
      'no-unreachable': 'error',
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
  },
];
