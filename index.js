// Installed
require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Local
const commentsRouter = require('./routes/api/comments');

mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${
    process.env.DB_HOST
  }/message-board?retryWrites=true`,
  { useNewUrlParser: true }
);

const app = express();

// app.get('/', (req, res) => {
//   res.sendfile(path.join(__dirname, 'public', 'index.html'));
// });

// cors middleware
app.use(cors());

// logger middleware
// app.use(logger);

// body parser middleware
// For json body reading
app.use(express.json());
// For url form data
app.use(express.urlencoded({ extended: false }));

// static middleware
app.use(express.static(path.join(__dirname, 'public')));

// routing
app.use('/api/comments', commentsRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
