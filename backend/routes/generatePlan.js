// routes/generatePlan.js
const express = require('express');
const router = express.Router();
const connection = require('../config/db');

router.post('/generateplan', (req, res) => {
  const { height, activity, bmi } = req.body;

  const sql = `
    SELECT 
      dp.*, 
      dt.name AS food_type_name,
      dplan.description, 
      dplan.calories,
      dplan.meal
    FROM diet_planner dp
    LEFT JOIN diet_type dt ON dp.diet_type_id = dt.id
    LEFT JOIN diet_plan dplan ON dplan.diet_type_id = dp.diet_type_id
    WHERE dp.height = ? 
      AND dp.activity_level = ? 
      AND ? BETWEEN dp.bmi_min AND dp.bmi_max
  `;

  connection.query(sql, [height, activity, bmi], (err, results) => {
    if (err) {
      console.error('Query Error:', err);
      return res.status(500).json({ status: "failed", error: 'Database query failed' });
    }
    res.status(200).json({ status: "success", plans: results });
  });
});

module.exports = router;