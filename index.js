const express = require('express');
const PORT = process.env.PORT || 5000;
const axios = require('axios');
const transformation = require('transform-coordinates')

let Kose = [];
let Kontajnery = [];
let Fontany = [];
let Pamiatky = [];
let Wc = [];

const KoseF = async (url) => {
  Kose = [];
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
    Kose.push({id : 2, address : element.properties['N_OBJ'], coordinates : {longitude : newGeoData[index].y, latitude : newGeoData[index].x}})
  });

  return Kose;
}

const KontajneryF = async (url) => {
  Kontajnery = [];
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
    Kontajnery.push({id : 3, address : element.properties['N_OBJ'], coordinates : {longitude : newGeoData[index].y, latitude : newGeoData[index].x}})
  });

  return Kontajnery;
}

const PamiatkyF = async (url) => {
  Pamiatky = [];
  const {data} = await axios.get(url);

  let geoData = data.features;
  let newGeoData = [];
  console.log(geoData[0].geometry.coordinates.join(',').split(','));

  const transform = transformation('5514', 'EPSG:4326');
  geoData.forEach((element, index) => {
    let myX = element.geometry.coordinates.join(',').split(',')[0];
    let myY = element.geometry.coordinates.join(',').split(',')[1];
    newGeoData.push(transform.forward({x: parseFloat(myX), y: parseFloat(myY)}));
  });

  geoData.forEach((element, index) => {
    Pamiatky.push({id : 4, address : element.properties['N_OBJ'], coordinates : {longitude : newGeoData[index].y, latitude : newGeoData[index].x}})
  });

  return Pamiatky;
}

const FontanyF = async (url) => {
  Fontany = [];
  const {data} = await axios.get(url);

  let geoData = data.features;
  let newGeoData = [];
  console.log(geoData[0].geometry.coordinates.join(',').split(','));

  const transform = transformation('5514', 'EPSG:4326');
  geoData.forEach((element, index) => {
    let myX = element.geometry.coordinates.join(',').split(',')[0];
    let myY = element.geometry.coordinates.join(',').split(',')[1];
    newGeoData.push(transform.forward({x: parseFloat(myX), y: parseFloat(myY)}));
  });

  geoData.forEach((element, index) => {
    Fontany.push({id : 5, address : element.properties['N_OBJ'], coordinates : {longitude : newGeoData[index].y, latitude : newGeoData[index].x}})
  });

  return Fontany;
}

const WcF = async (url) => {
  Wc = [];
  const {data} = await axios.get(url);

  let geoData = data.features;
  let newGeoData = [];
  console.log(geoData[0].geometry.coordinates.join(',').split(','));

  const transform = transformation('5514', 'EPSG:4326');
  geoData.forEach((element, index) => {
    let myX = element.geometry.coordinates.join(',').split(',')[0];
    let myY = element.geometry.coordinates.join(',').split(',')[1];
    newGeoData.push(transform.forward({x: parseFloat(myX), y: parseFloat(myY)}));
  });

  geoData.forEach((element, index) => {
    Wc.push({id : 6, address : element.properties['N_OBJ'], coordinates : {longitude : newGeoData[index].y, latitude : newGeoData[index].x}})
  });

  return Wc;
}

express()
  .get('/kose', (req, res) => {
    KoseF('https://egov.presov.sk/GeoDataKatalog/separovany_zber.json').then((data) => {
      res.send(data);
    })
  })
  .get('/kontajnery', (req, res) => {
    KontajneryF('https://egov.presov.sk/GeoDataKatalog/velkoobjemove_kontajnery.json').then((data) => {
      res.send(data);  
    })
  })
  .get('/pamiatky', (req, res) => {
    PamiatkyF('https://egov.presov.sk/GeoDataKatalog/sakralne_objekty.json').then((data) => {
      res.send(data);  
    })
  })
  .get('/fontany', (req, res) => {
    FontanyF('https://egov.presov.sk/GeoDataKatalog/fontany_pramene.json').then((data) => {
      res.send(data);  
    })
  })
  .get('/wc', (req, res) => {
    WcF('https://egov.presov.sk/GeoDataKatalog/verejne_wc.json').then((data) => {
      res.send(data);  
    })
  })
  .get('/vsetko', (req, res) => {
    let data = [];
    
    let kose = Kose.slice(0, Kose.length/8);
    let kontajnery = Kontajnery.slice(0, Kontajnery.length/8);
    let pamiatky = Pamiatky.slice(0, Pamiatky.length/3);
    let fontany = Fontany.slice(0, Fontany.length/2);
    let wc = Wc.slice(0, Wc.length/2);

    kose.forEach((element, index) => {
      data.push(kose[index]);
    })
    kontajnery.forEach((element, index) => {
      data.push(kontajnery[index]);
    })
    pamiatky.forEach((element, index) => {
      data.push(pamiatky[index]);
    })
    fontany.forEach((element, index) => {
      data.push(fontany[index]);
    })
    wc.forEach((element, index) => {
      data.push(wc[index]);
    })
    
    res.send(data);
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));
