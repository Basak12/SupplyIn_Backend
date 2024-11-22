import { Router } from 'express';
import { createConnection } from '../../db';

const router = Router();

// @ts-ignore
router.get('/supplier', async (req, res) => {
    const connection = createConnection();
    const db = connection.promise();
    const { productId } = req.query;

    if (!productId) {
        return res.status(400).json({ error: 'Product ID is required.' });
    }

    try {
        const query = `
            SELECT s.SID, s.SupplierName, s.ContactInfo, p.ProID, p.Name AS ProductName, p.Price, p.Warranty, p.SafetyReg, p.Reliability, p.EstDeliveryDate
            FROM Supplier s
            JOIN Product p ON s.SID = p.SID
            WHERE p.ProID = ?
        `;
        const [suppliers] = await db.execute(query, [productId]);

        //if (suppliers.length === 0) {
          //  return res.status(404).json({ error: 'No suppliers found for the selected product.' });
        //}

        res.status(200).json(suppliers);
    } catch (error) {
        console.error('Error fetching suppliers:', error);
        res.status(500).json({ error: 'Failed to fetch suppliers.' });
    }
});

export default router;
