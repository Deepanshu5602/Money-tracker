const { Schema, model } = require("mongoose");

const transactionSchema = new Schema({
  name: {type: String, required: true},
  price: {type: Number, required: true},
  datetime: {type: Date, required: true},
  description: {type: String},
});

const TransactionModel = model("Transaction", transactionSchema);

module.exports = TransactionModel;
  