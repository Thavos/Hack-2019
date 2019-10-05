const express = require('express', '4.17.1')
const app = express();
const port = process.env.PORT || 5000

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log('Example app listening on port 3000'))
