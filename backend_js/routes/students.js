const express = require('express');
const router = express.Router();
const { getDb } = require('../config/database');
const { studentEntity, studentsEntity } = require('../schemas/students');

router.get('/student', async (req, res) => {
  try {
    console.log('Fetching students...');
    const students = await getDb().collection('student').find().toArray();
    console.log('Students fetched:', students.length);
    res.json(studentsEntity(students));
  } catch (error) {
    console.error('Error in GET /student:', error);
    res.status(500).json({ error: error.message });
  }
});

router.post('/student', async (req, res) => {
  try {
    const student = req.body;
    if (student.id == null) {
      const ret = await getDb().collection('counters').findOneAndUpdate(
        { _id: 'student_id' },
        { $inc: { seq: 1 } },
        { upsert: true, returnDocument: 'after' }
      );
      student.id = ret.value.seq;
    }
    const result = await getDb().collection('student').insertOne(student);
    const studentDoc = await getDb().collection('student').findOne({ _id: result.insertedId });
    res.json(studentEntity(studentDoc));
  } catch (error) {
    console.error('Error in POST /student:', error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/student/:id', async (req, res) => {
  try {
    const idInt = parseInt(req.params.id, 10);
    const result = await getDb().collection('student').findOne({ id: idInt });
    if (!result) return res.status(404).json({ detail: 'Student not found' });
    res.json(studentEntity(result));
  } catch (error) {
    console.error('Error in GET /student/:id:', error);
    res.status(500).json({ error: error.message });
  }
});

router.put('/student/:id', async (req, res) => {
  try {
    const idInt = parseInt(req.params.id, 10);
    const update = req.body;
    delete update.id;
    await getDb().collection('student').findOneAndUpdate({ id: idInt }, { $set: update });
    const student = await getDb().collection('student').findOne({ id: idInt });
    res.json(studentEntity(student));
  } catch (error) {
    console.error('Error in PUT /student/:id:', error);
    res.status(500).json({ error: error.message });
  }
});

router.delete('/student/:id', async (req, res) => {
  try {
    const idInt = parseInt(req.params.id, 10);
    const result = await getDb().collection('student').findOneAndDelete({ id: idInt });
    if (!result.value) return res.status(404).json({ detail: 'Student not found' });
    res.status(204).send();
  } catch (error) {
    console.error('Error in DELETE /student/:id:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
