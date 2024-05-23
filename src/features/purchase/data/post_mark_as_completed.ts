import connection from '../../../database';

const postMarkAsComplete = (purchaseId: string) => {

    return new Promise((resolve, reject) => {
        connection.query(
            `CALL update_status_to_completed('${purchaseId}')`,
            (error: string, results: string) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            }
        );
    });
};
export default postMarkAsComplete;
