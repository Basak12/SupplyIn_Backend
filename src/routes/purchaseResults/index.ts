import { Router } from 'express';
import {createConnection} from "../../db";
const router = Router();
router.post('/purchaseResults', async (req, res) => {
    const connection = createConnection();
    const { productId, supplierId, score } = req.body;
    const db = connection.promise();
    try {
        const query = `
            INSERT INTO TOPSISResults (ProID, SID, Score) VALUES (?, ?, ?)
        `;
        await db.execute(query, [productId, supplierId, score]);
        res.status(201).json({ message: 'Result saved successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save TOPSIS result.' });
    }
});

export default router;
