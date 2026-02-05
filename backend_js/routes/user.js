const express = require('express');
const router = express.Router();
const { getDb } = require('../config/database');
const { ObjectId } = require('mongodb');
const { userEntity, usersEntity } = require('../schemas/user');

router.get('/user', async (req, res) => {
  try {
    console.log('Fetching users...');
    const users = await getDb().collection('user').find().toArray();
    console.log('Users fetched:', users.length);
    res.json(usersEntity(users));
  } catch (error) {
    console.error('Error in GET /user:', error);
    res.status(500).json({ error: error.message });
  }
});

router.post('/user', async (req, res) => {
  try {
    const newUser = req.body;
    delete newUser.id;
    const result = await getDb().collection('user').insertOne(newUser);
    const user = await getDb().collection('user').findOne({ _id: result.insertedId });
    res.json(userEntity(user));
  } catch (error) {
    console.error('Error in POST /user:', error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/user/:id', async (req, res) => {
  try {
    const user = await getDb().collection('user').findOne({ _id: new ObjectId(req.params.id) });
    if (!user) return res.status(404).json({ detail: 'User not found' });
    res.json(userEntity(user));
  } catch (error) {
    console.error('Error in GET /user/:id:', error);
    res.status(500).json({ error: error.message });
  }
});

router.put('/user/:id', async (req, res) => {
  try {
    const update = req.body;
    delete update.id;
    await getDb().collection('user').findOneAndUpdate({ _id: new ObjectId(req.params.id) }, { $set: update });
    const user = await getDb().collection('user').findOne({ _id: new ObjectId(req.params.id) });
    res.json(userEntity(user));
  } catch (error) {
    console.error('Error in PUT /user/:id:', error);
    res.status(500).json({ error: error.message });
  }
});

router.delete('/user/:id', async (req, res) => {
  try {
    await getDb().collection('user').findOneAndDelete({ _id: new ObjectId(req.params.id) });
    res.status(204).send();
  } catch (error) {
    console.error('Error in DELETE /user/:id:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
