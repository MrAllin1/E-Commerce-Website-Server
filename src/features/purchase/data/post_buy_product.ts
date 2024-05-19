import connection from '../../../database';

const postBuyProduct = (userId: number, productId: number, quantity: number, firstName: string, lastName: string, phoneNumber: string, email: string, address: string, city: string) => {

    return new Promise((resolve, reject) => {
        connection.query(
            `CALL buy_product('${userId}', '${productId}', '${quantity}', '${firstName}', '${lastName}', '${phoneNumber}', '${email}', '${address}', '${city}')`,
            (error: string, results: string) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            }
        );
    });
};
export default postBuyProduct;
