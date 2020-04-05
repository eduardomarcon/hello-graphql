const { GraphQLServer } = require("graphql-yoga");
const path = require("path");
const resolvers = require("./resolvers");
const mongoose = require("mongoose");

mongoose.connect("mongodb://mongo-graphql:27017/users", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const server = new GraphQLServer({
  typeDefs: path.resolve(__dirname, "schema.graphql"),
  resolvers
});
server.start();
