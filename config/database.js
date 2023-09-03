import dotenv from 'dotenv'
dotenv.config()

import mongoose from "mongoose"
// import logger from '../log/logger.js'

const connUri = process.env.DATABASE_URL


const connectDB = async() => {
    mongoose.Promise = global.Promise
    mongoose.set('strictQuery', false)
    mongoose.connect(connUri, {useNewUrlParser: true, useUnifiedTopology: true })

    const connection = mongoose.connection
    connection.once('open', ()=> console.log('MongoDB --- Dabase Connection Established Successfully!') )

    connection.on('error', (err) => {
        console.log('MongoDB --- Connection error. please try again' + err)
        process.exit();
    })

}

export default connectDB;