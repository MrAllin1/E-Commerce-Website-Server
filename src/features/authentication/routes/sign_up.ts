import express, { Router, Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';
import getDoesUserExistData from '../data/does_user_exist_data';
import insertNewUser from '../data/insert_new_user';
import dotenv from 'dotenv';
dotenv.config({ path: '../../../.env' });
import { SignUpRequest, SignUpResponse } from '../../../types/sign_up';

const router: Router = express.Router();

router.post('/', [
  check('email', 'Please provide a valid email').isEmail(),
  check('username', 'Please provide a username').not().isEmpty(), // Check for the presence of the 'username' field
  check('password', 'Please provide a password that is greater than 5 characters').isLength({ min: 6 })
], async (req: Request<{}, {}, SignUpRequest>, res: Response<SignUpResponse>) => {
  const { username, email, password } = req.body;

  try {
    const doesUserExist: any = await getDoesUserExistData(email);

    if (doesUserExist.length > 0) {
      return res.status(400).json({ errors: [{ msg: "Email already in use" }] });
    }
  } catch (error) {
    return res.status(500).json({ errors: [{ msg: "Better luck in the next website" }] });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await insertNewUser(username, email, hashedPassword);
    const jwtKey: string = process.env.normalUserJwtKey || 'ajhhjkfgdsjhdgsajhkdgjhdsgjhjhkdasjhk';
    const token = JWT.sign({ email }, jwtKey, { expiresIn: 7200 });
    return res.json(
      {
        token: token,
        username: username,
        email: email
      }
    );
  }
  catch (error) {
    console.error("Error in signUp route:", error);
    return res.status(500).json({ errors: [{ msg: "Internal Server Error" }] });
  };
}
);
export default router;
