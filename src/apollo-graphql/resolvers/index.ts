import { Context } from '../context.js';
import { Resolvers } from '../graphql-types/index.js';

export const resolvers: Resolvers = {
  Query: {
    getPageMetadataByUrl: async (_, { url }, context: Context) => {
      return context.dataSources.webPageCrawlMetadataDataSource.getWebPageMetadataByUrl(url);
    },
    getPageMetadataByPageTitle: async (_, { title }, context: Context) => {
      return context.dataSources.webPageCrawlMetadataDataSource.getWebPageMetadataByTitle(title);
    },
    getPageMetadataByDateRange: async (_, { startDate, endDate }, context: Context) => {
      return context.dataSources.webPageCrawlMetadataDataSource.getWebPageMetadataByDateRange(startDate, endDate);
    },
  },

  Mutation: {
    insertPageMetadata: async (_, { input }, context: Context) => {
      return context.dataSources.webPageCrawlMetadataDataSource.insertPageMetadata(input);
    }
  }
};
