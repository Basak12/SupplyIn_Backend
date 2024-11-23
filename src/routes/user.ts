import express, { Request, Response, Router } from 'express';
import {createConnection} from "../db";
const router = Router();

interface UserRequestBody {
    name: string;
    surname: string;
    email: string;
    password: string;
}

router.get('/users', (req, res) => {
    const connection = createConnection();
    connection.query('SELECT * FROM users', (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Database error' });
            console.log('Error fetching users:', err);
        } else {
            res.json(results);
        }
    });
    connection.end();
});

router.post('/users', async (req: Request<{}, {}, UserRequestBody>, res: Response) => {
    const { name, surname, email, password } = req.body;

    console.log(' req.body', req.body);
    const connection = createConnection();
    connection.query('SHOW TABLES', (err, results) => {
        if (err) {
            console.error('Error fetching tables:', err);
        } else {
            console.log('Tables in database:', results);
        }
    });
    const db = connection.promise();

    try {
        const query = `
        INSERT INTO Users (name, surname, email, password) VALUES (?, ?, ?, ?)
    `;
        await db.execute(query, [name, surname, email, password]);
        res.status(201).json({ message: 'User created successfully.' });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: `Failed to create user. ${error}` });
    } finally {
        connection.end();
    }
});

export default router;
