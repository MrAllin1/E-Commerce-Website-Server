import express, { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';
const router: Router = express.Router();

import connection from '../../database'; // Assuming database.ts is in the same directory

interface IUser {
  email: string;
  password: string;
}

router.post('/', async (req: Request, res: Response) => {
  try {
    const { password, email } = req.body;

    // Query to check if user exists
    connection.query('SELECT * FROM Perdoruesi WHERE email = ?', [email], async (error:any, results:any, fields:any) => {
      if (error) {
        console.error("Error retrieving user:", error);
        return res.status(500).json({
          "errors": [
            {
              "msg": "Internal Server Error",
            }
          ]
        });
      }

      if (results.length === 0) {
        return res.status(400).json({
          "errors": [
            {
              "msg": "Invalid Credentials",
            }
          ]
        });
      }

      const user = results[0];
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
        token: token
      });
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
