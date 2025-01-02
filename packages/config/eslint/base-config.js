import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";

export default {
    files: ["*.ts", "*.tsx"],
    languageOptions: {
        parser: tsParser,
        parserOptions: {
            ecmaFeatures: {jsx: true},
            ecmaVersion: "latest",
            sourceType: "module",
        },
    },
    plugins: {
        "@typescript-eslint": tsPlugin,
    },
    rules: {},
}

