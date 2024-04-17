
import connection from '../../../database';

const getAllProducts = () => {
    return new Promise((resolve, reject) => {
        connection.query(`
        call get_all_products();
    `
            , (error: string, results: string) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            });
    });
};
export default getAllProducts;
