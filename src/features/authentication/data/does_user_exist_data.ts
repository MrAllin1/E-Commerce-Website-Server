// userQueries.js

import connection from '../../../database';

const getDoesUserExistData = (email: string) => {
  return new Promise((resolve, reject) => {
    connection.query(`call check_if_user_exists(${email})`,
      async (error: string, results: string) => {
        if (error) {
          reject(error);
        }
        resolve(results);
      });
  });
};
export default getDoesUserExistData;
