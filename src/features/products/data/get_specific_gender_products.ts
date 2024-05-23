import connection from '../../../database';

const getSpecificGenderProduct = (gender: string, filters: string[] | undefined) => {
    const filtersList = filters ? filters.join(',') : [];
    console.log("blbblbblblblbl "+ filtersList)
    return new Promise((resolve, reject) => {
        connection.query(
            `CALL get_specific_gender_products('${gender}', '${filtersList}')`,
            (error: string, results: string) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            }
        );
    });
};

export default getSpecificGenderProduct;
