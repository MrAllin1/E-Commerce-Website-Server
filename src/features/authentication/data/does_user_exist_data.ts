// userQueries.js

import connection from '../../../database';

const getDoesUserExistData = (email: string) => {
  return new Promise((resolve, reject) => {
    connection.query(`call check_if_user_exists('${email}')`,
      async (error: string, results: string) => {
        if (error) {
          reject(error);
        }

        console.log(email, 'email');
        console.log(results, 'results');
        
        if (results.length === 0 || results[0].length === 0) {
          resolve(false); // Return false if results are empty
        }

        resolve(results);
      });
  });
};
export default getDoesUserExistData;
