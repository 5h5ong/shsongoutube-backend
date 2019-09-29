import { getRepository } from 'typeorm';
import { User } from '../../../entities/User';

export default {
  Query: {
    getUser: (_, { id }) => {
      return getRepository(User).findOne(id);
    }
  }
};
