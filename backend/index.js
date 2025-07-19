const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'BayersHealthCare',
  port: 3306 // or 8889 if using MAMP default
});

connection.connect((err) => {
  if (err) {
    console.error('MySQL connection failed:', err.message);
  } else {
    console.log('MySQL connection successful!');
  }
});

const app = express();
const port = 3005;
app.use(express.json());
const corsOptions = {
  origin: 'http://localhost:3000', // Allow all origins (for development only)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));



// GET API
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/generateplan', (req, res) => {
  const { height, activity, bmi } = req.body;

  const sql = `
  SELECT 
    dp.*, 
    dt.name AS food_type_name,
    dplan.description, 
    dplan.calories
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
      return res.status(500).json({  status:"failed",error: 'Database query failed' });
    }
    res.status(200).json({ status:"success", plans: results });
  });
});
// POST API
app.post('/data', (req, res) => {
  const data = req.body;
  res.json({ message: 'Data received', data });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});