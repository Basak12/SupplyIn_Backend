import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/user';
import dotenv from 'dotenv';
import cors from 'cors';
import supplierRoutes from "./routes/suppliers";
import purchaseRoutes from "./routes/purchaseResults";
import criteriaWeightsRoutes from "./routes/criteriaWeights";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(bodyParser.json());
app.use('/api', userRoutes);
app.use('/api', supplierRoutes);
app.use('/api', purchaseRoutes);
app.use('/api', criteriaWeightsRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
