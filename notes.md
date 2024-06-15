1. TypeScript
Solution implemented in main.ts . Unit tests added to __tests__ folder

2. Amazon DynamoDB
Implemented in src/aws.
Schema for metadata table is in the setup.ts file.
Examples on how to insert and query the table data are in the index.ts file, where I created a class which uses the SDK. I created this class so that I could reuse in 3. Due to not having an AWS account, I wasn't able to test these methods.

3. GraphQL
Implemented in src/apollo-graphql. I chose apollo due to its convenient browser playground where the schema is
viewable. To run the server, you will need to run the following:
- npm install
- npm run build
- npm run start:graphql

Then the playground will be available at http://localhost:4000/, where you will be able to inspect the schema and generate example queries to fetch data based on URL, page title, word count and a date range. There is also a mutation to insert new data relative to a web page's crawl data. Each query will call the correspondent method in src/aws/index.ts.
Again, this API will not be fully functional as AWS credentials were not setup.
