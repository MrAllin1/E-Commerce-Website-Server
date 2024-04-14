// userQueries.js

import connection from '../../../database';

const getDoesUserExistData = (email: string) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM Perdoruesi WHERE Email = ?', [email], (error: string, results: string) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  });
};
export default getDoesUserExistData;
