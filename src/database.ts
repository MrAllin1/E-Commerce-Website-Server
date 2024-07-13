// db.ts
import * as dotenv from 'dotenv';
import mysql from 'mysql';

dotenv.config();

const pool = mysql.createPool({
    connectionLimit: 100, // Adjust the connection limit as needed
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306, // Default MySQL port is 3306
});

pool.getConnection((error, connection) => {
    if (error) {
        if (error.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.');
        }
        if (error.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.');
        }
        if (error.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.');
        }
        console.error('Error connecting to the database:', error);
        return;
    }

    if (connection) connection.release();
    console.log('Connected to the MySQL database');
    return;
});

export default pool;
