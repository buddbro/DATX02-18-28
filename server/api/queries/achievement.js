const getAllAchievements = (req, res, next, db) => {
  db
    .any('SELECT * FROM achievements ORDER BY id')
    .then(function(data) {
      res.status(200).json(data);
    })
    .catch(function(err) {
      return next(err);
    });
};

const getAchievementsForUser = (req, res, next, db) => {
  db
    .any('SELECT * FROM achievements WHERE user_id = $1 ORDER BY id', [
      req.user.id
    ])
    .then(function(data) {
      res.status(200).json(data);
    })
    .catch(function(err) {
      return next(err);
    });
};

const calculateAchievements = (req, res, next, db) => {
  db
    .any('SELECT * FROM achievements WHERE ORDER BY id', [req.user.id])
    .then(function(data) {
      console.log(data);
      res.status(200).json(data);
    })
    .catch(function(err) {
      return next(err);
    });
};

module.exports = {
  getAllAchievements,
  getAchievementsForUser,
  calculateAchievements
};
