const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Data = require('../models/Data');

// Load env vars
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

const importData = async () => {
  // jsondata.json
  try {
    // Read JSON file
    const jsonPath = path.join(__dirname, '../../jsondata.json');
    const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
    console.log("jsonData: ",jsonData);

    // Delete existing data
    await Data.deleteMany();
    console.log('Old data deleted');

    // Insert new data
    await Data.insertMany(jsonData);
    console.log(`${jsonData.length} records imported successfully`);

    process.exit();
  } catch (error) {
    console.error('Error importing data:', error);
    process.exit(1);
  }
};

importData();