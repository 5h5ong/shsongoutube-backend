import { getRepository } from 'typeorm';
import { User } from '../../../entities/User';

export default {
  Query: {
    me: (_, __, { request }) => {
      const { user } = request;
      return getRepository(User).findOne(user.id);
    }
  }
};
