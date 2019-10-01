import { GraphQLServer } from 'graphql-yoga';
import { createConnection, getRepository } from 'typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as passport from 'passport';
import schema from './schema';
import { User } from './entities/User';
import { passportMiddleware } from './passport';

const server = new GraphQLServer({ schema });

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'fsihsajhk238913r818f4u'
};

const verifyUser = async (payload, done) => {
  const user = await getRepository(User).findOne(payload.id);
  if (user) {
    return done(null, user);
  } else return done(null, false);
};

server.use(passportMiddleware);

passport.use(new Strategy(jwtOptions, verifyUser));

createConnection()
  .then(() => {
    server.start(() => console.log('Server is running on localhost:4000'));
  })
  .catch(e => {
    console.error(e);
  });
