module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    'plugin:import/typescript',
    "plugin:react-hooks/recommended",
    'prettier',
    'plugin:prettier/recommended',
    "@feature-sliced",
    "plugin:@conarti/feature-sliced/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  settings: {
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],

    'prettier/prettier': [2],

    '@typescript-eslint/no-explicit-any': [2],

    'import/order': [
      2,
      {
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        'newlines-between': 'always-and-inside-groups',
      },
    ],

    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: 'react',
            importNames: ['default'],
            message: "Dont use 'import React from 'react''.",
          },
        ],
      },
    ],

    'no-console': [1],
    'no-empty': [2],
    'no-empty-pattern': [2],
    'no-multiple-empty-lines': [2, { max: 1 }],
    'max-lines': [1, { max: 100 }],
  },
};
