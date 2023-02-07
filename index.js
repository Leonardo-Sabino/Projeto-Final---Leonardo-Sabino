import express from "express"

import { graphqlHTTP } from "express-graphql"
import { connectionDataBase } from './db/db.js'
import { schema } from './schema.js'

const app = express()

connectionDataBase()

app.use(express.json())

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  }),
)

app.listen(8005, () => console.log("Servidor rodando na porta 8005"))
