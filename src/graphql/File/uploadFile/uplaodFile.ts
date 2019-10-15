import { File } from '../../../entities/File';
import { getRepository } from 'typeorm';

export default {
  Mutation: {
    uploadFile: (_, { url, filename, preview }) => {
      const file = new File();
      // set File Entity
      file.filename = filename;
      file.url = url;
      file.preview = preview;
      // File 반영
      const result = getRepository(File).save(file);
      if (!result) {
        return false;
      } else {
        return true;
      }
    }
  }
};
