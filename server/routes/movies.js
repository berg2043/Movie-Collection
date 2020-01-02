const express = require('express');
const pool = require('./../modules/pool');
const router = express.Router();

// Get
router.get('/', (req,res)=>{
  const queryText = 
      `SELECT 
        "movies"."id", 
        "movies"."name", 
        "movies"."description", 
        "movies"."release", 
        "movies"."run_time", 
        "movies"."votes",
        "genres"."project"
      FROM "movies"
      LEFT JOIN "m_g" on "movies"."id" = "m_g"."m_id"
      LEFT JOIN "genres" on "m_g"."g_id" = "genres"."id"
      ORDER BY "movies"."name";`;
  pool.query(queryText).then(result=>{
    res.send(result.rows);
  }).catch(err=>{
    console.log(err);
    res.sendStatus(500);
  });
});

// POST
router.post('/', async (req,res)=>{
  // Sets up initial connection
  const client = await pool.connect();
  try{
    const {
      name,
      genre,
      date,
      time
    } = req.body;
    await client.query('BEGIN');
    // Inserts movie and gets it's ID
    const movieInsertResults = await client.query(
      `INSERT INTO "movies"("name", "release", "run_time") VALUES($1,$2,$3) RETURNING "id";`,
      [name, date, time]
    );
    const movieId = movieInsertResults.rows[0].id;
    // Gets the genres ID
    const getGenreId = await client.query(
      `SELECT * FROM "genres" WHERE "project" = $1;`,
      [genre]
    );
    const genreId = getGenreId.rows[0].id;
    // Adds both IDs into relational database
    await client.query(`INSERT INTO "m_g"("m_id", "g_id") VALUES($1, $2)`, [movieId, genreId]);
    // Commits the inserts if no errors
    await client.query('COMMIT');
    res.sendStatus(201);
  } catch (error) {
    await client.query('ROLLBACK')
    console.log('Error POST /api/movies', error);
    res.sendStatus(500);
  } finally {
    client.release()
  }
});

// DELETE
router.delete('/:id', (req,res)=>{
  const queryText = `DELETE FROM "movies" WHERE "id" = $1;`;
  pool.query(queryText, [req.params.id]).then(result=>{
    res.sendStatus(200);
  }).catch(err=>{
    console.log(err);
    res.sendStatus(500);
  });
});

// PUT (voting)
router.put('/:id', (req,res)=>{
  const queryText = `UPDATE "movies" SET "votes" = "votes" + $1 WHERE "id" = $2;`;
  pool.query(queryText, [req.body.dirrection, req.params.id]).then(result=>{
    res.sendStatus(200);
  }).catch(err=>{
    console.log(err);
    res.sendStatus(500);
  });
});

module.exports = router;