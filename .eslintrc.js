module.exports = {
    root: true,
    env: {
        node: true
    },
    'extends': [
        'plugin:vue/essential',
        'eslint:recommended',
        '@vue/standard'
    ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'vue/script-indent': ['error', 4],
        'indent': ['error', 4],
        'no-tabs': 0,
        'no-mixed-spaces-and-tabs': [2, 'smart-tabs']
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
}
