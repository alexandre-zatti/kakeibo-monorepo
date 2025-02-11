import baseConfig from "./base.config.js";

export default [
    ...baseConfig,
    {
        files: ["**/*.ts", "**/*.js"],
        rules: {
            "@typescript-eslint/no-floating-promises": "warn",
        }
    }
]

