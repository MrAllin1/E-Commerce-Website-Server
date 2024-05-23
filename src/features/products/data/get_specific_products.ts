import connection from '../../../database';

const getSpecificProducts = (productIDs: number[]) => {
    return new Promise((resolve, reject) => {
        const productIDsString = productIDs.join(',');
        connection.query(`
            CALL get_specific_products('${productIDsString}');
        `, (error: Error | null, results: any[]) => {
            if (error) {
                console.log
                reject(error);
            } else {
                resolve(results[0]);
            }
        });
        console.log('Product IDsssss--------:', productIDsString);
    });
};
export default getSpecificProducts;