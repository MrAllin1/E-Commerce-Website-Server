import connection from '../../../database';

const getAdminBuyHistory = () => {

    return new Promise((resolve, reject) => {
        connection.query(
            `CALL get_admin_buy_history()`,
            (error: string, results: string) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            }
        );
    });
};
export default getAdminBuyHistory;
