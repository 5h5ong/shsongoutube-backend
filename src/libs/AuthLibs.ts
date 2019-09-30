import { nouns, adjectives } from './sentenceContainer';
import { User } from '../entities/User';
import { getRepository } from 'typeorm';
import * as jwt from 'jsonwebtoken';

const makeNewSecret = () => {
  const nounsRandom: number = Math.floor(Math.random() * nouns.length);
  const adjectivesRandom: number = Math.floor(
    Math.random() * adjectives.length
  );
  return `${adjectives[adjectivesRandom]} ${nouns[nounsRandom]}`;
};

export const changeSecret = async (id: number) => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne(id);
  user.secret = makeNewSecret();
  await userRepository.save(user);
};

export const makeJwtToken = (payload: any) => {
  const secret = 'fsihsajhk238913r818f4u';
  const token = jwt.sign({ id: payload }, secret);
  return token;
};
