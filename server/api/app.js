const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) =>
  res.send('Här hostar vi backend till DATX02-18-28 :)')
);

const db = require('./queries');

app.get('/api/getall', db.getAll);
app.post('/api/users/register', db.registerUser);

const router = express.Router();
module.exports = router;

app.listen(8080, 'localhost', () => console.log('Listening on 3000'));
