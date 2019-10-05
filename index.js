const express = require('express');
const PORT = process.env.PORT || 5000;
const axios = require('axios');
const transformation = require('transform-coordinates')

let GeoJson;
let VyznamneObjekty;

const Data = [];


const getData = async () => {
  const {data} = await axios.get('https://egov.presov.sk/Default.aspx?NavigationState=778:0::plac1889:_144153_5_8');
  VyznamneObjekty = data;
  return data;
}

const getGeoData1 = async (url) => {

  const {data} = await axios.get(url);

  let geoData = data.features;
  let newGeoData = [];
  console.log(geoData[0].geometry.coordinates.join(',').split(','));

  const transform = transformation('5514', 'EPSG:4326');
  geoData.forEach((element, index) => {
    let myX = element.geometry.coordinates[0].join(',').split(',')[0];
    let myY = element.geometry.coordinates[0].join(',').split(',')[1];
    newGeoData.push(transform.forward({x: parseFloat(myX), y: parseFloat(myY)}));
  });

  geoData.forEach((element, index) => {
    Data.push({adress : element.properties['N_OBJ'], coordinates : {longitude : newGeoData[index].y, latitude : newGeoData[index].x}})
  });

  return Data;
}

const getGeoData2 = async (url) => {

  const {data} = await axios.get(url);

  let geoData = data.features;
  let newGeoData = [];

  const transform = transformation('5514', 'EPSG:4326');
  geoData.forEach((element, index) => {
    let myX = element.geometry.coordinates.join(',').split(',');
    let myY = element.geometry.coordinates.join(',').split(',');
    newGeoData.push(transform.forward({x: parseFloat(myX), y: parseFloat(myY)}));
  });

  geoData.forEach((element, index) => {
    Data.push({adress : element.properties['N_OBJ'], coordinates : {longitude : newGeoData[index].y, latitude : newGeoData[index].x}})
  });

  return Data;
}

express()
  .get('/kose', (req, res) => {
    getGeoData1('https://egov.presov.sk/GeoDataKatalog/separovany_zber.json').then((data) => {
      res.send(data);  
    })
  })
  .get('/kontajnery', (req, res) => {
    getGeoData1('https://egov.presov.sk/GeoDataKatalog/velkoobjemove_kontajnery.json').then((data) => {
      res.send(data);  
    })
  })
  .get('/pamiatky', (req, res) => {
    getGeoData2('https://egov.presov.sk/GeoDataKatalog/sakralne_objekty.json').then((data) => {
      res.send(data);  
    })
  })
  .get('/fontany', (req, res) => {
    getGeoData2('https://egov.presov.sk/GeoDataKatalog/fontany_pramene.json').then((data) => {
      res.send(data);  
    })
  })
  .get('/wc', (req, res) => {
    getGeoData2('https://egov.presov.sk/GeoDataKatalog/verejne_wc.json').then((data) => {
      res.send(data);  
    })
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));
