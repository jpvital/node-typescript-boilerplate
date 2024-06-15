import { CreateTableCommand, CreateTableCommandInput, DynamoDBClient } from "@aws-sdk/client-dynamodb";

// NOTE: I did not have the structure for a dynamodb table memorized off the top of my head,
// so I referred to https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/SQLtoNoSQL.CreateTable.html#SQLtoNoSQL.CreateTable.DynamoDB for this script.

const client = new DynamoDBClient({ region: "eu-east-2" });

const createMetadataTable = async (): Promise<void> => {
    const params: CreateTableCommandInput = {
        TableName: "CrawlMetadata",
        KeySchema: [
            { AttributeName: "PK", KeyType: "HASH" }, // Partition key (Page URL)
            { AttributeName: "SK", KeyType: "RANGE" } // Sort key (Date)
        ],
        AttributeDefinitions: [
            { AttributeName: "PK", AttributeType: "S" },
            { AttributeName: "SK", AttributeType: "S" },
            { AttributeName: "PageTitle", AttributeType: "S" },
            { AttributeName: "WordCount", AttributeType: "N" }
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5
        },
        GlobalSecondaryIndexes: [
            {
                IndexName: "PageTitleIndex",
                KeySchema: [
                    { AttributeName: "PageTitle", KeyType: "HASH" }
                ],
                Projection: {
                    ProjectionType: "ALL"
                },
                ProvisionedThroughput: {
                    ReadCapacityUnits: 5,
                    WriteCapacityUnits: 5
                }
            },
            {
                IndexName: "WordCountIndex",
                KeySchema: [
                    { AttributeName: "WordCount", KeyType: "HASH" }
                ],
                Projection: {
                    ProjectionType: "ALL"
                },
                ProvisionedThroughput: {
                    ReadCapacityUnits: 5,
                    WriteCapacityUnits: 5
                }
            }
        ]
    };

    try {
        const data = await client.send(new CreateTableCommand(params));
        console.log("Table created:", data);
    } catch (err) {
        console.error("Error creating table:", err);
    }
};

createMetadataTable();