module.exports = {
  root: true,
  extends: "@react-native-community",
  env: {
    browser: true,
    node: false,
    es6: true,
    jest: true,
    jquery: false,
  },
  "parser": "babel-eslint",
  "parserOptions": {
      "ecmaVersion": 6,
      "sourceType": "module",
      "ecmaFeatures": {
        "arrowFunctions": true,
        "binaryLiterals": true,
        "blockBindings": true,
        "classes": true,
        "defaultParams": true,
        "destructuring": true,
        "forOf": true,
        "generators": true,
        "modules": true,
        "objectLiteralComputedProperties": true,
        "objectLiteralDuplicateProperties": true,
        "objectLiteralShorthandMethods": true,
        "objectLiteralShorthandProperties": true,
        "octalLiterals": true,
        "regexUFlag": true,
        "regexYFlag": true,
        "spread": true,
        "superInFunctions": true,
        "templateStrings": true,
        "unicodeCodePointEscapes": true,
        "globalReturn": true,
        "jsx": true,
        "experimentalObjectRestSpread": true,
        "legacyDecorators": true
      }
  },
  "plugins": [
      "react"
  ],
  "rules": {
    "strict": 0,
    "no-whitespace-before-property": 2,
    "no-unused-vars": 1,
    "react/prop-types": 0,
    "react/jsx-key": 1,
    "react/react-in-jsx-scope": 0,
    "react/display-name": 0,
    "no-unreachable": 1,
    "use-isnan": 1,
    "dot-notation": 1,
    "eqeqeq": 2,
    "no-extra-bind": 2,
    "no-empty-function": 1
  }
};
