import { getRepository } from 'typeorm';
import { File } from '../../../entities/File';

export default {
  Query: {
    getFile: async (_, { filename }) => {
      const file = await getRepository(File).findOne({ filename });
      if (file) {
        return file;
      } else if (!file) {
        throw Error('해당 파일은 존재하지 않습니다.');
      }
    }
  }
};
