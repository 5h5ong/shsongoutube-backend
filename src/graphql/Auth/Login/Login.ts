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
        return true;
      } else {
        return false;
      }
    }
  }
};
