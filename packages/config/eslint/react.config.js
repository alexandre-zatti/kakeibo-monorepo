import baseConfig from "./base.config.js";
import reactPlugin from "eslint-plugin-react"
import reactHooksPlugin from "eslint-plugin-react-hooks"
import jsxA11yPlugin from "eslint-plugin-jsx-a11y"

export default [
    baseConfig,
    {
        files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
        languageOptions: {
            parserOptions: {
                jsx: true,
            }
        },
        plugins: {
            'react': reactPlugin,
            'react-hooks': reactHooksPlugin,
            'jsx-a11y': jsxA11yPlugin
        },
        settings: {
            react: {
                version: 'detect',
            }
        },
        rules: {
            ...reactPlugin.configs.recommended.rules,
            ...reactHooksPlugin.configs.recommended.rules,
            ...jsxA11yPlugin.configs.recommended.rules,
            "react/react-in-jsx-scope": "off"
        },
    }
]

