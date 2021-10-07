const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

const app = express();

const port = process.env.PORT || 5000;

const server = app.listen(
  port,
  console.log(`Server running on port ${port}...`)
);
