import dotenv from 'dotenv';
dotenv.config({ path: '../../../../.env' });

import express, { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';
const router: Router = express.Router();

import { LogInRequest, LogInResponse } from '../../../types/log_in';
import getDoesUserExistData from '../data/does_user_exist_data';

router.post('/', async (req: Request<LogInRequest>, res: Response<LogInResponse>) => {
  try {
    const { password, email } = req.body;

    // Query to check if user exists
    const userExists: any = await getDoesUserExistData(email);

    const doesUserExist: any = await getDoesUserExistData(email);
    if (doesUserExist === false) {
      return res.status(400).json({
        "errors": [
          {
            "msg": "User Doesnt Exist",
          }
        ]
      });

    } else if (doesUserExist.length > 0) {
      const user = userExists[0];

      console.log("User:", user);

      const savedPassword: string = user[0].Password;
      console.log("Saved password:", savedPassword);
      console.log('Password:', password);
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
      const isAdmin = user[0].Role === 'Administrator';

      const tokenPayload = {
        email: email,
        isAdmin: isAdmin
      };
      const normalUserJwtKey: string = process.env.normalUserJwtKey || 'ajhhjkfgdsjhdgsajhkdgjhdsgjhjhkdasjhk';
      const adminJwtKey: string = process.env.adminJwtKey || 'oqyfqudzrpykbwsqrzvblhtdfpqphmqz';
      console.log("isAdmin:", isAdmin);
      console.log("normalUserJwtKey:", normalUserJwtKey);
      console.log("adminJwtKey:", adminJwtKey);


      const secretKey = isAdmin ? adminJwtKey : normalUserJwtKey;
      const expiresIn = isAdmin ? 3600 : 7200; // Admin token expires in 1 hour, user token expires in 30 minutes

      const token = JWT.sign(tokenPayload, secretKey, {
        expiresIn: expiresIn // in seconds
      });

      res.json({
        username: user.Username,
        email: user.Email,
        token: token
      });
    }


  } catch (error) {
    console.error("Error in login route:", error);
    res.status(500).json({
      "errors": [
        {
          "msg": "Better luck next time!",
        }
      ]
    });
  }
});

export default router;
