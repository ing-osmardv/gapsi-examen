const { buildSchema } = require("graphql");

const schema = buildSchema(`
  type Provider {
    id: ID!
    name: String!
    companyName: String!
    address: String!
    createdAt: String!
  }

  type PaginatedProviders {
    items: [Provider!]!
    total: Int!
    page: Int!
    limit: Int!
    totalPages: Int!
  }

  type MutationResult {
    success: Boolean!
  }

  type Query {
    providers(page: Int = 1, limit: Int = 10): PaginatedProviders!
  }

  type Mutation {
    createProvider(
      name: String!
      companyName: String!
      address: String!
    ): Provider!
    deleteProvider(id: ID!): MutationResult!
  }
`);

module.exports = schema;
