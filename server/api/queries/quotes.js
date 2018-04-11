const getRandomQuote = (req, res, next, db) => {
  db
    .any('SELECT text, author FROM quotes ORDER BY random() LIMIT 1')
    .then(data => {
      res.status(200).json(data[0]);
    })
    .catch(function(err) {
      return next(err);
    });
};

module.exports = {
  getRandomQuote
};
