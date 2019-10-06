const express = require('express');
const PORT = process.env.PORT || 5000;
const axios = require('axios');
const transformation = require('transform-coordinates')

let Kose = [];
let Kontajnery = [];
let Fontany = [];
let Pamiatky = [];
let Wc = [];
let Obchody = [
  {
    type : 7,
    name : 'ODVÁŽ(E)NE',
    address : 'Floriánova 6, 080 01 Prešov',
    location : { longitude : 21.238000 , latitude : 48.996840},
    description : "Potraviny, koreniny"
  },
  {
    type : 7,
    name : 'ALCHEMILKA',
    address : 'Hlavná 27, 08001 Prešov',
    location : { longitude : 21.241920 , latitude : 48.995510},
    description : "Kozmetika"
  },  
  {
    type : 7,
    name : 'ČAPOVANÁ KOZMETIKA – DELIZIA',
    address : 'Masarykova 16, 080 01 Prešov',
    location : { longitude : 21.247870 , latitude : 48.989530},
    description : "Drogéria"
  }
];



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
    if(element.properties['N_OBJ'].includes('(uzamk.)') == false){
      let properties = {plastic : false, metal : false, paper : false, glass : false, more : false};
      let more = 0;
      if(element.properties['N_OBJ'].includes('plast') == 1){
        properties.plastic = true;
        more++;
      }
      if(element.properties['N_OBJ'].includes('papier') == 1){
        properties.paper = true;
        more++;
      }
      if(element.properties['N_OBJ'].includes('kov)') == 1){
        properties.metal = true;
        more++;
      }
      if(element.properties['N_OBJ'].includes('sklo') == 1){
        properties.glass = true;
        more++;
      }
      if(more > 1){
        properties.more = true;
      }
      Kose.push({type : 2, address : element.properties['N_OBJ'], location : {longitude : newGeoData[index].x, latitude : newGeoData[index].y, property : properties}})
    }
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
    Kontajnery.push({type : 3, address : element.properties['N_OBJ'], location : {longitude : newGeoData[index].x, latitude : newGeoData[index].y}})
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
    Pamiatky.push({type : 4, address : element.properties['N_OBJ'], location : {longitude : newGeoData[index].x, latitude : newGeoData[index].y}})
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
    Fontany.push({type : 5, address : element.properties['N_OBJ'], location : {longitude : newGeoData[index].x, latitude : newGeoData[index].y}})
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
    Wc.push({type : 6, address : element.properties['N_OBJ'], location : {longitude : newGeoData[index].x, latitude : newGeoData[index].y}})
  });

  return Wc;
}

express()
  .get('/obchody', (req, res) => {
    res.send(Obchody);
  })
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
    if(Kose[0] == null){
      KoseF('https://egov.presov.sk/GeoDataKatalog/separovany_zber.json');
      PamiatkyF('https://egov.presov.sk/GeoDataKatalog/sakralne_objekty.json');
      FontanyF('https://egov.presov.sk/GeoDataKatalog/fontany_pramene.json');
      WcF('https://egov.presov.sk/GeoDataKatalog/verejne_wc.json');
    }
      let data = [];
    
      let kose = Kose.slice(0,10);
      let pamiatky = Pamiatky.slice(0,10);
      let fontany = Fontany.slice(0,8);
      let wc = Wc.slice(0,10);

      kose.forEach((element, index) => {
        data.push(kose[index]);
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
      Obchody.forEach((element, index) => {
        data.push(Obchody[index]);
      })
      res.send(data);
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));
