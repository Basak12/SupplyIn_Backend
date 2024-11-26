import { Router } from 'express';
import { createConnection } from '../../db';

const router = Router();

router.post('/purchase', async (req, res) => {
    const connection = createConnection();
    const { productId, supplierId, supplierScore } = req.body;
    const db = connection.promise();

    try {
        const purchaseDate = new Date().toISOString().slice(0, 10);

        const query = `
            INSERT INTO Purchase (ProID, SID, purchaseDate, supplierScore) VALUES (?, ?, ?, ?)
        `;
        await db.execute(query, [productId, supplierId, purchaseDate, supplierScore]);

        res.status(201).json({ message: 'Purchase saved successfully.' });
    } catch (error) {
        console.error('Error saving purchase:', error);
        res.status(500).json({ error: 'Failed to save purchase.' });
    }
});

router.get('/purchase', (req, res) => {
    const connection = createConnection();
    connection.query('SELECT * FROM purchase', (err, results) => {
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
