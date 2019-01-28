'use strict';

const express = require('express');
const fetch = require('node-fetch');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

function showObject(obj) {
  var result = "";
  for (var p in obj) {
    if( obj.hasOwnProperty(p) ) {
      result += p + " , " + obj[p] + "\n";
    }
  }
  return result;
}

async function getSecrets() {
  process.env.TEST3 = 'test3';
  var secret_json = fetch('http://fakeservice:8081').then(res => res.json());
  return showObject(secret_json);
}

(async () => {
  const TEST1 = await getSecrets();
  //const TEST2 = process.env.TEST2
  // App
  const app = express();
  app.get('/', (req, res) => {
    res.send('my secrets are: ' + TEST1 + ' ' + process.env.TEST3 + '\n');
  });

  app.listen(PORT, HOST);
  console.log(`Running on http://${HOST}:${PORT}`);
})();
