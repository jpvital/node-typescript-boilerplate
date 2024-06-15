import CrawlMetadataService from "../../aws/dynamodb/index.js";
import { WebPageCrawlMetadataDataSource } from "./webPageCrawlMeta.js";

export const dataSourceConfig = {
    dataSources: {
        webPageCrawlMetadataDataSource: new WebPageCrawlMetadataDataSource(new CrawlMetadataService())
    }
}