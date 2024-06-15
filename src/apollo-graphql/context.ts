import { BaseContext } from "@apollo/server";
import { WebPageCrawlMetadataDataSource } from "./data-sources/webPageCrawlMeta.js";

export interface Context extends BaseContext {
    dataSources: {
        webPageCrawlMetadataDataSource: WebPageCrawlMetadataDataSource;
    };
}