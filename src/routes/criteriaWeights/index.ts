import { Router } from 'express';
import {createConnection} from "../../db";
const router = Router();

// @ts-ignore
router.post('/criteriaWeight', async (req, res) => {
    console.log('criteriaWeight endpoint hit');
    const connection = createConnection();
    const db = connection.promise();

    const { ProID, ReliabilityScore, PriceScore, DeliveryTimeScore, WarrantyScore, ComplianceScore } = req.body;

    if (!ProID || ReliabilityScore == null || PriceScore == null || DeliveryTimeScore == null || WarrantyScore == null || ComplianceScore == null) {
        console.log('Missing fields:', req.body);
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        console.log('Received body:', req.body); // Gelen veri kontrol
        const query = `
            INSERT INTO CriteriaWeight (ProID, ReliabilityScore, PriceScore, DeliveryTimeScore, WarrantyScore, ComplianceScore) VALUES (?, ?, ?, ?, ?, ?)
        `;
        await db.execute(query, [
            ProID,
            ReliabilityScore,
            PriceScore,
            DeliveryTimeScore,
            WarrantyScore,
            ComplianceScore,
        ]);
        res.status(201).json({ message: 'Criteria weight added successfully.' });
    } catch (error) {
        console.error('Error adding criteria weight:', error);
        res.status(500).json({ error: `Failed to save weights. ${error}` });
    }
});

router.get('/criteriaWeight', (req, res) => {
    const connection = createConnection();
    connection.query('SELECT * FROM criteriaWeight', (err, results) => {
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
