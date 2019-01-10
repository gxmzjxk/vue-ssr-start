module.exports = {
    root: true,
    parserOptions: {
        parser: 'babel-eslint'
    },
    env: {
        'browser': true,
        'commonjs': true,
        'es6': true,
        'node': true
    },
    extends: [
        // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
        // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
        'plugin:vue/essential',
        // https://github.com/standard/standard/blob/master/docs/RULES-en.md
        'eslint:recommended'
    ],
    rules: {
        // 基础检查，项目基本要求
        'indent': [
            'off',
            'tab'
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'always'
        ],
        'no-extra-boolean-cast': 0, // 禁止 !!
        'no-useless-escape': 0, // 禁止多余的转义符号
        'no-unused-vars': 1,
        'vue/no-unused-vars': 1,
        'no-console': 0,
        'generator-star-spacing': 0,
        'no-dupe-keys': 2,
        // 风格化
        'vars-on-top': 1,
        'no-empty': 1,
        'no-cond-assign': 2,
        'no-dupe-args': 2,// 函数的参数不能重复
        'eqeqeq': 1,
        'semi-spacing': [1, { 'before': false, 'after': true }],// 分号前后空格
        'keyword-spacing': [1, {
            'before': true,
            'after': true,
        }],
        'key-spacing': [1, { 'mode': 'strict' }]
    },
    plugins: [
        'vue'
    ],
    globals: {
        M_SPORTS: false,
        Vue: false
    }
};