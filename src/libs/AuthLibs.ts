import { getRepository } from 'typeorm';
import { nouns, adjectives } from './sentenceContainer';
import { User } from '../entities/User';
import * as nodemailer from 'nodemailer';
import * as mg from 'nodemailer-mailgun-transport';
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

export const sendSecret = (email: string, secret: string) => {
  const auth = {
    auth: {
      api_key: process.env.MAILGUN_API_KEY,
      domain: process.env.MAILGUN_DOMAIN
    }
  };
  // create mailgun transport and send secret key
  const mgTransport = nodemailer.createTransport(mg(auth));
  return mgTransport.sendMail(
    {
      from: 'admin@shsongoutube.com',
      to: email,
      subject: '로그인을 위한 Secret Key',
      html: `안녕하세요. 유저 분의 Secret Key는 다음과 같습니다. <br/>${secret}`
    },
    (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log(info);
      }
    }
  );
};

export const makeJwtToken = (payload: any) => {
  const token = jwt.sign({ id: payload }, process.env.SECRET_KEY);
  return token;
};
