import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import colors from 'colors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import transactionRoutes from './routes/transactionRoutes.js';
import { connectDB } from './config/db.js';

dotenv.config();

// Handle ESM __dirname issue
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

connectDB();

const app = express();
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// API routes
app.use('/api/transactions', transactionRoutes);

// Serve frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, './client/build')));

app.get(/.*/, (req, res) =>
  res.sendFile(path.resolve(__dirname, './client/build', 'index.html'))
);
} else {
  app.get('/', (req, res) => res.send('Please set to production'));
}


const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);


