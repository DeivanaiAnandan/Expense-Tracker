import Transaction from '../models/TransactionModel.js'
// @desc    Get all transactions
// @route   GET /api/transactions
// @access  Public

export const getTransactions = async (req, res, next) => {
  // res.send("Get Transactions");
 try {
     const transactions = await Transaction.find();

     return res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions,
     })
 } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
 }

};

// @desc    Add transaction
// @route   POST /api/transaction
// @access  Public

export const addTransaction = async (req, res, next) => {
  // res.send("Add a Transaction");

  try {
        // If body is missing
    // if (!req.body) {
    //   return res.status(400).json({
    //     success: false,
    //     error: "Request body is missing",
    //   });
    // }

        const {text, amount} = req.body;

    // If required fields are missing
    // if (!text || !amount) {
    //   return res.status(400).json({
    //     success: false,
    //     error: "Please provide both text and amount fields",
    //   });
    // }

  
     const transaction = await Transaction.create(req.body);

     return res.status(201).json({
      success: true,
      data: transaction
     })
 } catch (error) {
    console.log("Error name:", error.name);
    console.log("Error object:", error);

    if(error.name === 'ValidationError') 
      {
      const messages = Object.values(error.errors).map(val => val.message);

      return res.status(400).json({
        success: false,
        error: messages
      });
    } else {
      return res.status(500).json({
        success: false,
        error: 'Server Error'
      });
    }
  }
}

// @desc    DELETE a transaction
// @route   DELETE /api/transactions/:id
// @access  Public

export const deleteTransaction = async (req, res, next) => {
  // res.send("Delete a Transactions");
  try {
    const transaction = await Transaction.findById(req.params.id);

    if(!transaction){
      return res.status(404).json({
        success: false,
        error: 'No transaction found'
      })
    }
    await transaction.deleteOne();

    return res.status(200).json({
      success: true,
      data:{}
    });

  } catch (error) {
    return res.status(500).json({
        success: false,
        error: 'Server Error'
      });
  }
};
