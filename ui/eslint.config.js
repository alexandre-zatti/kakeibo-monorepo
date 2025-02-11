import nextEslintConfig from "@groceries-monorepo/config/eslint/next.config.js";

export default [
    ...nextEslintConfig,
    {
        ignores: ["eslint.config.js"],
    }
]
