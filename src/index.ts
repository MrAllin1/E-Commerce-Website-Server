import express from 'express';
import signUpRouter from './authentication/routes/sign_up';
import logInRouter from './authentication/routes/log_in';

const app = express();

const port = 3000;

app.use(express.json());

app.use('/signUp', signUpRouter);
app.use('/logIn', logInRouter);
app.listen(port,()=>{
    console.log(`Server is running on url http://localhost:${port}`);

})