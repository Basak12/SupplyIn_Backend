import mysql, { QueryError } from 'mysql2';

export const createConnection = () => {
    const connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });

    connection.connect((err: QueryError | null) => {
        if (err) {
            console.error('Database connection failed:', err.stack, err);
            return;
        }
        console.log('Connected to the database.');
    });

    return connection;
};

