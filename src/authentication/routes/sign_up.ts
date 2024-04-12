import express, { Router, Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';
import getDoesUserExistData from '../data/does_user_exist_data';
import insertNewUser from '../data/insert_new_user';
import dotenv from 'dotenv';
dotenv.config({ path: '../../../.env' });


const router: Router = express.Router();

router.post('/', [
  check('email', 'Please provide a valid email').isEmail(),
  check('username', 'Please provide a username').not().isEmpty(), // Check for the presence of the 'username' field
  check('password', 'Please provide a password that is greater than 5 characters').isLength({ min: 6 })
], async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  // Check if username field is present
  if (!username) {
    return res.status(400).json({ errors: [{ msg: "Username is required" }] });
  }

  // Check input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Check if user exists
  try {
    const doesUserExist:any=await getDoesUserExistData(email);
    if (doesUserExist.length > 0) {
        return res.status(400).json({ errors: [{ msg: "Username already exists" }] });
    }
      const hashedPassword = await bcrypt.hash(password, 10);
      const isUserAdded:any=insertNewUser(username,email,hashedPassword);
      if (isUserAdded) {
        const jwtKey: string = process.env.jwtKey || ''; 
        const token = JWT.sign({ email }, jwtKey, { expiresIn: 3600000 });
  
        console.log('Hashed password:', hashedPassword);
  
        return res.json({ token });
      } else {
        // Handle case where user insertion failed
        return res.status(500).json({ errors: [{ msg: "Failed to add user" }] });
      }
    }
   catch (error) {
    console.error("Error in signUp route:", error);
    res.status(500).json({ errors: [{ msg: "Internal Server Error" }] });
  }
});
export default router;
