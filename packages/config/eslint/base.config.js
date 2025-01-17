import tsPlugin from "@typescript-eslint/eslint-plugin";
import importPlugin from "eslint-plugin-import"
import tsParser from "@typescript-eslint/parser";

export default {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    languageOptions: {
        parser: tsParser
    },
    plugins: {
        "@typescript-eslint": tsPlugin,
        "import": importPlugin
    },
    rules: {
        ...tsPlugin.configs.recommended.rules,
        ...importPlugin.configs.recommended.rules
    },
}

