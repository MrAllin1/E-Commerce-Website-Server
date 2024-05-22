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

    if (!userExists || userExists.length === 0) {
      return res.status(400).json({
        "errors": [
          {
            "msg": "User Doesn't Exist",
          }
        ]
      });
    }

    const user = userExists[0];
    const savedPassword: string = user[0].Password;

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
      role: user[0].Role  // Include user's role in the JWT payload
    };

    const jwtKey: string = process.env.jwtKey || 'defaultKey';
    const expiresIn = isAdmin ? 3600 : 7200; // Admin token expires in 1 hour, user token expires in 30 minutes

    const token = JWT.sign(tokenPayload, jwtKey, {
      expiresIn: expiresIn // in seconds
    });

    res.json({
      username: user[0].Username,
      userId: user[0].UserID,
      email: user[0].Email,
      token: token,
      role: user[0].Role
    });

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
