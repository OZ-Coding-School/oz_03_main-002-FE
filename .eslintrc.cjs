module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'airbnb-base',
    'plugin:react/recommended',
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript/base',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json', 'tsconfig.app.json', '/tsconfig.node.json'],
    ecmaVersion: 'latest',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    'react/react-in-jsx-scope': 'off', // JSX 스코프 규칙 비활성화
    'react/function-component-definition': [
      2,
      { namedComponents: 'arrow-function' },
    ],
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        // assert 설정 값 either | both -> 명시적으로 연결되거나 자식에 포함되면 됨 | 명시적으로 연결되고 동시에 자식으로 폼 컨트롤을 포함해야함
        assert: 'either',
        depth: 25,
      },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          'vite.config.ts',
          'postcss.config.js',
          'tailwind.config.js',
        ],
      },
    ],
  },
};
