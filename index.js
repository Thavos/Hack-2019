const express = require('express');
const PORT = process.env.PORT || 5000;

express()
  .get('/', (req, res) => res.send('Home Page'))
  .get('/get', (req, res) => res.send('get'))
  .post('/post', (req, res => res.secure('post')))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));


////////////////////DATASETS

  var fs = require('fs');

  function readJSONFile(filename, callback) {
    fs.readFile(filename, function (err, data) {
      if(err) {
        callback(err);
        return;
      }
      try {
        callback(null, JSON.parse(data));
      } catch(exception) {
        callback(exception);
      }
    });
  }

  readJSONFile('../../data.json', function (err, json) {
    if(err) { throw err; }
    console.log(json);
  });