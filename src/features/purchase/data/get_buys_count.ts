import connection from '../../../database';

const getBuyCount = (productId: number): Promise<{ name?: string, purchase_count: number }> => {
    return new Promise((resolve, reject) => {
        connection.query(
            `CALL get_purchase_count(?)`,
            [productId],
            (error: string, results: any) => {
                if (error) {
                    reject(error);
                } else {
                    const { Name: name, purchase_count } = results[0][0];
                    resolve({ name, purchase_count });
                }
            }
        );
    });
};

export default getBuyCount;
