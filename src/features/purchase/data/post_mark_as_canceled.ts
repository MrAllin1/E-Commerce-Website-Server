import connection from '../../../database';

const postMarkAsCanceled = (purchaseId: string) => {

    return new Promise((resolve, reject) => {
        connection.query(
            `CALL update_status_to_canceled('${purchaseId}')`,
            (error: string, results: string) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            }
        );
    });
};
export default postMarkAsCanceled;
