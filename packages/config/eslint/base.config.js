import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
    eslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked, // This needs spread because different export style
    {
        plugins: {
            prettier: prettierPlugin,
        },
        rules: {
            ...prettierConfig.rules,
            'prettier/prettier': 'error',
        },
        languageOptions: {
            sourceType: 'module',
            parserOptions: {
                project: true,
            },
        },
    },
];