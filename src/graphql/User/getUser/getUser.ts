import { getRepository } from 'typeorm';
import { User } from '../../../entities/User';

export default {
  Query: {
    getUser: async (_, { id }) => {
      const user = await getRepository(User).findOne(id);
      if (user) {
        return user;
      } else if (!user) {
        throw Error('해당 유저는 존재하지 않습니다.');
      }
    }
  }
};
