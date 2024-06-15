import { DataSource } from 'apollo-datasource';
import CrawlMetadataService from '../../aws/dynamodb/index.js';
import { WebPageMetadata } from '../graphql-types/index.js';

export class WebPageCrawlMetadataDataSource extends DataSource {

    private service: CrawlMetadataService;

    constructor(service: CrawlMetadataService) {
        super();
        this.service = service;
    }

    async insertPageMetadata(input: WebPageMetadata): Promise<WebPageMetadata> {
        const insertedDoc = await this.service.insertCrawlMetadata({
            PK: input.url,
            SK: input.crawlDate,
            PageTitle: input.pageTitle,
            WordCount: input.wordCount
        });

        return {
            crawlDate: insertedDoc.SK,
            pageTitle: insertedDoc.PageTitle,
            url: insertedDoc.PK,
            wordCount: insertedDoc.WordCount
        }
    }

    async getWebPageMetadataByUrl(url: string): Promise<WebPageMetadata> {
        const data = await this.service.queryByUrl(url);
        return {
            crawlDate: data.SK,
            pageTitle: data.PageTitle,
            url: data.PK,
            wordCount: data.WordCount
        }
    }

    async getWebPageMetadataByTitle(title: string): Promise<WebPageMetadata[]> {
        const data = await this.service.queryByTitle(title);
        return data.map((item) => {
            return {
                crawlDate: item.SK,
                pageTitle: item.PageTitle,
                url: item.PK,
                wordCount: item.WordCount
            }
        });
    }

    getWebPageMetadataByDateRange(startDate: string, endDate: string): Promise<WebPageMetadata[]> {
        const data = this.service.queryByDateRange(startDate, endDate);
        return data.then((data) => {
            return data.map((item) => {
                return {
                    crawlDate: item.SK,
                    pageTitle: item.PageTitle,
                    url: item.PK,
                    wordCount: item.WordCount
                }
            });
        });
    }

    getWebPageMetadataByWordCount(wordCount: number): Promise<WebPageMetadata[]> {
        const data = this.service.queryByCount(wordCount);
        return data.then((data) => {
            return data.map((item) => {
                return {
                    crawlDate: item.SK,
                    pageTitle: item.PageTitle,
                    url: item.PK,
                    wordCount: item.WordCount
                }
            });
        });
    }
}