import { getRepository } from 'typeorm';
import { File } from '../../../entities/File';
import { User } from '../../../entities/User';

export default {
  Mutation: {
    likeVideo: async (_, { videoId }, { request }) => {
      const { user } = request;
      // TODO: get video id and attach the user table
      // get video from id
      try {
        const foundFile = await getRepository(File).findOne(videoId);
        // get user from id and connect users inside user table
        const foundUser = await getRepository(User).findOne(user.id);
        foundUser.files = [...foundUser.files, foundFile];
      } catch (e) {
        console.log(e);
        return false;
      }
      return true;
    }
  }
};
