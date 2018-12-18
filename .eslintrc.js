module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": ['airbnb-base', 'eslint:recommended'],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [

    ],
    "rules": {
        'no-debugger': process.env.ENV === 'production' ? 'error' : 'off',
        'no-console': process.env.ENV === 'production' ? 'error' : 'off',
        "indent": [
            "error",
            "tab"
        ],
        "import/no-dynamic-require": "off",
        "no-unused-vars": "off",
        'import/no-extraneous-dependencies': "off",
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
    },
    "globals": {
    "NEVCONFIG": false,
    }
};
