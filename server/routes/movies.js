const express = require('express');
const pool = require('./../modules/pool');
const router = express.Router();

// Get
router.get('/', (req,res)=>{
  const queryText = 'SELECT * FROM "movies" ORDER BY "name";';
  pool.query(queryText).then(result=>{
    res.send(result.rows);
  }).catch(err=>{
    console.log(err);
    res.sendStatus(500);
  });
});

// POST
router.post('/', (req,res)=>{
  const queryText = `INSERT INTO "movies"("name", "release", "run_time") VALUES($1,$2,$3);`;
  pool.query(queryText, [req.body.name, req.body.date, req.body.time]).then(result=>{
    res.sendStatus(201);
  }).catch(err=>{
    console.log(err);
    res.sendStatus(500);
  });
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