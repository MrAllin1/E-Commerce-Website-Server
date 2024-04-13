import express, { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';
const router: Router = express.Router();
import connection from '../../database'; 
import { LogInRequest,LogInResponse } from '../../types/log_in';
import getDoesUserExistData from '../data/does_user_exist_data';

router.post('/', async (req: Request<LogInRequest>, res: Response<LogInResponse>) => {
  try {
    const { password, email } = req.body;

    // Query to check if user exists
      const userExists:any = await getDoesUserExistData(email);    
      console.log("User exists:", userExists);
      const user = userExists[0];
      console.log("User:", user);
      const savedPassword:string = user.Password;
      // Check password
      const isMatch = await bcrypt.compare(password, savedPassword);

      if (!isMatch) {
        return res.status(400).json({
          "errors": [
            {
              "msg": "Invalid Credentials",
            }
          ]
        });
      }

      // Sign JWT token
      const token = JWT.sign({
        email: email
      }, "ajhhjkfgdsjhdgsajhkdgjhdsgjhjhkdasjhk", {
        expiresIn: 3600 // in seconds
      });

      res.json({
        username: user.Username,
        email: user.Email,
        token: token
      });
  } catch (error) {
    console.error("Error in login route:", error);
    res.status(500).json({
      "errors": [
        {
          "msg": "Internal Server Error",
        }
      ]
    });
  }
});

export default router;
