'use strict';

const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';
const GREETING = process.env.greeting || 'Hello';
const NAME = process.env.name || 'Ken';
const TEST = process.env.TEST || 'nothinghere';

// App
const app = express();
app.get('/', (req, res) => {
  res.send(GREETING + ' ' + NAME + '' + TEST + '\n');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
