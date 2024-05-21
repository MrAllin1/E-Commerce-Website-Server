import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({ path: '../../../.env' });

const check_auth = (req: any, res: any, next: any) => {
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

        // Check if the role in the decoded payload is 'Administrator' or 'User'
        if (decoded.role !== 'Administrator' && decoded.role !== 'Shopper') {
            console.log(decoded.role);
            throw new Error("Invalid role in token");
        }

        req.user = decoded;
        next(); // Pass control to the next middleware.
    } catch (error) {
        return res.status(401).json({
            errors: [
                {
                    msg: "Invalid token or insufficient permissions",
                }
            ]
        });
    }
};

export default check_auth;
