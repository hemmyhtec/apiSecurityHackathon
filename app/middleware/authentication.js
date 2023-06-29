import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";
import { jwtConfig } from "../../config/jwt.js";
import User from "../models/user.js";


// Local authentication strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: "email", 
      passwordField: "password",
    },
    async (email, password, done) => {
      try {

        //Find user
        const user = await User.findOne({ email });
        
        // If user not found or password does not match, return false
        if (!user || !(await user.comparePassword(password))) {
          return done(null, false);
        }

        // User and password match, return the user
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);


// JWT authentication strategy
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConfig.jwtSecret,
    },
    async (payload, done) => {
      try {
        const userId = payload.id;

        const user = await User.findById(userId);
        if (!user) return done(null, false);

        done(null, { userId: user._id });
      } catch (error) {

        done(error, false);
      }
    }
  )
);

const authenticate = passport.authenticate("jwt", { session: false });

export default authenticate;
