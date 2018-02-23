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

module.exports = {
  fetchExerciseDescription,
  fetchExerciseList
};
