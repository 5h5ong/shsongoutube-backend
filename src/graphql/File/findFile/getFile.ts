import { getRepository } from 'typeorm';
import { File } from '../../../entities/File';

export default {
  Query: {
    getFile: async (_, { id }) => {
      const file = await getRepository(File).findOne({ id });
      if (file) {
        return file;
      } else if (!file) {
        throw Error('해당 파일은 존재하지 않습니다.');
      }
    }
  }
};
