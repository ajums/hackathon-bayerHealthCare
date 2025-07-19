const express = require('express');
const router = express.Router();
const connection = require('../config/db');

const { getDietPlanByParams } = require('../models/dietPlanner');

router.post('/generateplan', async (req, res) => {
  try {
    const { height, activity, bmi } = req.body;

    if (!height || !activity || bmi === undefined) {
      return res.status(400).json({ status: "failed", error: "Missing required parameters" });
    }

    const plans = await getDietPlanByParams(height, activity, bmi);

    return res.status(200).json({ status: "success", plans });
  } catch (error) {
    console.error('Query Error:', error);
    return res.status(500).json({ status: "failed", error: 'Database query failed' });
  }
});


module.exports = router;