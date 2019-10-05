const express = require('express');
const PORT = process.env.PORT || 5000;
const axios = require('axios');

let VyznamneObjekty;
 
(async () => {
  const response = await axios.get('https://egov.presov.sk/Default.aspx?NavigationState=778:0::plac1889:_144153_5_8');
  VyznamneObjekty = response;
  console.log(VyznamneObjekty);
})()

const getData = async () => {
  const {data} = await axios.get('https://egov.presov.sk/Default.aspx?NavigationState=778:0::plac1889:_144153_5_8');
  return data;
}


express()
  .get('/', (req, res) => {
    getData().then((data) => {
      res.send(data[1]);  
    })
  })
 //.get('/Objekty', (req, res) => res.send(VyznamneObjekty))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));