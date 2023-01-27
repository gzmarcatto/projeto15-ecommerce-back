import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import authRoutes from './routes/auth.routes.js';
import productsRoutes from './routes/products.routes.js';

const server = express();

server.use(express.json());
server.use(cors());

server.use([authRoutes, productsRoutes])

server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    });