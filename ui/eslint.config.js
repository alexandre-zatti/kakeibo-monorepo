import nextEslintConfig from '../packages/config/eslint/next.config.js'

export default {
    ...nextEslintConfig,
    settings: {
        'import/resolver': {
            typescript: {}
        }
    }
}