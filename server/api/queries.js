const sha256 = require('sha256');
const promise = require('bluebird');

const mailgun = require('mailgun-js')({
  apiKey: 'key-6df7c683ba6f9df431bafc0df1eeddf7',
  domain: 'mg.getpushapp.com'
});

const sendMail = (email, name) => {
  const data = {
    from: 'PushApp <noreply@getpushapp.com>',
    to: email,
    subject: `Welcome to PushApp, ${name}`,
    html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <title>PushApp Email</title>

        <style typ="text/css">
@media only screen and (min-device-width: 601px) {
  .content {
    width: 600px !important;
  }

  .col425 {
    width: 425px!important;
  }

  .col380 {
    width: 380px!important;
  }
}
@media only screen and (max-width: 550px), screen and (max-device-width: 550px) {
  body[yahoo] .buttonwrapper {
    background-color: transparent!important;
  }

  body[yahoo] .button a {
    background-color: #e05443;
    padding: 15px 15px 13px!important;
    display: block!important;
  }

  body[yahoo] .unsubscribe {
    display: block;
    margin-top: 20px;
    padding: 10px 50px;
    background: #2f3942;
    border-radius: 5px;
    text-decoration: none!important;
    font-weight: bold;
  }

  body[yahoo] .hide {
    display: none!important;
  }
}
</style>
    </head>
    <body yahoo="" bgcolor="#f6f8f1" style="margin: 0; padding: 20px 0 30px 0; min-width: 100%;">
      <!--[if (gte mso 9)|(IE)]>
      <table width="600" align="center" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td>
          <![endif]-->
          <table class="content" align="center" cellpadding="0" cellspacing="0" border="0" style="width: 100%; max-width: 600px;" width="100%">
              <tr>
                <td class="header" bgcolor="#51C1AB" style="padding: 40px 30px 20px 30px;">
                  <table width="70" align="left" border="0" cellpadding="0" cellspacing="0">
                    <tr>
                      <td height="70" style="padding: 0 20px 20px 0;">
                        <img src="https://www.getpushapp.com/mail/assets/icon.gif" width="70" height="70" border="0" alt="" style="height: auto; opacity: 0;">
                      </td>
                    </tr>
                  </table>
                  <!--[if mso]>
                    </td><td>
                  <![endif]-->

                  <!--[if (gte mso 9)|(IE)]>
                  <table width="425" align="left" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td>
                      <![endif]-->
                        <table class="col425" align="left" border="0" cellpadding="0" cellspacing="0" style="width: 100%; max-width: 425px;">
                          <tr>
                            <td height="70">
                              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                  <td class="subhead" style="font-size: 15px; color: #ffffff; font-family: sans-serif; letter-spacing: 10px; padding: 0 0 0 3px;">
                                    WELCOME TO
                                  </td>
                                </tr>
                                <tr>
                                  <td class="h1" style="font-size: 33px; line-height: 38px; font-weight: bold; color: #153643; font-family: sans-serif; padding: 5px 0 0 0;">
                                    PushApp (beta version)
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      <!--[if (gte mso 9)|(IE)]>
                      </td>
                    </tr>
                  </table>
                  <![endif]-->
                </td>
              </tr>
              <tr>
                <td class="innerpadding borderbottom" style="padding: 30px 30px 30px 30px; border-bottom: 1px solid #f2eeed;">
                  <table width="115" align="left" border="0" cellpadding="0" cellspacing="0">
                    <tr>
                      <td height="115" style="padding: 0 20px 20px 0;">
                        <img src="https://www.getpushapp.com/mail/assets/email-thumbnail.gif" width="115" height="115" border="0" alt="" style="height: auto;">
                      </td>
                    </tr>
                  </table>
                  <!--[if (gte mso 9)|(IE)]>
                    <table width="380" align="left" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td>
                  <![endif]-->
                  <table class="col380" align="left" border="0" cellpadding="0" cellspacing="0" style="width: 100%; max-width: 380px;">
                    <tr>
                      <td>
                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                          <tr>
                            <td class="bodycopy" style="color: #153643; font-family: sans-serif; font-size: 16px; line-height: 22px;">
                              <h3>Thank you for joining!</h3>
                              Every other <b>friday</b> (starting from today) you will be given a new version of the app.
                              The new versions will be based on your suggestions and feedback. We will try to make the app
                              into something <i>you</i> want to use. To do that, it is very important that you tell us what is good, bad or missing.
                              <br> <br> Press the button to be redirected to our website. It contains instructions and a feedback form.
                              <br> <br> Happy training,
                              <br> <i>The team behind PushApp</i>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 20px 0 0 0;">
                              <table class="buttonwrapper" bgcolor="#6669CB" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                  <td class="button" height="45" style="text-align: center; font-size: 18px; font-family: sans-serif; font-weight: bold; padding: 0 30px 0 30px;" align="center">
                                    <a href="https://www.getpushapp.com/#download" target="_blank" style="color: #ffffff; text-decoration: none;">Start testing!</a>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                  <!--[if (gte mso 9)|(IE)]>
                        </td>
                      </tr>
                  </table>
                  <![endif]-->
                </td>
              </tr>

                <td class="footer" bgcolor="#9AABAC" style="padding: 20px 30px 15px 30px;">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td align="center" class="footercopy" style="font-family: sans-serif; font-size: 14px; color: #ffffff;">
                          &reg; 2018 PushApp<br>

                        </td>
                      </tr>
                      <!--<tr>
                        <td align="center" style="padding: 20px 0 0 0;">
                          <table border="0" cellspacing="0" cellpadding="0">
                            <tr>
                              <td width="37" style="text-align: center; padding: 0 10px 0 10px;">
                                <a href="http://www.facebook.com/">
                                  <img src="https://www.getpushapp.com/mail/assets/facebook.gif" width="37" height="37" alt="Facebook" border="0" style="height: auto; opacity: 0.5;">
                                </a>
                              </td>
                              <td width="37" style="text-align: center; padding: 0 10px 0 10px;">
                                <a href="http://www.twitter.com/">
                                  <img src="https://www.getpushapp.com/mail/assets/twitter.gif" width="37" height="37" alt="Twitter" border="0" style="height: auto; opacity: 0.5;">
                                </a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>-->
                  </table>
                </td>

            </table>
            <!--[if (gte mso 9)|(IE)]>
          </td>
        </tr>
      </table>
      <![endif]-->
    </body>
</html>
`
  };

  mailgun.messages().send(data, function(error, body) {
    if (error) {
      console.log(error);
    }
  });
};

const options = {
  promiseLib: promise
};

const pgp = require('pg-promise')(options);
const connection = {
  host: 'localhost',
  port: 5432,
  database: 'pushapp_v1',
  user: 'postgres',
  password: 'postgres'
};
const db = pgp(connection);

const getDate = () => {
  const date = new Date();
  return (
    date.toISOString().substring(0, 10) +
    ' ' +
    date.toString().substring(16, 24)
  );
};

const mail = (req, res, next) => {
  sendMail('andreasc89@gmail.com', 'Andreas Carlsson');
  res.status(200).json({ success: true });
};

const getAllUsers = (req, res, next) => {
  db
    .any('SELECT * FROM users ORDER BY id')
    .then(function(data) {
      res.status(200).json(data);
    })
    .catch(function(err) {
      return next(err);
    });
};

const getUserByEmail = (req, res, next) => {
  db
    .any('SELECT * FROM users WHERE email = $1', [req.body.email])
    .then(function(data) {
      res.status(200).json(data);
    })
    .catch(function(err) {
      return next(err);
    });
};

const registerUser = (req, res, next) => {
  console.log();
  const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (!emailRegex.test(req.body.email)) {
    res
      .status(200)
      .json({ success: false, error: 'Invalid email, please try again' });
    return next();
  }

  db
    .any(
      'INSERT INTO users(email, password, name, created) VALUES($1, $2, $3, $4)',
      [req.body.email, req.body.password, req.body.name, getDate()]
    )
    .then(function(data) {
      const token = sha256(
        Math.round(
          new Date().getMilliseconds() * Math.random() * 10000000000000
        ).toString()
      );
      db
        .any('UPDATE users SET token = $2, lastLogin = $3 WHERE email = $1', [
          req.body.email,
          token,
          getDate()
        ])
        .then(function(data) {
          sendMail(req.body.email, req.body.name);
          res.status(200).json({ token: token, success: true });
          return next();
        });
    })
    .catch(function(err) {
      return next(err);
    });
};

const login = (req, res, next) => {
  db
    .any('SELECT id, password, name FROM users WHERE email = $1', [
      req.body.email
    ])
    .then(function(data) {
      if (!data.length) {
        res.status(200).json({ error: 'User not found' });
        return next();
      }

      if (req.body.password === data[0].password) {
        const token = sha256(
          Math.round(
            new Date().getMilliseconds() * Math.random() * 10000000000000
          ).toString()
        );
        const { id, name } = data[0];
        db
          .any('UPDATE users SET token = $2, lastLogin = $3 WHERE email = $1', [
            req.body.email,
            token,
            getDate()
          ])
          .then(function(data) {
            res.status(200).json({ id, name, token, success: true });
          });
      } else {
        res.status(200).json({ error: 'Wrong password' });
      }
    })
    .catch(function(err) {
      return next(err);
    });
};

const loginWithToken = (req, res, next) => {
  db
    .any(
      'SELECT id, password, name FROM users WHERE email = $1 AND token = $2',
      [req.body.email, req.body.token]
    )
    .then(function(data) {
      if (!data.length) {
        res.status(200).json({ error: 'User not found' });
        return next();
      } else {
        const { id, name } = data[0];
        res
          .status(200)
          .json({ id, name, token: req.body.token, success: true });
      }
    })
    .catch(function(err) {
      return next(err);
    });
};

const logout = (req, res, next) => {
  db
    .any("UPDATE users SET token = '' WHERE id = $1", [req.body.id])
    .then(function(data) {
      res.status(200).json({ success: true });
    });
};

const resetPasswordRequest = (req, res, next) => {
  console.log('Got resetPasswordRequest');
  const token = sha256(
    Math.round(
      new Date().getMilliseconds() * Math.random() * 10000000000000
    ).toString()
  );

  db
    .any('SELECT id FROM users WHERE email = $1', [req.body.email])
    .then(function(data) {
      if (data.length) {
        db
          .any('UPDATE users SET reset_token = $1 WHERE email = $2', [
            token,
            req.body.email
          ])
          .then(function(data) {
            mailgun.messages().send({
              from: 'PushApp <noreply@getpushapp.com>',
              to: req.body.email,
              subject: `Reset password for PushApp`,
              text: `Resettoken: ${token}`
            }, function(error, body) {
              if (error) {
                console.log(error);
              }
            });
            res.status(200).json({ success: true });
          });
      } else {
        res.status(200).json({ success: false });
      }
    });
};

const getWorkouts = (req, res, next) => {
  db
    .any('SELECT * FROM workouts')
    .then(function(data) {
      res.status(200).json(data);
    })
    .catch(function(err) {
      return next(err);
    });
};

const getWorkoutsForUser = (req, res, next) => {
  db
    .any(
      'SELECT id, title, date FROM workouts WHERE userId = $1 ORDER BY date DESC',
      [req.body.id]
    )
    .then(function(data) {
      res.status(200).json(data);
    })
    .catch(function(err) {
      return next(err);
    });
};

const getWorkoutWithId = (req, res, next) => {
  db
    .any(
      `
      SELECT
        workouts.id AS workout_id,
        workouts.title AS workout_title,
        date, exercises.id AS exercise_id,
        exercise_types.name AS exercise_title
      FROM workouts, exercises, exercise_types
      WHERE workouts.id = $1
        AND workouts.id = exercises.workout
        AND exercises.exercise_type = exercise_types.id`,
      [req.params.id]
    )
    .then(function(data) {
      if (data.length) {
        res.status(200).json(data);
      } else {
        db
          .any(
            `
            SELECT
              workouts.id AS workout_id,
              workouts.title AS workout_title,
              date
            FROM workouts
            WHERE workouts.id = $1`,
            [req.params.id]
          )
          .then(function(data) {
            res.status(200).json(data);
          })
          .catch(function(err) {
            return next(err);
          });
      }
    })
    .catch(function(err) {
      return next(err);
    });
};

const getSetsForExercise = (req, res, next) => {
  db
    .any(
      `
      SELECT
        sets.id, reps, weight
      FROM exercises, sets
      WHERE exercises.id = $1
        AND sets.exercise = exercises.id`,
      [req.params.id]
    )
    .then(function(data) {
      res.status(200).json(data);
    })
    .catch(function(err) {
      return next(err);
    });
};

const addWorkout = (req, res, next) => {
  const date = new Date();
  const readableDate =
    date.toISOString().substring(0, 10) +
    ' ' +
    date.toString().substring(16, 24);
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  const title = 'Workout ' + date.getDate() + ' ' + months[date.getMonth()];
  db
    .any('INSERT INTO workouts(title, date, userId) VALUES($1, $2, $3)', [
      title,
      readableDate,
      req.body.id
    ])
    .then(function() {
      db
        .any('SELECT id, title, date FROM workouts ORDER BY id DESC LIMIT 1')
        .then(function(data) {
          console.log(data);
          res.status(200).json(data);
        });
    })
    .catch(function(err) {
      return next(err);
    });
};

const deleteWorkout = (req, res, next) => {
  db
    .any(
      'SELECT exercises.id AS id FROM workouts, users, exercises WHERE workouts.userId = $1 AND users.token = $2 AND workouts.id = $3 AND exercises.workout = $3',
      [req.body.id, req.body.token, req.params.id]
    )
    .then(function(data) {
      db
        .any('DELETE FROM workouts WHERE id = $1', [req.params.id])
        .then(function() {
          res.status(200).json({ success: true });
        });
      // db
      //   .any('SELECT id, title, date FROM workouts ORDER BY id DESC LIMIT 1')
      //   .then(function(data) {
      //     res.status(200).json({success: true});
      //   });
    })
    .catch(function(err) {
      return next(err);
    });
};

const editWorkout = (req, res, next) => {
  db
    .any('UPDATE workouts SET title = $1 WHERE id = $2', [
      req.body.title,
      req.params.id
    ])
    .then(function(data) {
      res.status(200).json(data);
    })
    .catch(function(err) {
      return next(err);
    });
};

const resetQuery = `
  DROP TABLE IF EXISTS exercises CASCADE;
  DROP TABLE IF EXISTS workouts CASCADE;
  DROP TABLE IF EXISTS users CASCADE;
  DROP TABLE IF EXISTS exercise_sections CASCADE;
  DROP TABLE IF EXISTS exercise_types CASCADE;
  DROP TABLE IF EXISTS sets CASCADE;

  CREATE TABLE users(id SERIAL PRIMARY KEY, email VARCHAR(100) UNIQUE, password VARCHAR(100), name VARCHAR(100), token VARCHAR(100), created VARCHAR(20), lastLogin VARCHAR(20));
  CREATE TABLE workouts(id SERIAL PRIMARY KEY, title VARCHAR(60), date VARCHAR(20), userId INT REFERENCES users(id));
  CREATE TABLE exercise_sections(id SERIAL PRIMARY KEY, title VARCHAR(60));
  CREATE TABLE exercise_types(id SERIAL PRIMARY KEY, section INT REFERENCES exercise_sections(id), name VARCHAR(60));
  CREATE TABLE exercises(id SERIAL PRIMARY KEY, exercise_type INT REFERENCES exercise_types(id), workout INT REFERENCES workouts(id));
  CREATE TABLE sets(id SERIAL PRIMARY KEY, exercise INT REFERENCES exercises(id), reps INT, weight INT);

  INSERT INTO users(email, password, name, created) VALUES('test', '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08', 'Test User', '2018-02-04 19:03:42');
  INSERT INTO users(email, password, name, created) VALUES('fest', '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08', 'Fest User', '2018-02-05 10:13:22');
  INSERT INTO users(email, password, name, created) VALUES('mickaela', '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08', 'Test User', '2018-02-04 19:03:42');
  INSERT INTO users(email, password, name, created) VALUES('elin', '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08', 'Fest User', '2018-02-05 10:13:22');
  INSERT INTO users(email, password, name, created) VALUES('andreas', '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08', 'Test User', '2018-02-04 19:03:42');
  INSERT INTO users(email, password, name, created) VALUES('felix', '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08', 'Fest User', '2018-02-05 10:13:22');
  INSERT INTO users(email, password, name, created) VALUES('lisa', '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08', 'Fest User', '2018-02-05 10:13:22');

  INSERT INTO workouts(title, date, userId) VALUES('Upper body', '2018-02-03 11:05:04', 1);
  INSERT INTO workouts(title, date, userId) VALUES('Leg day', '2018-02-04 13:19:32', 1);

  INSERT INTO workouts(title, date, userId) VALUES('Cardio', '2018-02-03 09:53:42', 2);
  INSERT INTO workouts(title, date, userId) VALUES('Push', '2018-02-03 12:35:41', 2);
  INSERT INTO workouts(title, date, userId) VALUES('Pull', '2018-02-03 08:14:54', 2);
  INSERT INTO workouts(title, date, userId) VALUES('Legs', '2018-02-03 10:27:22', 2);

  INSERT INTO exercise_sections(id, title) VALUES(1, 'Arms');
  INSERT INTO exercise_sections(id, title) VALUES(2, 'Chest');
  INSERT INTO exercise_sections(id, title) VALUES(3, 'Shoulders');
  INSERT INTO exercise_sections(id, title) VALUES(4, 'Legs');
  INSERT INTO exercise_sections(id, title) VALUES(5, 'Back');

  INSERT INTO exercise_types(id, section, name) VALUES(1, 1, 'Biceps Curl');
  INSERT INTO exercise_types(id, section, name) VALUES(2, 1, 'Skullcrusher');
  INSERT INTO exercise_types(id, section, name) VALUES(3, 1, 'Triceps extension');
  INSERT INTO exercise_types(id, section, name) VALUES(4, 2, 'Benchpress');
  INSERT INTO exercise_types(id, section, name) VALUES(5, 2, 'Inclined benchpress');
  INSERT INTO exercise_types(id, section, name) VALUES(6, 2, 'Cable flyes');
  INSERT INTO exercise_types(id, section, name) VALUES(7, 3, 'Military press');
  INSERT INTO exercise_types(id, section, name) VALUES(8, 3, 'Traps lift');
  INSERT INTO exercise_types(id, section, name) VALUES(9, 3, 'Arm raise');
  INSERT INTO exercise_types(id, section, name) VALUES(10, 4, 'Squat');
  INSERT INTO exercise_types(id, section, name) VALUES(11, 4, 'Leg extension');
  INSERT INTO exercise_types(id, section, name) VALUES(12, 4, 'Lunges');
  INSERT INTO exercise_types(id, section, name) VALUES(13, 5, 'Chins');
  INSERT INTO exercise_types(id, section, name) VALUES(14, 5, 'Pullups');
  INSERT INTO exercise_types(id, section, name) VALUES(15, 5, 'Deadlift');

  INSERT INTO exercises(exercise_type, workout) VALUES(1, 1);
  INSERT INTO exercises(exercise_type, workout) VALUES(2, 1);
  INSERT INTO exercises(exercise_type, workout) VALUES(3, 1);
  INSERT INTO exercises(exercise_type, workout) VALUES(4, 1);
  INSERT INTO exercises(exercise_type, workout) VALUES(5, 1);
  INSERT INTO exercises(exercise_type, workout) VALUES(6, 2);
  INSERT INTO exercises(exercise_type, workout) VALUES(7, 2);
  INSERT INTO exercises(exercise_type, workout) VALUES(8, 2);
  INSERT INTO exercises(exercise_type, workout) VALUES(9, 2);

  INSERT INTO exercises(exercise_type, workout) VALUES(10, 3);
  INSERT INTO exercises(exercise_type, workout) VALUES(11, 3);
  INSERT INTO exercises(exercise_type, workout) VALUES(12, 3);
  INSERT INTO exercises(exercise_type, workout) VALUES(13, 3);
  INSERT INTO exercises(exercise_type, workout) VALUES(14, 3);
  INSERT INTO exercises(exercise_type, workout) VALUES(15, 4);
  INSERT INTO exercises(exercise_type, workout) VALUES(1, 4);
  INSERT INTO exercises(exercise_type, workout) VALUES(2, 4);
  INSERT INTO exercises(exercise_type, workout) VALUES(3, 4);

  INSERT INTO sets(exercise, reps, weight) VALUES(1, 5, 30);
  INSERT INTO sets(exercise, reps, weight) VALUES(1, 5, 30);
  INSERT INTO sets(exercise, reps, weight) VALUES(1, 5, 30);
  INSERT INTO sets(exercise, reps, weight) VALUES(1, 5, 30);
  INSERT INTO sets(exercise, reps, weight) VALUES(1, 5, 30);

  INSERT INTO sets(exercise, reps, weight) VALUES(2, 5, 40);
  INSERT INTO sets(exercise, reps, weight) VALUES(2, 5, 40);
  INSERT INTO sets(exercise, reps, weight) VALUES(2, 5, 35);
  INSERT INTO sets(exercise, reps, weight) VALUES(2, 5, 30);

  INSERT INTO sets(exercise, reps, weight) VALUES(3, 12, 60);
  INSERT INTO sets(exercise, reps, weight) VALUES(3, 12, 55);
  INSERT INTO sets(exercise, reps, weight) VALUES(3, 12, 55);

  INSERT INTO sets(exercise, reps, weight) VALUES(4, 5, 30);
  INSERT INTO sets(exercise, reps, weight) VALUES(4, 5, 30);
  INSERT INTO sets(exercise, reps, weight) VALUES(4, 5, 30);
  INSERT INTO sets(exercise, reps, weight) VALUES(4, 5, 30);
  INSERT INTO sets(exercise, reps, weight) VALUES(4, 5, 30);
  INSERT INTO sets(exercise, reps, weight) VALUES(4, 5, 30);

  INSERT INTO sets(exercise, reps, weight) VALUES(5, 5, 30);
  INSERT INTO sets(exercise, reps, weight) VALUES(5, 5, 30);
  INSERT INTO sets(exercise, reps, weight) VALUES(5, 5, 30);
  INSERT INTO sets(exercise, reps, weight) VALUES(5, 5, 30);
  INSERT INTO sets(exercise, reps, weight) VALUES(5, 5, 30);

  INSERT INTO sets(exercise, reps, weight) VALUES(6, 5, 30);
  INSERT INTO sets(exercise, reps, weight) VALUES(6, 5, 30);
  INSERT INTO sets(exercise, reps, weight) VALUES(6, 5, 30);
  INSERT INTO sets(exercise, reps, weight) VALUES(6, 5, 30);
  INSERT INTO sets(exercise, reps, weight) VALUES(6, 5, 30);

  INSERT INTO sets(exercise, reps, weight) VALUES(7, 5, 30);
  INSERT INTO sets(exercise, reps, weight) VALUES(7, 5, 30);
  INSERT INTO sets(exercise, reps, weight) VALUES(7, 5, 30);
  INSERT INTO sets(exercise, reps, weight) VALUES(7, 5, 30);
  INSERT INTO sets(exercise, reps, weight) VALUES(7, 5, 30);

  INSERT INTO sets(exercise, reps, weight) VALUES(8, 5, 30);
  INSERT INTO sets(exercise, reps, weight) VALUES(8, 5, 30);
  INSERT INTO sets(exercise, reps, weight) VALUES(8, 5, 30);
  INSERT INTO sets(exercise, reps, weight) VALUES(8, 5, 30);
  INSERT INTO sets(exercise, reps, weight) VALUES(8, 5, 30);

  INSERT INTO sets(exercise, reps, weight) VALUES(9, 5, 30);
  INSERT INTO sets(exercise, reps, weight) VALUES(9, 5, 30);
  INSERT INTO sets(exercise, reps, weight) VALUES(9, 5, 30);
  INSERT INTO sets(exercise, reps, weight) VALUES(9, 5, 30);
  INSERT INTO sets(exercise, reps, weight) VALUES(9, 5, 30);
`;

const reset = (req, res, next) => {
  db
    .any(resetQuery)
    .then(function(data) {
      console.log(data);
      res.status(200).json({ success: true });
    })
    .catch(function(err) {
      return next(err);
    });
};

const getFeedback = (req, res, next) => {
  db
    .any('SELECT * FROM feedback')
    .then(function(data) {
      res.status(200).json(data);
    })
    .catch(function(err) {
      return next(err);
    });
};

const postFeedback = (req, res, next) => {
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

const fetchExerciseList = (req, res, next) => {
  db
    .any(
      `SELECT exercise_types.id AS id, name, title AS exercise_type
        FROM exercise_types, exercise_sections
        WHERE exercise_types.section = exercise_sections.id
        ORDER BY section
      `
    )
    .then(function(data) {
      res.status(200).json(data);
    })
    .catch(function(err) {
      return next(err);
    });
};

const fetchExerciseDescription = (req, res, next) => {
  db
    .any(
      `SELECT name, description
        FROM exercise_types
        WHERE id = $1
      `,
      [req.params.id]
    )
    .then(function(data) {
      res.status(200).json(data);
    })
    .catch(function(err) {
      return next(err);
    });
};

const addExerciseToWorkout = (req, res, next) => {
  const { workoutId, exerciseId } = req.body;

  db
    .any('INSERT INTO exercises(exercise_type, workout) VALUES($1, $2)', [
      exerciseId,
      workoutId
    ])
    .then(function() {
      db
        .any(
          `SELECT exercises.id AS id, exercise_types.name AS title
            FROM exercises, exercise_types
            WHERE exercise_types.id = exercises.exercise_type
            ORDER BY id DESC
            LIMIT 1
          `
        )
        .then(function(data) {
          console.log(data);
          res.status(200).json(data);
        });
    })
    .catch(function(err) {
      return next(err);
    });
};

const addSetToExercise = (req, res, next) => {
  const { userId, token, reps, weight } = req.body;
  const { id } = req.params;

  db
    .any('INSERT INTO sets(exercise, reps, weight) VALUES($1, $2, $3)', [
      id,
      Number(reps),
      Number(weight)
    ])
    .then(function(data) {
      db
        .any(
          `SELECT id
            FROM sets
            ORDER BY id DESC
            LIMIT 1
          `
        )
        .then(function(data) {
          res.status(200).json(data);
        });
    })
    .catch(function(err) {
      return next(err);
    });
};

module.exports = {
  getAllUsers,
  registerUser,
  getUserByEmail,
  login,
  loginWithToken,
  logout,
  resetPasswordRequest,
  getWorkouts,
  getWorkoutWithId,
  addWorkout,
  deleteWorkout,
  editWorkout,
  reset,
  postFeedback,
  getFeedback,
  getWorkoutsForUser,
  fetchExerciseList,
  fetchExerciseDescription,
  addExerciseToWorkout,
  addSetToExercise,
  getSetsForExercise,
  mail
};
