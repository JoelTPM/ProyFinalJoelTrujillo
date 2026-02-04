const { MongoClient } = require('mongodb');
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const client = new MongoClient(url);
let db;

async function connectToDb() {
  await client.connect();
  db = client.db('local');
  return db;
}

function getDb() {
  if (!db) throw new Error('Database not initialized. Call connectToDb first.');
  return db;
}

module.exports = { connectToDb, getDb, client };
