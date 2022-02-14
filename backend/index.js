require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const error = require('./src/middlewares/err');

const PORT = process.env.PORT || 3333;
const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['POST', 'GET', 'DELETE', 'PUT'],
  }),
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', require('./src/routers/router'));

app.use(error);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
