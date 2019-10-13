import { getRepository } from 'typeorm';
import { File } from '../../../entities/File';
export default {
  Query: {
    getAllFile: async () => {
      const file = await getRepository(File).find();
      return file;
    }
  }
};
