module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    // typescript
    'plugin:@typescript-eslint/recommended',
    // prettier
    'prettier',
    'plugin:prettier/recommended',
    // vue
    'plugin:vue/vue3-essential',
    // flyer 声明的全局配置
    './node_modules/@gly/flyer/src/storm-mini-program/.eslintrc.cjs',
  ],
  overrides: [],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parser: '@typescript-eslint/parser',
  },

  plugins: ['vue', '@typescript-eslint', 'prettier'],
  ignorePatterns: ['/public/**'],
  rules: {
    'vue/multi-word-component-names': 'off',
    'no-useless-escape': 'off',
    'no-this-alias': 'off',
    'no-empty-function': 1,
    '@typescript-eslint/no-empty-function': 1,
    '@typescript-eslint/ban-types': 1,
    'prefer-const': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
  globals: {
    // vue3 setup 的编译器语法糖
    defineProps: false,
    defineEmits: false,
    useAttrs: false,
    useSlots: false,
  },
};
