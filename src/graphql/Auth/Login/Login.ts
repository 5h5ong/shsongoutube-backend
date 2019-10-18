import { makeJwtToken } from '../../../libs/AuthLibs';
import { getRepository } from 'typeorm';
import { User } from '../../../entities/User';

export default {
  Mutation: {
    login: async (_, { email, secretKey }) => {
      const user = await getRepository(User).findOne({ email });
      if (user.secret === secretKey) {
        const token = makeJwtToken(user.id);
        console.log(token);
        return token;
      } else {
        throw Error(
          'Secret Key 인증 과정에서 문제가 생겼습니다. 잠시 후 다시 시도해주세요.'
        );
      }
    }
  }
};
