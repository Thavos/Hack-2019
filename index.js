const express = require('express');
const PORT = process.env.PORT || 5000;
const axios = require('axios');

let VyznamneObjekty;
 
(async () => {
  const response = await axios.get('https://egov.presov.sk/Default.aspx?NavigationState=778:0::plac1889:_144153_5_8')
  VyznamneObjekty = response;
})()



express()
  .get('/', (req, res) => res.send('Home Page'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));