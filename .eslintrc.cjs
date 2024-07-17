module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "airbnb-base",
    "plugin:react/recommended",
    "airbnb",
    "airbnb/hooks",
    "airbnb-typescript/base",
    "plugin:prettier/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["tsconfig.app.json", "./tsconfig.json", "/tsconfig.node.json"],
    ecmaVersiont: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["react", "@typescript-eslint", "prettier"],
  rules: {
    "react/jsx-filename-extension": ["warn", { extensions: [".tsx"] }],
  },
};
