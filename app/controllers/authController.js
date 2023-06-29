import passport from "passport";
import User from '../models/user.js'

const authController = {

    //User Registration 
    register: async (req, res,) => {
        try {
            const {fullname, email, password } = req.body

            const user = await User.findOne({email})
            if(user) return res.status(409).json({message: "User already exists"})

            user = new User({
                fullname,
                email,
                password
            })

            user.save()
            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Registration failed' });
        }
    },

    // User Login
    login: async (req, res, next) => {
        passport.authenticate('local', {session: false}, (err, user) => {
            if(err || !user) {
                return res.status(401).json({message: 'User not logged in or does not exist'})
            }
            req.login(user, {session: false}, async(err)=>{
                if(err) return res.status(500).json({message: 'Login failed'})
            })

            const token = generateJWT()

            res.json({token})
        })(req, res, next);
    }

}

export default authController

