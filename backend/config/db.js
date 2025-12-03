const mongoose = require('mongoose');

async function connectDB(uri) {
  try{
  const db = await mongoose.connect(uri);
  console.log('MongoDB connected to ' + db.connection.host);
  } catch(err){console.log(`Error connecting to db`)}
}

module.exports = connectDB;
