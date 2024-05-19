import connection from '../../../database';

const getSpecificUserBuyHistory = (userId: string) => {

    return new Promise((resolve, reject) => {
        connection.query(
            `CALL get_user_buy_history('${userId}')`,
            (error: string, results: string) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            }
        );
    });
};
export default getSpecificUserBuyHistory;
