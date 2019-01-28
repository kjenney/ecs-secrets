'use strict';

const express = require('express');

// Constants
const PORT = 8081;
const HOST = '0.0.0.0';
// App
const app = express();
app.get('/', (req, res) => {
  res.json({"secret1": "value1","secret2": "value2"});
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
