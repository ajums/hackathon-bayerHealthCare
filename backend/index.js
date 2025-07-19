const express = require('express');
const cors = require('cors');
const app = express();
const port = 3005;

app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

// Routes
const baseRoutes = require('./routes/index');
const generatePlanRoutes = require('./routes/generatePlan');

app.use('/', baseRoutes);
app.use('/', generatePlanRoutes);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});