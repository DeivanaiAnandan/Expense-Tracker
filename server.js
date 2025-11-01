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

// ---------- ✅ Production setup ----------
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, 'client', 'build')));

//   app.get('/.*/', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//   });
// }
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

// import path from 'path';
// import express from "express";
// import colors from "colors";
// import morgan from "morgan";
// import dotenv from "dotenv";
// import transactionRoutes from "./routes/transactionRoutes.js";
// import { connectDB } from "./config/db.js";


// dotenv.config();
// //if we use a seperate folder structure like config/.env then we need to add path
// //dotenv.config({ path: './config/.env' });

// connectDB();

// const app = express();
// app.use(express.json());
// if(process.env.NODE_ENV === 'development'){
// app.use(morgan('dev'));
// }

// // app.get("/", (req, res) => res.send("Hello"));
// app.use("/api/transactions", transactionRoutes);
// //only below routes this line
// if(process.env.NODE_ENV === 'production') {
//   app.use(express.static('client/build'));

//   app.get('/*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
// }

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () =>
//   console.log(
//     `Server runnning in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
//       .bold
//   )
// );
