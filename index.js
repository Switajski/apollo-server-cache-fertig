const { ApolloServer, gql } = require("apollo-server");
const SwapiDataSource = require("./SwapiDataSource");

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    films: [Film]
  }
  type Film {
    title: String
    characters: [Character]
  }
  type Character {
    name: String
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    films: (parent, args, context) =>
      context.dataSources.swapi
        .get("/films/") //
        .then(r => r.results)
  },
  Film: {
    characters: (parent, args, context) => {
      return parent.characters.map(url => context.dataSources.swapi.get(url));
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      swapi: new SwapiDataSource()
    };
  }
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
