const express = require('express');
const router = express.Router();
const conn = require('../db');

router.get('/', (req, res) => {
  conn.query("SELECT * FROM pokemon", (err, rows) => {
    if (err) return res.status(500).send(err);
    res.json(rows);
  });
});

module.exports = router;

router.post('/', (req, res) => {
  const { name, type1, type2, hp, attack, defense, speed, image_url } = req.body;

  const query = `
    INSERT INTO pokemon (name, type1, type2, hp, attack, defense, speed, image_url)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    name,
    type1,
    type2 || null,
    parseInt(hp),
    parseInt(attack),
    parseInt(defense),
    parseInt(speed),
    image_url
  ];

  conn.query(query, values, (err, result) => {
   if (err) {
console.error(" Insert Error:", err.sqlMessage);
  return res.status(500).json({ error: "Error inserting data" });
}

    res.json({ success: true, id: result.insertId });
  });
});
