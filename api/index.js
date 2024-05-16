const express = require('express');
const cors = require('cors');
const Transaction = require('./models/Transaction.js');
const { default: mongoose } = require('mongoose');
const app = express();

require('dotenv').config();

app.use(cors());
app.use(express.json());

app.get('/api/test', (req , res) => {  
  res.json({ message: 'Hello from the server!' })
});

app.post('/api/transaction',async(req , res) => {
  await mongoose.connect(process.env.MONGO_URL);
  const { name, datetime, description,price } = req.body;
  const transaction = await Transaction.create({ name, datetime, description,price });
  res.json(transaction);
});

app.get('/api/transactions', async(req , res) => {
  await mongoose.connect(process.env.MONGO_URL);
  const transactions = await Transaction.find();
  res.json(transactions);
});

app.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});