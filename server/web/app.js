const express = require('express');
const path = require('path');
const app = express();
const jwt = require('jsonwebtoken');
const AUTH_SECRET_KEY = 'aosdpfka234uimal9s73mijs3iojd89ms3aw';

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    token = bearerHeader.split(' ')[1];

    jwt.verify(token, config.AUTH_SECRET_KEY, (err, { id }) => {
      if (err) {
        res.sendStatus(403);
      } else {
        req.user = { id };
        next();
      }
    });
  } else {
    res.sendStatus(403);
  }
};

app.use(express.static(path.join(__dirname, '../../web/build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../web/build/', 'index.html'));
});

// app.get(/app/, verifyToken, (req, res) => {
//   res.sendFile(path.join(__dirname, '../../web/build/', 'index.html'));
// });

// app.get('/app', verifyToken, (req, res) => {
//   res.sendFile(path.join(__dirname, '../../web/build/', 'index.html'));
// });

app.listen(3000, () => console.log('Up and running at 3000'));
