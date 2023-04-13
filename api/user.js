const express = require('express');
const firebase = require('firebase-admin');
const { db } = require('../connection');
const router = express.Router();

// Create user
router.post('/', async (req, res) => {
  const { email, password,bankac,address,phn } = req.body; // post request from app/ wesite to store data pass{}
  
    try {
      const userRecord = await firebase.auth().createUser({ email, password  });//store in fibarebase db
      const userData = { email, password,bankac,address,phn };
  
      await db.collection('users').doc(userRecord.uid).set(userData);
  
      res.status(201).json({ id: userRecord.uid, ...userData });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
});

// Read user
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const userSnapshot = await db.collection('users').doc(id).get();

    if (!userSnapshot.exists) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.json({ id: userSnapshot.id, ...userSnapshot.data() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Update user
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { email } = req.body;

  try {
    await firebase.auth().updateUser(id, { email });
    await db.collection('users').doc(id).update({ email });

    res.json({ id, email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Delete user
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await firebase.auth().deleteUser(id);
    await db.collection('users').doc(id).delete();

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
