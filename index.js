const express = require('express');
const PORT = process.env.PORT || 5000;


////////////////////DATASETS//////

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

///////////////////////////////

express()
  .get('/', (req, res) => res.send('Home Page'))
  .get('/get', function(req, res){
    readJSONFile('https://egov.presov.sk/Default.aspx?NavigationState=778:0::plac1889:_144153_5_8', function (err, json) {
      if(err) { throw err; }
      console.log(json);
    });
    res.send(json);
  })
  .post('/post', (req, res => res.send('post')))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

