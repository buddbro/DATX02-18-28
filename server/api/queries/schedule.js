const fetchSchedules = (req, res, next, db) => {
  {
    db
      .any(
        'SELECT id, title FROM schedules WHERE user_id = $1 ORDER BY id DESC',
        [req.params.id]
      )
      .then(function(data) {
        res.status(200).json(data);
      })
      .catch(function(err) {
        return next(err);
      });
  }
};

module.exports = {
  fetchSchedules
};
