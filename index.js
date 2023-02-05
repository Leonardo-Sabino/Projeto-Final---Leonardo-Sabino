const express = require("express");
const graphqlHTTP = require("express-graphql");
const mongoose = require("mongoose");
const cors = require("cors");

const tripSchema = require("./graphql/schema");
const tripResolvers = require("./graphql/resolvers");

const app = express();

app.use(cors());

mongoose
  .connect("mongodb://mongodb:27017/trips", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error(err));

app.use(
  "/graphql",
  graphqlHTTP({
    schema: tripSchema,
    rootValue: tripResolvers,
    graphiql: true
  })
);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));