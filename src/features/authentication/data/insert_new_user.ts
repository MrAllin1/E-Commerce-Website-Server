import connection from '../../../database';

const insertNewUser = (username: string, email: string, hashedPassword: string) => {
  return new Promise((resolve, reject) => {
    connection.query(`call register_user('${username}','${email}','${hashedPassword}')`,
      async (error: any, results: any,) => {
        if (error) {
          reject(error); // Reject with the error object
        } else {
          resolve(true); // Resolve with true if insertion is successful
        }
      })
  });
};

export default insertNewUser;
