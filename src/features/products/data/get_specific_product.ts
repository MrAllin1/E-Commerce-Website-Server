
import connection from '../../../database';

const getSpecificProduct = (productID: number) => {
    return new Promise((resolve, reject) => {
        connection.query(`
        call get_specific_product(${productID});
    `
            , (error: string, results: string) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            });
    });
};
export default getSpecificProduct;
