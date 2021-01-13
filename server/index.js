require('dotenv').config();
const express = require('express'),
      { graphqlHTTP } = require('express-graphql'),
      schema = require('./schema'),
      { SERVER_PORT } = process.env,
      app = express();

app.use(
    '/graphql',
    graphqlHTTP({
        schema,
        graphiql: true
    })
)

app.listen(SERVER_PORT, () => console.log(`Gotta catch em all on port ${SERVER_PORT}`))