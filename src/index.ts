import { GraphQLServer } from 'graphql-yoga';
import { createConnection } from 'typeorm';
import schema from './schema';
import { passportMiddleware } from './passport';
import { getVideoPath } from './libs/VideoLibs';
import * as bodyParser from 'body-parser';

import * as fs from 'fs';

const server = new GraphQLServer({ schema });

// set body-parser
server.use(bodyParser.json());

server.use(passportMiddleware);
server.post('/video', (req, res, next) => {
  const { videoName } = req.body;
  const videoPath: string = getVideoPath(videoName);
  if (fs.existsSync(videoPath)) {
    const videoStream = fs.createReadStream(videoPath);
    videoStream.pipe(res);
  } else {
    res.status(404).send('파일 없다 ㅡㅡ');
  }
});

createConnection()
  .then(() => {
    server.start(() => console.log('Server is running on localhost:4000'));
  })
  .catch(e => {
    console.error(e);
  });
