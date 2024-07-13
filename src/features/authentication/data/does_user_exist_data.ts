// userQueries.js

import connection from '../../../database';

const getDoesUserExistData = (email: string) => {
  return new Promise((resolve, reject) => {
    connection.query(`call check_if_user_exists('${email}')`,
      async (error: any, results: any) => {
        if (error) {
          console.error("Error in getDoesUserExistData:", error);
          reject("Internal Server Error"); // Reject with a custom error message
        }

        if (!results || results.length === 0 || results[0].length === 0) {
          resolve(false); // Return false if results are empty
        }

        resolve(results);
      });
  });
};

export default getDoesUserExistData;
