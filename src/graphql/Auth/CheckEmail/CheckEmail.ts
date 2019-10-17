import { getRepository } from 'typeorm';
import { User } from '../../../entities/User';
import { changeSecret, sendSecret } from '../../../libs/AuthLibs';

export default {
  Query: {
    checkEmail: async (_, { email }) => {
      // email 유효 검증
      try {
        const user = await getRepository(User).findOne({ email });
        if (user) {
          changeSecret(user.id);
          sendSecret(user.email, user.secret);
          return true;
        } else if (!user) {
          return false;
        }
      } catch (e) {
        throw new Error(e);
      }
    }
  }
};
