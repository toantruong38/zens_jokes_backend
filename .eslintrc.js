module.exports = {
  env: {
    node: true,
    commonjs: true,
    es6: true,
  },
  extends: "eslint:recommended",
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    "no-console": "off",
    "no-unused-vars": "warn",
  },
};
