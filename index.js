const express = require('express');
const PORT = process.env.PORT || 5000;

express()
  .get('/', (req, res) => res.send('Home Page'))
  .post('/post', function(){
    let data = "https://egov.presov.sk/Default.aspx?NavigationState=778:0::plac1889:_144153_5_8";
    JSON.parse(data);
    res.send(data);
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));