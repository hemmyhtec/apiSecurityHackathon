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

        // Check if the token has expired
        const currentTime = Date.now() / 1000;
        if (payload.exp < currentTime) {
          return done(null, false, { message: 'Token has expired' });
        }

        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
          return done(null, false, { message: 'User not found' });
        }

        done(null, { userId: user._id });
      } catch (error) {
        done(error, false);
      }
    }
  )
);


const authenticate = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) {
      return res.status(500).json({
        error: "Internal server error",
        message: err.message,
      });
    }

    if (!user) {
      if (info && info.message === "Token has expired") {
        return res.status(401).json({ message: "Token has expired" });
      } else {
        return res.status(401).json({ message: "Unauthorized" });
      }
    }

    req.user = user;
    next();
  })(req, res, next);
};


export default authenticate;
