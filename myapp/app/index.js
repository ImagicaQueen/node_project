const express = require('express');
// const fileupload = require('express-fileupload');

const app = express();
const route = require('./routes');

app.use(express.json());
// app.use(fileupload());

app.use('/', route);

module.exports = app;
