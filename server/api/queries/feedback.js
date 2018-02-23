const postFeedback = (req, res, next, db) => {
  db
    .any('INSERT INTO feedback(name, feedback) VALUES($1, $2)', [
      req.body.name,
      req.body.feedback
    ])
    .then(function() {
      res.status(200).json({ success: true });
    })
    .catch(function(err) {
      return next(err);
    });
};

const getFeedback = (req, res, next, db) => {
  db
    .any('SELECT * FROM feedback')
    .then(function(data) {
      res.status(200).json(data);
    })
    .catch(function(err) {
      return next(err);
    });
};

module.exports = {
  postFeedback,
  getFeedback
};
