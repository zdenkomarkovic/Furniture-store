const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const { DB_URL, PORT, CORS_OPTIONS } = require('./config/configDb');

app.use(cors(CORS_OPTIONS));

mongoose
  .connect(DB_URL)
  .then(() => console.log('MongoDb connected'))
  .catch(err => console.log(err));

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '10mb' }));

app.get('/', (req, res) => {
  res.send('Welcome to Furniture store - its work');
});

app.use('/', require('./routes'));

app.listen(PORT, () => {
  console.log('Server running...');
});
