import * as passport from 'passport';

export const passportMiddleware = (req, res, next) => {
  passport.authenticate('jwt', { sessions: false }, (error, user) => {
    if (user) {
      console.log(user);
    }
    next();
  })(req, res, next);
};
