import { makeJwtToken } from '../../../libs/AuthLibs';
import { getRepository } from 'typeorm';
import { User } from '../../../entities/User';

export default {
  Query: {
    login: async (_, { email, secretKey }) => {
      const user = await getRepository(User).findOne({ email });
      if (user.secret === secretKey) {
        const token = makeJwtToken(user.id);
        console.log(token);
      } else {
        throw new Error('인증할 수 없습니다. 다시 시도해주세요.');
      }
    }
  }
};
