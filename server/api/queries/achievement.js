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
    .any(
      `SELECT * FROM achievements, achievements_user
      WHERE user_id = $1 AND
        achievements.id = achievements_user.achievement
      ORDER BY achievements.id`,
      [req.user.id]
    )
    .then(function(data) {
      res.status(200).json(data);
    })
    .catch(function(err) {
      return next(err);
    });
};

const calculateAchievements = (req, res, next, db) => {
  db
    .any('DELETE FROM achievements_user WHERE user_id = $1', [req.user.id])
    .then(() => {
      Promise.all([
        calculateNightOwl(req.user.id, db),
        calculateChickenLegs(7, req.user.id, db),
        calculateChickenLegs(14, req.user.id, db),
        calculateChickenLegs(21, req.user.id, db)
      ]).then(() => {
        res.sendStatus(200);
      });
    });
};

const calculateNightOwl = (user, db) => {
  return new Promise((resolve, reject) => {
    db
      .any(
        'SELECT start::timestamptz, stop::timestamptz, date::timestamptz FROM workouts WHERE user_id = $1 ORDER BY id DESC',
        [user]
      )
      .then(data => {
        data = data.filter(workout => {
          if (!(workout.start && workout.stop)) {
            return false;
          }
          const start = workout.start.getHours();
          const stop = workout.stop.getHours();
          return stop >= 21 || start <= 5;
        });

        const obtained_times = data.length;

        db
          .any(
            `DELETE FROM achievements_user WHERE user_id = $1 AND achievement = 2`,
            [user]
          )
          .then(() => {
            if (obtained_times === 0) {
              resolve();
            } else {
              const obtained_date = data[0].date;
              const level =
                obtained_times < 3
                  ? 'bronze'
                  : obtained_times < 10 ? 'silver' : 'gold';

              db
                .any(
                  `INSERT INTO achievements_user(user_id, achievement, obtained_date, obtained_times, level) VALUES($1, $2, $3, $4, $5)`,
                  [user, 2, obtained_date, obtained_times, level]
                )
                .then(() => {
                  resolve();
                });
            }
          });
      })
      .catch(function(err) {
        return next(err);
      });
  });
};

const calculateChickenLegs = (days, user, db) => {
  let level;
  switch (days) {
    case 7:
      level = 'bronze';
      break;
    case 14:
      level = 'silver';
      break;
    case 21:
      level = 'gold';
      break;
  }

  return new Promise((resolve, reject) => {
    const today = new Date();
    today.setDate(today.getDate() - days);
    const lastWeek =
      today.getFullYear() +
      '-' +
      ('0' + today.getMonth()).substr(-2, 2) +
      '-' +
      ('0' + today.getDate()).substr(-2, 2);

    db
      .any(
        'SELECT id FROM workouts WHERE user_id = $1 AND start > $2::date ORDER BY id DESC',
        [user, lastWeek]
      )
      .then(workouts => {
        workouts = workouts.reduce((acc, next) => [...acc, next.id], []);
        db
          .any(
            `SELECT COUNT(exercises.id) AS legdays
            FROM exercises, exercise_types, exercise_sections
            WHERE exercises.workout IN ($1:csv)
              AND exercises.exercise_type = exercise_types.id
              AND exercise_types.section = exercise_sections.id
              AND exercise_sections.title = 'Legs'`,
            [workouts]
          )
          .then(data => {
            const legdays = Number(data[0].legdays);
            if (legdays === 0) {
              db
                .any(
                  `INSERT INTO achievements_user(user_id, achievement, obtained_date, obtained_times, level) VALUES($1, $2, now(), 1, $3)`,
                  [user, 4, level]
                )
                .then(() => {
                  resolve();
                });
            } else {
              resolve();
            }
          });
      });
  });
};

const calculateChillingCheetah = (days, user, db) => {
  let level;
  switch (days) {
    case 7:
      level = 'bronze';
      break;
    case 14:
      level = 'silver';
      break;
    case 21:
      level = 'gold';
      break;
  }

  return new Promise((resolve, reject) => {
    const today = new Date();
    today.setDate(today.getDate() - days);
    const lastWeek =
      today.getFullYear() +
      '-' +
      ('0' + today.getMonth()).substr(-2, 2) +
      '-' +
      ('0' + today.getDate()).substr(-2, 2);

    db
      .any(
        'SELECT id FROM workouts WHERE user_id = $1 AND start > $2::date ORDER BY id DESC',
        [user, lastWeek]
      )
      .then(workouts => {
        workouts = workouts.reduce((acc, next) => [...acc, next.id], []);
        db
          .any(
            `SELECT COUNT(exercises.id) AS legdays
              FROM exercises, exercise_types, exercise_sections
              WHERE exercises.workout IN ($1:csv)
                AND exercises.exercise_type = exercise_types.id
                AND exercise_types.section = exercise_sections.id
                AND exercise_sections.title = 'Legs'`,
            [workouts]
          )
          .then(data => {
            const legdays = Number(data[0].legdays);
            if (legdays === 0) {
              db
                .any(
                  `INSERT INTO achievements_user(user_id, achievement, obtained_date, obtained_times, level) VALUES($1, $2, now(), 1, $3)`,
                  [user, 4, level]
                )
                .then(() => {
                  resolve();
                });
            } else {
              resolve();
            }
          });
      });
  });
};

module.exports = {
  getAllAchievements,
  getAchievementsForUser,
  calculateAchievements
};
