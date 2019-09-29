import { GraphQLServer } from 'graphql-yoga';
import { createConnection } from 'typeorm';
import schema from './graphql/schema';

const server = new GraphQLServer({ schema });

createConnection()
  .then(() => {
    server.start(() => console.log('Server is running on localhost:4000'));
  })
  .catch(e => {
    console.error(e);
  });
