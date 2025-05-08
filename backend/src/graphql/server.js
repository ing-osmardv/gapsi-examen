const { graphqlHTTP } = require("express-graphql");
const schema = require("./schemas/provider.schema");
const resolvers = require("./resolvers/provider.resolver");

module.exports = graphqlHTTP({
  schema: schema,
  rootValue: resolvers,
  graphiql: true,
  customFormatErrorFn: (error) => ({
    message: error.message,
    path: error.path,
  }),
});

