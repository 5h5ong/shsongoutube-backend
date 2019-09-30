import { getRepository } from 'typeorm';
import { User } from '../../../entities/User';

export default {
  Query: {
    login: async (_, { email, secretKey }) => {
      // email 유효 검증
      const user = await getRepository(User).findOne({ email });
      if (user) {
        // To Do: secret 생성
        // To Do: login 검증
      } else {
        return false;
      }
    }
  }
};
