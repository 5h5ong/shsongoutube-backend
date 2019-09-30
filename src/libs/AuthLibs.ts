import { nouns, adjectives } from './sentenceContainer';

export const makeNewSecret = () => {
  const nounsRandom: number = Math.floor(Math.random() * nouns.length);
  const adjectivesRandom: number = Math.floor(
    Math.random() * adjectives.length
  );
  return `${adjectives[adjectivesRandom]}${nouns[nounsRandom]}`;
};
