import * as dotenv from 'dotenv';
const cloudinary = require('cloudinary').v2;
dotenv.config();

try {
    if (!process.env.CLOUD_NAME || !process.env.API_KEY || !process.env.API_SECRET) {
        throw new Error('Cloudinary configuration is missing required environment variables.');
    }

    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET
    });

    console.log('Cloudinary configuration successful:', {
        cloud_name: process.env.CLOUD_NAME,
        // api_key: process.env.API_KEY,
        // api_secret: process.env.API_SECRET
    });
} catch (error) {
    console.error('Failed to configure Cloudinary:', error);
    process.exit(1); // Exit the process with a failure code
}

export default cloudinary;
