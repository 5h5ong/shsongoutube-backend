import { nouns, adjectives } from './sentenceContainer';
import { User } from '../entities/User';
import { getRepository } from 'typeorm';

const makeNewSecret = () => {
  const nounsRandom: number = Math.floor(Math.random() * nouns.length);
  const adjectivesRandom: number = Math.floor(
    Math.random() * adjectives.length
  );
  return `${adjectives[adjectivesRandom]} ${nouns[nounsRandom]}`;
};

export const changeSecret = () => {
  const user = new User();
  user.secret = makeNewSecret();
  getRepository(User).save(user);
};
