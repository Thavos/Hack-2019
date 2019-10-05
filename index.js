const express = require('express');
const PORT = process.env.PORT || 5000;
const axios = require('axios');

let VyznamneObjekty;

const getData = async () => {
  const {data} = await axios.get('https://egov.presov.sk/Default.aspx?NavigationState=778:0::plac1889:_144153_5_8');
  VyznamneObjekty = data;
  //filter();
  return data;
}

/*function filter(){
  VyznamneObjekty.forEach(function(element) {
    if(element["Skupina"] == 'Fontány a pramene'){
      objekty += element + ',';
    }
  });
  console.log(objekty);
}*/


express()
  .get('/', (req, res) => {
    getData().then((data) => {
      res.send(data);  
    })
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));