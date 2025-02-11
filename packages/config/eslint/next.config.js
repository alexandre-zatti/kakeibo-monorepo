import baseConfig from "./base.config.js";
import nextPlugin from "@next/eslint-plugin-next";

export default [
    ...baseConfig,
    {
        files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
        plugins: {
            "@next/next": nextPlugin, // Use the plugin module directly
        },
        rules: nextPlugin.configs.recommended.rules,
    }
]

