const express = require('express');
const cors = require('cors');
const { connectToDb } = require('./config/database');
const userRoutes = require('./routes/user');
const studentRoutes = require('./routes/students');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.json({ message: 'API is running', docs: '/docs' }));

connectToDb().then(() => {
  app.use('/api', userRoutes);
  app.use('/api', studentRoutes);

  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Server running on port ${port}`));
}).catch(err => { console.error(err); process.exit(1); });
