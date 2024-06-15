import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    schema: "./schema/schema.graphql",
    generates: {
        "./graphql-types/index.ts": {
            plugins: ["typescript", "typescript-resolvers"],
        },
    },
};

export default config;