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
        // lazy relation을 이용해 relations가 필요없음
        const foundUser = await getRepository(User).findOne({
          where: { id: user.id }
        });
        const files = await foundUser.files;
        // if foundFile exists inside files, remove it.
        // else, add foundFile inside files.
        if (files.find(file => file.id === videoId)) {
          foundUser.files = Promise.resolve(
            files.filter(file => file.id !== videoId)
          );
        } else {
          foundUser.files = Promise.resolve([...files, foundFile]);
        }
        foundUser.save();
      } catch (e) {
        console.log(e);
        return false;
      } finally {
        return true;
      }
    }
  }
};
