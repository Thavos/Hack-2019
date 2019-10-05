const express = require('express');
const PORT = process.env.PORT || 5000;
const axios = require('axios');
const transformation = require('transform-coordinates')

let GeoJson;
let VyznamneObjekty;

const Kose = [];

const getData = async () => {
  const {data} = await axios.get('https://egov.presov.sk/Default.aspx?NavigationState=778:0::plac1889:_144153_5_8');
  VyznamneObjekty = data;
  return data;
}

const getGeoData = async () => {

  const {data} = await axios.get('https://egov.presov.sk/GeoDataKatalog/separovany_zber.json');

  let geoData = data.features;
  let newGeoData = [];

  const transform = transformation('5514', 'EPSG:4326');
  geoData.forEach((element, index) => {
    let myX = element.geometry.coordinates[0].join(',').split(',')[0];
    let myY = element.geometry.coordinates[0].join(',').split(',')[1];
    newGeoData.push(transform.forward({x: parseFloat(myX), y: parseFloat(myY)}));
  });

  geoData.forEach((element, index) => {
    Kose.push({adress : element.properties['N_OBJ'], coordinates : {longitude : newGeoData[index].y, latitude : newGeoData[index].x}})
  });

  return Kose;
}


express()
  .get('/kose', (req, res) => {
    getGeoData().then((data) => {
      res.send(data);  
    })
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));
