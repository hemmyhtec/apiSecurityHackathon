import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { jwtConfig } from "../../config/jwt.js";
import User from "../models/user.js";

passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtConfig.jwtSecret
}, async (payload, done)=> {
    try {
        const userId = payload.userId

        const user = await User.findById(userId);
        if(!user) return done(null, false)

        done(null, {userId: user._id})
    } catch (error) {
        done(error, false)
    }
}))

exports.authenticate = passport.authenticate('jwt', { session: false });