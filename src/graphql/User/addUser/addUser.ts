import { getRepository } from 'typeorm';
import { User } from '../../../entities/User';

export default {
  Mutation: {
    addUser: (_, { username, email }) => {
      const user = new User();
      user.username = username;
      user.email = email;
      return getRepository(User).save(user);
    }
  }
};
