import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { readFileSync } from 'fs';
import { Context } from './context.js';
import { dataSourceConfig } from './data-sources/config.js';
import { resolvers } from './resolvers/index.js';

const typeDefs = readFileSync('./src/apollo-graphql/schema/schema.graphql', { encoding: 'utf-8' });


const server = new ApolloServer<Context>({ typeDefs, resolvers });

(async (): Promise<void> =>
  await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async () => {
      return dataSourceConfig;
    }
  }).then(({ url }) => console.log(`Server ready at: ${url}`)))();