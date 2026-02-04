const { MongoClient } = require('mongodb');

async function test() {
  const client = new MongoClient('mongodb://localhost:27017');
  try {
    await client.connect();
    const db = client.db('local');
    
    console.log('Colecciones:');
    const collections = await db.listCollections().toArray();
    collections.forEach(c => console.log(`- ${c.name}`));
    
    console.log('\nEstudiantes:');
    const students = await db.collection('student').find().toArray();
    console.log('Total estudiantes:', students.length);
    console.log(students);
    
    console.log('\nUsuarios:');
    const users = await db.collection('user').find().toArray();
    console.log('Total usuarios:', users.length);
    console.log(users);
  } finally {
    await client.close();
  }
}

test().catch(console.error);
