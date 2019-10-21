import { getRepository } from 'typeorm';
import { User } from '../../entities/User';
export default {
  File: {
    isLiked: async (parent, __, { request }) => {
      const { user } = request;
      // user의 id로 User 안에 있는 files와 비교해서 일치 여부에 따라 true / false
      try {
        const foundUser = await getRepository(User).findOne({ id: user.id });
        const files = await foundUser.files;
        return Boolean(files.find(file => file.id === parent.id));
      } catch (e) {
        console.log(e);
      }
    }
  }
};
