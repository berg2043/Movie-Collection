const express = require('express');
const pool = require('./../modules/pool');
const router = express.Router();

// Get
router.get('/', (req,res)=>{
  const queryText = 'SELECT * FROM "movies" ORDER BY "name"'
  pool.query(queryText).then(result=>{
    res.send(result.rows);
  }).catch(err=>{
    console.log(err);
    res.sendStatus(500);
  });
});

// POST
router.post('/', (req,res)=>{
  const queryText = `INSERT INTO "movies"("name", "release", "run_time") VALUES($1,$2,$3)`
  pool.query(queryText, [req.body.name, req.body.date, req.body.time]).then(result=>{
    res.sendStatus(201);
  }).catch(err=>{
    console.log(err);
    res.sendStatus(500);
  });
});

module.exports = router;