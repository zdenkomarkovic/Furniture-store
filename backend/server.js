const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const dbUrl = require('./config/configDb');

app.use(cors());

mongoose
  .connect(dbUrl)
  .then(() => console.log('MongoDb connected'))
  .catch(err => console.log(err));

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '10mb' }));

app.use('/', require('./routes'));

app.listen('4000', () => {
  console.log('Server running...');
});
