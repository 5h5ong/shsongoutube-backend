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
        const foundUser = await getRepository(User).find({
          relations: ['files'],
          where: { id: user.id }
        });
        const firstUser = foundUser[0];
        if (!firstUser.files) {
          firstUser.files = [foundFile];
        } else {
          firstUser.files = [...firstUser.files, foundFile];
        }
        await firstUser.save();
      } catch (e) {
        console.log(e);
        return false;
      }
      return true;
    }
  }
};
