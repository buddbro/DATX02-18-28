const db = require('./queries');

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
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.get('/api', (req, res) =>
  res.send('Här hostar vi backend till DATX02-18-28 :)')
);

app.get('/api/getall', db.getAllUsers);

// User
app.post('/api/users/update', db.updateUser);
app.post('/api/users/register', db.registerUser);
app.post('/api/users/getuserbyemail', db.getUserByEmail);
app.post('/api/users/login', db.login);
app.post('/api/users/login/token', db.loginWithToken);
app.post('/api/users/logout', db.logout);
app.post('/api/users/resetpassword', db.sendResetPasswordEmail);
app.get('/api/resetpassword/:id/:token', db.resetPasswordGet);
app.post('/api/resetpassword/:id/:token', db.resetPasswordPost);

// Workout
app.post('/api/workouts/exercise/:id', db.addSetToExercise);
app.get('/api/workouts', db.getWorkouts);
app.post('/api/workouts/delete/:id', db.deleteWorkout);
app.get('/api/workouts/:id', db.getWorkoutWithId);
app.post('/api/workouts', db.getWorkoutsForUser);
app.post('/api/workouts/new', db.addWorkout);
app.patch('/api/workouts/:id', db.editWorkout);
app.post('/api/workouts/exercise', db.addExerciseToWorkout);
app.get('/api/workouts/exercise/:id/sets', db.getSetsForExercise);
app.post('/api/workouts/exercise/:id', db.addSetToExercise);
app.get('/api/exercises', db.fetchExerciseList);
app.get('/api/exercises/description/:id', db.fetchExerciseDescription);

// Schedules
app.post('/api/schedules', db.addSchedule);

// Feedback
app.get('/api/feedback', db.getFeedback);
app.post('/api/feedback', db.postFeedback);

const router = express.Router();
module.exports = router;

app.listen(8080, 'localhost', () => console.log('Listening on 3000'));
