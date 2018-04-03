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
        calculateChickenLegs(21, req.user.id, db),
        calculateChickenLegs(14, req.user.id, db),
        calculateChickenLegs(7, req.user.id, db)
      ]).then(() => {
        res.sendStatus(200);
      });
    });
};

const calculateNightOwl = (user, db) => {
  return new Promise((resolve, reject) => {
    db
      .any('SELECT * FROM workouts WHERE user_id = $1 ORDER BY id DESC', [user])
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
              db
                .any(
                  `INSERT INTO achievements_user(user_id, achievement, obtained_date, obtained_times, level) VALUES($1, $2, $3, $4, '')`,
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
            const { legdays } = data[0];
            if (legdays > 0) {
              console.log(legdays);
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

  // data = data.filter(workout => {
  //   if (!(workout.start && workout.stop)) {
  //     return false;
  //   }
  //   const start = workout.start.getHours();
  //   const stop = workout.stop.getHours();
  //   return stop >= 21 || start <= 5;
  // });
  //
  // const obtained_times = data.length;
  //
  // db
  //   .any(
  //     `DELETE FROM achievements_user WHERE user_id = $1 AND achievement = 2`,
  //     [req.user.id]
  //   )
  //   .then(() => {
  //     if (obtained_times === 0) {
  //       res.sendStatus(200);
  //     } else {
  //       const obtained_date = data[0].date;
  //       db
  //         .any(
  //           `INSERT INTO achievements_user(user_id, achievement, obtained_date, obtained_times) VALUES($1, $2, $3, $4)`,
  //           [req.user.id, 2, obtained_date, obtained_times]
  //         )
  //         .then(() => {
  //           res.sendStatus(200);
  //         });
  //     }
  //   });
};

module.exports = {
  getAllAchievements,
  getAchievementsForUser,
  calculateAchievements,
  calculateNightOwl,
  calculateChickenLegs
};
