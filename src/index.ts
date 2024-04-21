import express from 'express';
import signUpRouter from './features/authentication/routes/sign_up';
import logInRouter from './features/authentication/routes/log_in';
import allOffersRouter from './features/offers/routes/all_offers';
import allProductsRouter from './features/products/routes/all_products';
import insertProductRouter from './features/products/routes/insert_product';
import uploadImage from './features/uploadImages/upload_image';
import admin_auth from './middleware/check_admin_auth';
const cors = require('cors');

const app = express();

const port = 3001;

app.use(express.json());
app.use(cors());


app.use('/signUp', signUpRouter);
app.use('/logIn', logInRouter);
app.use('/offers', allOffersRouter);
app.use('/products', allProductsRouter);
app.use('/insertProduct', insertProductRouter);
app.use('/upload', admin_auth, uploadImage);

app.listen(port, () => {
    console.log(`Server is running on url http://localhost:${port}`);
})