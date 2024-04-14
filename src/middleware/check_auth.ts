const jwt = require('jsonwebtoken');
import dotenv from 'dotenv';
dotenv.config({ path: '../../../.env' });

const check_auth = (req: any, res: any, next: any) => {
    const token = req.header('Authorization');
    if (!token) {
        // If there's no token, send a response indicating the error.
        return res.status(401).json({
            errors: [
                {
                    msg: "No token found",
                }
            ]
        });
    }

    try {
        const normalUserJwtKey: string = process.env.normalUserJwtKey || 'ajhhjkfgdsjhdgsajhkdgjhdsgjhjhkdasjhk';
        const adminJwtKey: string = process.env.adminJwtKey || 'oqyfqudzrpykbwsqrzvblhtdfpqphmqz';

        const decoded = jwt.verify(token, normalUserJwtKey || adminJwtKey);
        console.log("Token verified");
        // Add the decoded user information to the request for later use.
        req.user = decoded;
        next(); // Pass control to the next middleware.
    } catch (error) {
        // If token verification fails, send an error response.
        return res.status(401).json({
            errors: [
                {
                    msg: "Invalid token",
                }
            ]
        });
    }
};

export default check_auth;