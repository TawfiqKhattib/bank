const mongoose=require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    amount: Number,
    category:String,
    color:Boolean,
    vendor:String
})

const transaction = mongoose.model("tranactions",transactionSchema);

module.exports = transaction;