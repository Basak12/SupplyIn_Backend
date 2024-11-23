import express, { Request, Response, Router } from 'express';
import {createConnection} from "../../db";
const router = Router();


router.get('/product', (req, res) => {
    const connection = createConnection();
    connection.query('SELECT * FROM product', (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Database error' });
            console.log('Error fetching users:', err);
        } else {
            res.json(results);
        }
    });
    connection.end();
});


export default router;
