'use strict';

const express = require('express');
const fetch = require('node-fetch');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// Parse JSON
function showObject(json) {
  var obj = JSON.parse(json);
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    console.log(obj[keys[i]]);
  }
  return keys[0];
}

async function getSecrets() {
  process.env.TEST3 = 'test3';
  var secret_json = fetch('http://fakeservice:8081').then(res => res.json());
  return showObject(secret_json);
}

(async () => {
  const TEST1 = await getSecrets();

  // App
  const app = express();
  app.get('/', (req, res) => {
    res.send('my secrets are: ' + TEST1 + ' ' + process.env.TEST3 + '\n');
  });

  app.listen(PORT, HOST);
  console.log(`Running on http://${HOST}:${PORT}`);
})();
