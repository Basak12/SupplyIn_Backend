import { Router } from 'express';
import { createConnection } from '../../db';

const router = Router();

// @ts-ignore

// @ts-ignore
router.get('/supplier', async (req, res) => {
    console.log('Incoming request to /supplier');
    console.log('Query params:', req.query);

    const connection = createConnection();
    const db = connection.promise();
    const { productId } = req.query;

    if (!productId) {
        return res.status(400).json({ error: 'Product ID is required.' });
    }

    try {
        const query = `
            SELECT s.SID, s.name AS SupplierName, s.contactInfo, p.ProID, p.name AS ProductName, sp.price, sp.warranty, sp.safetyReg, sp.reliability, sp.estDeliveryDate
            FROM Supplier s
            JOIN SupplierProduct sp ON s.SID = sp.SupplierID
            JOIN Product p ON sp.ProductID = p.ProID
            WHERE p.ProID = ?
        `;
        const [suppliers] = await db.execute(query, [productId]);

        // @ts-ignore
        if (suppliers.length === 0) {
            return res.status(404).json({ error: 'No suppliers found for the selected product.' });
        }

        // Sonuçları başarılı bir şekilde döndürüyoruz
        res.status(200).json(suppliers);

    } catch (error) {
        console.error('Error fetching suppliers:', error);
        res.status(500).json({ error: 'Failed to fetch suppliers.' });
    }
});

router.get('/supplier/all', async (req, res) => {
    const connection = createConnection();
    const db = connection.promise();

    try {
        const query = `
            SELECT SID, name, contactInfo FROM Supplier
        `;
        const [supplier] = await db.execute(query);

        res.status(200).json(supplier);
    } catch (error) {
        console.error('Error fetching suppliers:', error);
        res.status(500).json({ error: 'Failed to fetch suppliers.' });
    }
});


export default router;
