import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
    text:{
        type:String,
        trim:true,
        required: [true, 'Please add some text']
    },
    amount:{
        type: Number,
        required: [true, 'Please add some number']
    },
},

{
        timestamps: true,
    });

export default mongoose.model('Transaction',TransactionSchema)