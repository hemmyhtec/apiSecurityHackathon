import dotenv from 'dotenv'
dotenv.config()

export const jwtConfig = {
  jwtSecret: process.env.SECRET_CODE,
  jwtExpiration: "1h",
};
