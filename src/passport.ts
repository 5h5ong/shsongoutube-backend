import * as passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { getRepository } from 'typeorm';
import { User } from './entities/User';

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

passport.use(new Strategy(jwtOptions, verifyUser));

export const passportMiddleware = (req, res, next) => {
  passport.authenticate('jwt', { sessions: false }, (error, user) => {
    if (user) {
      req.user = user;
    }
    next();
  })(req, res, next);
};
