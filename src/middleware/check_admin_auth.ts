import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({ path: '../../../.env' });

const admin_auth = (req: any, res: any, next: any) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({
            errors: [
                {
                    msg: "No token found",
                }
            ]
        });
    }

    try {
        const jwtKey: string = process.env.jwtKey || 'defaultKey';
        const decoded: any = jwt.verify(token, jwtKey);
        // Check if the role in the decoded payload is 'Administrator'
        if (decoded.role !== 'Administrator') {
            throw new Error("User is not an administrator");
        }
        req.user = decoded;
        next(); // Pass control to the next middleware.
    } catch (error) {
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
