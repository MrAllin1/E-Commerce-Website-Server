import connection from '../../../database';

const getBuyCount = (productId: number): Promise<{ name: string, purchase_count: number }> => {
    return new Promise((resolve, reject) => {
        connection.query(
            `CALL get_purchase_count(?)`,
            [productId],
            (error: any, results: any) => {
                if (error) {
                    reject(error);
                } else if (results && results[0] && results[0][0]) {
                    const { Name: name, purchase_count } = results[0][0];
                    resolve({ name, purchase_count });
                } else {
                    // Handle the case where no results are returned
                    resolve({ name: '', purchase_count: 0 });
                }
            }
        );
    });
};

export default getBuyCount;
