import passport from "passport";
import User from "../models/user.js";

const authController = {
  //User Registration
  register: async (req, res) => {
    try {
      const { fullname, email, password } = req.body;

      const user = await User.findOne({ email });
      if (user) return res.status(409).json({ message: "User already exists" });

      const newUser = new User({
        fullname,
        email,
        password,
      });

      newUser.save();
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      res.status(500).json({ message: "Registration failed" });
    }
  },

  // User Login
  login: async (req, res, next) => {
    passport.authenticate("local", { session: false }, (err, user) => {
      if (err || !user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      req.login(user, { session: false }, async (err) => {
        if (err) return res.status(500).json({ message: "Login failed" });
      });

      const token = user.generateJWT();

      res.json({ 
      msg: "User is logged in",
      token 
      });
    })(req, res, next);
  },
};

export default authController;
