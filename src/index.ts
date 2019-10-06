import { GraphQLServer } from 'graphql-yoga';
import { createConnection } from 'typeorm';
import schema from './schema';
import { passportMiddleware } from './passport';
import { getVideoPath } from './libs/VideoLibs';

import * as fs from 'fs';

const server = new GraphQLServer({ schema });

server.use(passportMiddleware);

createConnection()
  .then(() => {
    server.start(() => console.log('Server is running on localhost:4000'));
  })
  .catch(e => {
    console.error(e);
  });
