import { GraphQLServer } from 'graphql-yoga';
import { createConnection } from 'typeorm';
import schema from './schema';
import { passportMiddleware } from './passport';
import { getVideo } from './libs/VideoLibs';

const server = new GraphQLServer({ schema });

server.use(passportMiddleware);
server.post('/video', (req, res) => {
  const videoName = 'sample-video.mp4';
  const video = getVideo(videoName);
  res.sendFile(video, err => {
    if (err) {
      throw new Error('영상 전달에 실패하였습니다.');
    }
    console.log(`${videoName} 전달 성공.`);
  });
});

createConnection()
  .then(() => {
    server.start(() => console.log('Server is running on localhost:4000'));
  })
  .catch(e => {
    console.error(e);
  });
