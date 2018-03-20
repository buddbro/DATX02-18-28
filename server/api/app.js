const jwt = require('jsonwebtoken');
const db = require('./queries');
const config = require('./config');

const dd_options = {
  response_code: true,
  tags: ['app:api']
};

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

var connect_datadog = require('connect-datadog')(dd_options);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(connect_datadog);

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, Content-Length, X-Requested-With'
  );
  res.header(
    'Access-Control-Allow-Methods',
    'PUT, PATCH, POST, GET, DELETE, OPTIONS'
  );
  next();
});

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];

  if (
    typeof bearerHeader !== 'undefined' &&
    bearerHeader.split(' ')[1] !== 'undefined'
  ) {
    const token = bearerHeader.split(' ')[1];

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

app.get('/api', (req, res) => res.send('Backend till DATX02-18-28 :)'));

app.get('/api/getall', db.getAllUsers);

app.get('/api/user', verifyToken, db.getUser);

// User
app.post('/api/users/update', db.updateUser);
app.post('/api/users/register', db.registerUser);
app.post('/api/login', db.login);
app.get('/api/verifytoken', verifyToken, db.verifyToken);
app.post('/api/users/resetpassword', db.sendResetPasswordEmail);
app.get('/api/resetpassword/:id/:token', db.resetPasswordGet);
app.post('/api/resetpassword/:id/:token', db.resetPasswordPost);

// Workout
app.post('/api/workouts/exercise/:id', db.addSetToExercise);
app.delete('/api/workouts/:id', verifyToken, db.deleteWorkout);
app.get('/api/workouts/:id', verifyToken, db.getWorkoutWithId);
app.get(
  '/api/workouts/:id/categories',
  verifyToken,
  db.getCategoriesForWorkout
);
app.get('/api/workouts', verifyToken, db.getWorkoutsForUser);
app.post('/api/workouts', verifyToken, db.addWorkout);
app.patch('/api/workouts/:id', verifyToken, db.editWorkout);
app.patch('/api/workouts/difficulty/:id', verifyToken, db.setDifficulty);
app.patch('/api/workouts/notes/:id', verifyToken, db.saveNotes);
app.post('/api/workouts/exercise', verifyToken, db.addExerciseToWorkout);
app.get('/api/workouts/exercise/:id/sets', verifyToken, db.getSetsForExercise);
app.post('/api/workouts/exercise/:id', verifyToken, db.addSetToExercise);
app.get('/api/exercises', db.fetchExerciseList);
app.get('/api/exercises/types', db.fetchExerciseTypes);
app.post('/api/exercises/types', db.addExerciseType);
app.get('/api/exercises/description/:id', db.fetchExerciseDescription);
app.get('/api/exercises/:id/count', db.countExercises);
app.delete('/api/exercises/:id', db.deleteExerciseType);
app.patch('/api/exercises/:id', verifyToken, db.editExercise);

// Achievements
app.get('/api/achievements', db.getAllAchievements);
app.get('/api/user/achievements', verifyToken, db.getAchievementsForUser);
app.post('/api/achievements/calculate', verifyToken, db.calculateAchievements);

// Schedules
app.get('/api/schedules', verifyToken, db.fetchSchedules);
app.delete(
  '/api/schedules/exercise/:exerciseId',
  verifyToken,
  db.deleteExerciseFromSchedule
);
app.post('/api/schedules', verifyToken, db.addSchedule);
app.delete('/api/schedules/:id', verifyToken, db.deleteSchedule);
app.put('/api/schedules/:id', verifyToken, db.editSchedule);
app.post('/api/schedules/exercise', verifyToken, db.addExeciseToSchedule);

// Feedback
app.get('/api/feedback', db.getFeedback);
app.post('/api/feedback', db.postFeedback);

const router = express.Router();
module.exports = router;

app.listen(8080, 'localhost', () => console.log('Listening on 8080'));
