const express = require('express');
const PORT = process.env.PORT || 5000;

express()
  .get('/', (req, res) => res.send('Home Page'))
  .post('/post', (req, res => res.send('post')))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));
