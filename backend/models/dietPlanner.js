const db = require('../config/db');

/**
 * Fetch personalized diet plans based on user height, activity, and BMI.
 * @param {number} height - User's height
 * @param {string} activity - User's activity level
 * @param {number} bmi - User's BMI
 * @returns {Promise<Array>} - Array of diet plans
 */
async function getDietPlanByParams(height, activity, bmi) {
  const sql = `
    SELECT 
      dp.id,
      dt.name AS food_type_name,
      dplan.description, 
      dplan.calories,
      dplan.meal,
      dp.created_on
    FROM diet_planner AS dp
    INNER JOIN diet_type AS dt ON dt.id = dp.diet_type_id
    INNER JOIN diet_plan AS dplan ON dplan.diet_type_id = dp.diet_type_id
    WHERE dp.height = ? 
      AND dp.activity_level = ? 
      AND ? BETWEEN dp.bmi_min AND dp.bmi_max
  `;

  try {
    const results = await new Promise((resolve, reject) => {
      db.query(sql, [height, activity, bmi], (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
    return results;
  } catch (error) {
    console.error('Error fetching diet plans:', error);
    throw error;
  }
}

module.exports = {
  getDietPlanByParams
};