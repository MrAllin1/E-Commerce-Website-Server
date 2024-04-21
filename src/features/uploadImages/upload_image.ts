require('dotenv').config();
import express, { Router, Request, Response } from 'express';
const upload = require('../../multer');
const cloudinary = require('cloudinary').v2;
import { insertProductImage } from './data/insert_new_image';

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});
function uploadImages(req: express.Request, res: express.Response, next: express.NextFunction) {
    upload.array('images', 10)(req, res, (err: any) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        const images: Express.Multer.File[] = req.files as Express.Multer.File[]; // Explicitly define the type

        if (!images || images.length === 0) {
            return res.status(400).json({ error: 'No image files uploaded' });
        }

        const uploadPromises = images.map((image: Express.Multer.File) => {
            return new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream((error: any, result: any) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                }).end(image.buffer);
            });
        });

        Promise.all(uploadPromises)
            .then((results) => {
                const insertPromises = results.map((result: any) => {
                    const { public_id, url } = result;
                    const data = {
                        name: result.original_filename,
                        Type: result.format,
                        URL: url,
                        PublicID: public_id,
                        ProductID: req.body.product_id
                    };
                    return new Promise((resolve, reject) => {
                        insertProductImage(data)
                            .then((result: any) => {
                                resolve({ ...result, url }); // Include URL in resolve
                            })
                            .catch((error: any) => {
                                reject(error);
                            });
                    });
                });
                return Promise.all(insertPromises);
            })
            .then((insertResults) => {
                const uploadedUrls = insertResults.map((result: any) => result.url); // Extract URLs
                return res.status(200).json({ message: 'Images uploaded successfully', urls: uploadedUrls }); // Include URLs in response
            })
            .catch((error) => {
                return res.status(500).json({ error: error.message });
            });
    });
}
export default uploadImages;