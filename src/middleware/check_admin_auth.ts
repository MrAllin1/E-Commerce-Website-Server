const jwt = require('jsonwebtoken');
import dotenv from 'dotenv';
dotenv.config({ path: '../../../.env' });

const admin_auth = (req: any, res: any, next: any) => {
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
        const adminJwtKey: string = process.env.adminJwtKey || 'oqyfqudzrpykbwsqrzvblhtdfpqphmqz';
        console.log("adminJwtKey:", adminJwtKey);
        const decoded = jwt.verify(token, adminJwtKey);
        console.log("Token verified");
        // Add the decoded user information to the request for later use.
        req.user = decoded;
        next(); // Pass control to the next middleware.
    } catch (error) {
        // If token verification fails, send an error response.
        return res.status(401).json({
            errors: [
                {
                    msg: "You don't have permission to access this route.",
                }
            ]
        });
    }
};

export default admin_auth;