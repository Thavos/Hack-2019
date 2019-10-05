const express = require('express');
const PORT = process.env.PORT || 5000;

express()
  .get('/', (req, res) => res.send('Home Page'))
  .get('/get', (req, res) => res.send('get'))
  .post('/post', (req, res => res.secure('post')))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));
