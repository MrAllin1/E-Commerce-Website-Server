import database from '../../../database';


export function insertProductImage(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
        database.query('INSERT INTO ProductImages SET ?', data, (error: any, results: any) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}
