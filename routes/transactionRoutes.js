import express from 'express';
import { getTransactions, addTransaction, deleteTransaction } from '../controllers/transactionControllers.js';

const router = express.Router();

// router.get('/',(req,res)=>res.send('Hello from routes'));
router.route('/').get(getTransactions).post(addTransaction);
router.route('/:id').delete(deleteTransaction);

export default router;