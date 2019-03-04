// Installed
require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');

// Local
const commentsRouter = require('./routes/api/comments');
const logger = require('./middleware/logger');

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
