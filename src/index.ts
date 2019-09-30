import { GraphQLServer } from 'graphql-yoga';
import { createConnection, getRepository } from 'typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as passport from 'passport';
import schema from './schema';
import { User } from './entities/User';

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

server.use((req, res, next) => {
  passport.authenticate('jwt', { sessions: false }, (error, user) => {
    if (user) {
      console.log(user);
    }
    next();
  })(req, res, next);
});
passport.use(new Strategy(jwtOptions, verifyUser));

createConnection()
  .then(() => {
    server.start(() => console.log('Server is running on localhost:4000'));
  })
  .catch(e => {
    console.error(e);
  });
