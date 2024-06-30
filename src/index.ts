import express from 'express';
import cors from 'cors';
import signUpRouter from './features/authentication/routes/sign_up';
import logInRouter from './features/authentication/routes/log_in';
import allOffersRouter from './features/offers/routes/all_offers';
import allProductsRouter from './features/products/routes/all_products';
import insertProductRouter from './features/products/routes/insert_product';
import uploadImage from './features/uploadImages/upload_image';
import admin_auth from './middleware/check_admin_auth';
import user_auth from './middleware/check_auth';
import listOfProducts from './features/products/routes/list_of_products';
import specificProduct from './features/products/routes/specific_product';
import specificGenderProduct from './features/products/routes/specific_gender_products';
import delteProductRouter from './features/products/routes/delete_product';
import buyProduct from './features/purchase/routes/buy_a_product';
import buyHistoryUser from './features/purchase/routes/user_buy_history';
import adminBuyHistory from './features/purchase/routes/admin_buy_history';
import markAsComplete from './features/purchase/routes/markAsCompleted';
import markAsCanceled from './features/purchase/routes/markAsCanceled';
import review from "./features/products/routes/review_product"
import removeOffer from "./features/offers/routes/remove_offers"
import addOffer from './features/offers/routes/add_offer';
import sendEmail from './features/purchase/routes/send_email';
import cancelEmail from './features/purchase/routes/send_cancel_email';


const app = express();


const port = 3001;

app.use(express.json());
app.use(cors())

app.use('/signUp', signUpRouter);
app.use('/logIn', logInRouter);
app.use('/offers', allOffersRouter);
app.use('/removeOffer', removeOffer);
app.use("/addOffer", addOffer);
app.use('/products', allProductsRouter);
app.use('/insertProduct', admin_auth, insertProductRouter);
app.use('/specificProduct', specificProduct);
app.use('/specificGenderProducts', specificGenderProduct);
app.use('/productList', listOfProducts);
app.use('/deleteProduct', delteProductRouter)
app.use('/upload', admin_auth, uploadImage);
app.use('/buyProduct', user_auth, buyProduct);
app.use('/buyHistoryUser', user_auth, buyHistoryUser);
app.use('/buyHistoryAdmin', admin_auth, adminBuyHistory);
app.use('/markFinished', admin_auth, markAsComplete);
app.use('/markCanceled', user_auth, markAsCanceled);
app.use('/sendEmail', user_auth, sendEmail);
app.use('/sendCancelEmail', user_auth, cancelEmail);
app.use("/", review)



app.listen(port, () => {
    console.log(`Server is running on url http://localhost:${port}`);
})