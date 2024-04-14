import express from 'express';
import signUpRouter from './features/authentication/routes/sign_up';
import logInRouter from './features/authentication/routes/log_in';
import allOffersRouter from './features/offers/routes/all_offers';
import allProductsRouter from './features/products/routes/all_products';
import insertProductRouter from './features/products/routes/insert_product';

const app = express();

const port = 3000;

app.use(express.json());

app.use('/signUp', signUpRouter);
app.use('/logIn', logInRouter);
app.use('/offers', allOffersRouter);
app.use('/products', allProductsRouter);
app.use('/insertProduct', insertProductRouter);

app.listen(port, () => {
    console.log(`Server is running on url http://localhost:${port}`);
})