import connection from '../../../database';

const getSpecificGenderProduct = (gender: string, filters: string[] | undefined) => {
    const filtersList = filters ? filters.join(',') : []; // If filters is undefined, set it to null
    return new Promise((resolve, reject) => {
        console.log('gender', gender);
        console.log('filters', filtersList);

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
