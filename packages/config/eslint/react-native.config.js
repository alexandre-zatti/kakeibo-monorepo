import baseConfig from "./base.config.js";
import reactNativePlugin from "eslint-plugin-react-native"
import reactPlugin from "eslint-plugin-react"

export default {
    ...baseConfig,
    plugins: {
        ...baseConfig.plugins,
        "react-native": reactNativePlugin,
        "react": reactPlugin,
    },
    rules: {
        ...baseConfig.rules,
        ...reactPlugin.configs.recommended.rules,
        ...reactNativePlugin.configs.all.rules,
        "react/react-in-jsx-scope": "off",
    },
}
