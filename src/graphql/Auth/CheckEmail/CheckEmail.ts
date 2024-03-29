import { getRepository } from 'typeorm';
import { User } from '../../../entities/User';
import { changeSecret, sendSecret } from '../../../libs/AuthLibs';

export default {
  Mutation: {
    checkEmail: async (_, { email }) => {
      // email 유효 검증
      try {
        const user = await getRepository(User).findOne({ email });
        if (user) {
          const secret = await changeSecret(user.id);
          sendSecret(user.email, secret);
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
