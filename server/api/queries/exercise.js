const fetchExerciseDescription = (req, res, next, db) => {
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

const fetchExerciseList = (req, res, next, db) => {
  db
    .any(
      `SELECT exercise_types.id AS id, name, title AS exercise_type, description
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

const addExerciseType = (req, res, next, db) => {
  db
    .any(
      `INSERT exercise_types(section, name, description) VALUES($1, $2, $3) RETURNING id`,
      [req.body.section, req.body.name, req.body.description]
    )
    .then(function(data) {
      res.json(data[0].id);
    })
    .catch(function(err) {
      return next(err);
    });
};

const editExercise = (req, res, next, db) => {
  db
    .any(`UPDATE exercise_types SET description = $1 WHERE id = $2`, [
      req.body.description,
      req.params.id
    ])
    .then(function(data) {
      res.json(data);
    })
    .catch(function(err) {
      return next(err);
    });
};

module.exports = {
  fetchExerciseDescription,
  fetchExerciseList,
  addExerciseType,
  editExercise
};
