const resetQuery = `
  DROP TABLE IF EXISTS exercises CASCADE;
  DROP TABLE IF EXISTS workouts CASCADE;
  DROP TABLE IF EXISTS users CASCADE;
  DROP TABLE IF EXISTS exercise_sections CASCADE;
  DROP TABLE IF EXISTS exercise_types CASCADE;
  DROP TABLE IF EXISTS sets CASCADE;
  DROP TABLE IF EXISTS schedules CASCADE;
  DROP TABLE IF EXISTS schedules_exercises CASCADE;

  CREATE TABLE users(id SERIAL PRIMARY KEY, email VARCHAR(100) UNIQUE, password VARCHAR(100), name VARCHAR(100), token VARCHAR(100), created VARCHAR(20), lastLogin VARCHAR(20));
  CREATE TABLE workouts(id SERIAL PRIMARY KEY, title VARCHAR(60), date VARCHAR(20), user_id INT REFERENCES users(id) ON DELETE CASCADE);
  CREATE TABLE exercise_sections(id SERIAL PRIMARY KEY, title VARCHAR(60));
  CREATE TABLE exercise_types(id SERIAL PRIMARY KEY, section INT REFERENCES exercise_sections(id) ON DELETE CASCADE, name VARCHAR(60));
  CREATE TABLE exercises(id SERIAL PRIMARY KEY, exercise_type INT REFERENCES exercise_types(id) ON DELETE CASCADE, workout INT REFERENCES workouts(id) ON DELETE CASCADE);
  CREATE TABLE sets(id SERIAL PRIMARY KEY, exercise INT REFERENCES exercises(id) ON DELETE CASCADE, reps INT, weight INT);
  CREATE TABLE schedules(id SERIAL PRIMARY KEY, user_id INT, title TEXT);
  CREATE TABLE schedules_exercises(id SERIAL PRIMARY KEY, schedule_id INT REFERENCES schedules(id) ON DELETE CASCADE, exercise_id INT REFERENCES exercise_types(id) ON DELETE CASCADE);
  CREATE TABLE achievements(id SERIAL PRIMARY KEY, name TEXT, image TEXT, description TEXT);
  CREATE TABLE achievements_user(id serial primary key, user_id INT REFERENCES users(id), achievement INT REFERENCES achievements(id), obtained_date TIMESTAMP WITHOUT TIME ZONE, obtained_times INT);

  INSERT INTO users(email, password, name, created) VALUES('test', '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08', 'Test User', '2018-02-04 19:03:42');
  INSERT INTO users(email, password, name, created) VALUES('fest', '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08', 'Fest User', '2018-02-05 10:13:22');

  INSERT INTO workouts(title, date, user_id) VALUES('Upper body', '2018-02-03 11:05:04', 1);
  INSERT INTO workouts(title, date, user_id) VALUES('Leg day', '2018-02-04 13:19:32', 1);

  INSERT INTO workouts(title, date, user_id) VALUES('Cardio', '2018-02-03 09:53:42', 2);
  INSERT INTO workouts(title, date, user_id) VALUES('Push', '2018-02-03 12:35:41', 2);
  INSERT INTO workouts(title, date, user_id) VALUES('Pull', '2018-02-03 08:14:54', 2);
  INSERT INTO workouts(title, date, user_id) VALUES('Legs', '2018-02-03 10:27:22', 2);

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
  INSERT INTO sets(exercise, reps, weight) VALUES(8, 5, 30);

  INSERT INTO schedules(user_id, title) VALUES(2, 'Upper body');
  INSERT INTO schedules_exercises(schedule_id, exercise_id) VALUES(1, 1);
  INSERT INTO schedules_exercises(schedule_id, exercise_id) VALUES(1, 2);
  INSERT INTO schedules_exercises(schedule_id, exercise_id) VALUES(1, 3);
  INSERT INTO schedules_exercises(schedule_id, exercise_id) VALUES(1, 4);
  INSERT INTO schedules_exercises(schedule_id, exercise_id) VALUES(1, 5);

  INSERT INTO schedules(user_id, title) VALUES(2, 'Leg day');
  INSERT INTO schedules_exercises(schedule_id, exercise_id) VALUES(2, 15);
  INSERT INTO schedules_exercises(schedule_id, exercise_id) VALUES(2, 10);
  INSERT INTO schedules_exercises(schedule_id, exercise_id) VALUES(2, 12);

  INSERT INTO schedules(user_id, title) VALUES(2, 'Empty schedule');
`;

const reset = (db, req, res, next) => {
  db
    .any(resetQuery)
    .then(function(data) {
      res.status(200).json({ success: true });
    })
    .catch(function(err) {
      return next(err);
    });
};
