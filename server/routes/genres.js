const express = require('express');
const pool = require('./../modules/pool');
const router = express.Router();

// Get
router.get('/', (req,res)=>{
  const queryText = 'SELECT * FROM "genres" ORDER BY "project";';
  pool.query(queryText).then(result=>{
    res.send(result.rows);
  }).catch(err=>{
    console.log(err);
    res.sendStatus(500);
  });
});

// POST
router.post('/', (req,res)=>{
  const queryText = `INSERT INTO "genres"("project") VALUES($1);`;
  pool.query(queryText, [req.body.project]).then(result=>{
    res.sendStatus(201);
  }).catch(err=>{
    console.log(err);
    res.sendStatus(500);
  });
});

// DELETE
router.delete('/:id', (req,res)=>{
  const queryText = `DELETE FROM "genres" WHERE "id" = $1;`;
  pool.query(queryText, [req.params.id]).then(result=>{
    res.sendStatus(200);
  }).catch(err=>{
    console.log(err);
    res.sendStatus(500);
  });
});

module.exports = router;