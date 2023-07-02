import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv'
dotenv.config()

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_API_KEY, 
    api_secret: process.env.CLOUD_API_SECRET 
  });

const uploadImageToCloudinary = (imageFile) => {
   return new Promise((resolve, reject) => {
    console.log(imageFile)
    cloudinary.uploader.upload(imageFile.tempFilePath, (error, result) => {
        if(error){
            reject(error)
        } else {
            resolve(result.secure_url)
        }
    })
   })
}


export default uploadImageToCloudinary
