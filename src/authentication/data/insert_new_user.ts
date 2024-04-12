import connection from '../../database';

const insertNewUser = (username:string, email:string, hashedPassword:string) => {
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO Perdoruesi (Username, Email, Password) VALUES (?, ?, ?)', [username, email, hashedPassword], async  (error:any, results:any,) => {
        if (error) {
            reject(false); // Reject with false if there's an error
          }
          resolve(true); // Resolve with true if insertion is successful
  })});
};
export default insertNewUser;
