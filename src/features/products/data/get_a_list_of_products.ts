import connection from '../../../database';

const getListOfProducts = (productIDs: number[]) => {
    const productIDList = productIDs.join(',');
    return new Promise((resolve, reject) => {
        connection.query(
            `CALL get_list_of_products('${productIDList}')`,
            (error: string, results: string) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            }
        );
    });
};
export default getListOfProducts;
