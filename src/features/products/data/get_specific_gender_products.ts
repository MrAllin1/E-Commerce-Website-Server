
import connection from '../../../database';

const getSpecificGenderProduct = (gender: string) => {
    return new Promise((resolve, reject) => {

        console.log('genderr', `${gender}`);
        connection.query(`
        call get_specific_gender_products('${gender}');
    `
            , (error: string, results: string) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            });
    });
};
export default getSpecificGenderProduct;
