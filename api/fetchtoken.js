const express = require('express');
const firebase = require('firebase-admin');
const {db} = require('../connection');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/', async (req, res) => {
  const {token} = req.body;

  try {
    const decoded = jwt.verify(token, 'mysecretkey');

    const phn = decoded.phn;

    res.status(201).json({phn});
  } catch (error) {
    console.error(error);
    res.status(500).json({error: error.message});
  }
});

module.exports = router;
