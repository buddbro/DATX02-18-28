const express = require('express');
const app = express();

app.get('/', (req, res) =>
  res.send('Här hostar vi backend till DATX02-18-28 :)')
);

const db = require('./queries');

app.get('/api/getall', db.getAll);

const router = express.Router();
module.exports = router;

app.listen(8080, 'localhost', () => console.log('Listening on 3000'));
