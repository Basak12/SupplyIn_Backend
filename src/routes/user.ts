import { Router } from 'express';
import {createConnection} from "../db";

const router = Router();

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

// Create a user (statik veriler eklemek için kullanılabilir)
/*
router.post('/users', (req, res) => {
    const { name, email } = req.body;
    users.push({ id: users.length + 1, name, email });
    res.status(201).send('Kullanıcı oluşturuldu');
});
 */

export default router;
