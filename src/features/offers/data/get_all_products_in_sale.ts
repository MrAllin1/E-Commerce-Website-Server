
import connection from '../../../database';

const getAllProductsOnSale = () => {
    return new Promise((resolve, reject) => {
        connection.query(`
        call get_all_products_in_sale();
        `
            , (error: string, results: string) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            });
    });
};
export default getAllProductsOnSale;
