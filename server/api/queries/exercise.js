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
      db
        .any(
          `SELECT exercise_type, COUNT(*) AS count FROM exercises WHERE exercise_type > 0 GROUP BY exercise_type`
        )
        .then(function(countData) {
          data.map(d => {
            const usedTimes = countData.filter(
              c => c.exercise_type === d.id
            )[0];
            const count = usedTimes ? Number(usedTimes.count) : 0;

            d.count = count;
          });
          res.status(200).json(data);
        });
    })
    .catch(function(err) {
      return next(err);
    });
};

const addExerciseType = (req, res, next, db) => {
  db
    .any(
      `INSERT INTO exercise_types(section, name, description) VALUES($1, $2, $3) RETURNING id`,
      [req.body.section, req.body.name, req.body.description]
    )
    .then(function(data) {
      res.json(data[0].id);
    })
    .catch(function(err) {
      return next(err);
    });
};

const deleteExerciseType = (req, res, next, db) => {
  db
    .any(`DELETE FROM exercise_types WHERE id = $1`, [req.params.id])
    .then(function() {
      res.json({ success: true });
    })
    .catch(function(err) {
      return next(err);
    });
};

const countExercises = (req, res, next, db) => {
  db
    .any(`SELECT COUNT(*) AS count FROM exercises WHERE exercise_type = $1`, [
      req.params.id
    ])
    .then(function(data) {
      res.json(Number(data[0].count));
    })
    .catch(function(err) {
      return next(err);
    });
};

const fetchExerciseTypes = (req, res, next, db) => {
  db
    .any(`SELECT id, title FROM exercise_sections`)
    .then(function(data) {
      res.json(data);
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
  fetchExerciseTypes,
  addExerciseType,
  deleteExerciseType,
  countExercises,
  editExercise
};
