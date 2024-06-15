import { DynamoDBClient, QueryCommand } from "@aws-sdk/client-dynamodb";
import { PutCommandInput, QueryCommandInput } from "@aws-sdk/lib-dynamodb";

import AWS from "aws-sdk";

type CrawlMetaItem = {
    PK: string,
    SK: string,
    PageTitle: string,
    WordCount: number
}

export default class CrawlMetadataService {
    private readonly tableName: string;
    private readonly ddbDocClient: DynamoDBClient;
    private readonly client: AWS.DynamoDB;

    constructor() {
        this.tableName = 'CrawlMetadata';
        this.client = new AWS.DynamoDB();
        this.ddbDocClient = new DynamoDBClient({ region: 'eu-east-2' });
    }

    private async runQuery(params: QueryCommandInput): Promise<CrawlMetaItem[]> {
        try {
            const data = await this.ddbDocClient.send(new QueryCommand(params));
            console.log("Query results:", data.Items);
            return data.Items as unknown as CrawlMetaItem[];
        } catch (err) {
            console.error("Error querying data:", err);
            throw err;
        }
    }

    async insertCrawlMetadata(item: CrawlMetaItem): Promise<CrawlMetaItem> {
        const params: PutCommandInput = {
            TableName: this.tableName,
            Item: item
        };

        try {
            return this.client.putItem(params).promise().then(data => {
                console.log("Data inserted:", data);
                return data.$response.data as unknown as CrawlMetaItem
            });
        } catch (err) {
            console.error("Error inserting data:", err);
            throw err;
        }
    }

    async queryByUrl(url: string): Promise<CrawlMetaItem> {
        const params: QueryCommandInput = {
            TableName: this.tableName,
            KeyConditionExpression: "PK = :url",
            ExpressionAttributeValues: {
                ":url": url
            }
        };

        return this.runQuery(params)[0];
    }

    async queryByCount(wordCount: number): Promise<CrawlMetaItem[]> {
        const params: QueryCommandInput = {
            TableName: "WebPageMetadata",
            IndexName: "WordCountIndex",
            KeyConditionExpression: "WordCount = :word_count",
            ExpressionAttributeValues: {
                ":word_count": wordCount
            }
        }

        return this.runQuery(params);
    }

    async queryByTitle(title: string): Promise<CrawlMetaItem[]> {
        const params: QueryCommandInput = {
            TableName: "WebPageMetadata",
            IndexName: "PageTitleIndex",
            KeyConditionExpression: "PageTitle = :title",
            ExpressionAttributeValues: {
                ":title": title
            }
        }

        return this.runQuery(params);
    }

    async queryByDateRange(startDate: string, endDate: string): Promise<CrawlMetaItem[]> {
        const params: QueryCommandInput = {
            TableName: "WebPageMetadata",
            KeyConditionExpression: "SK between :start_date and :end_date",
            ExpressionAttributeValues: {
                ":start_date": startDate,
                ":end_date": endDate
            }
        }

        return this.runQuery(params);
    }
}