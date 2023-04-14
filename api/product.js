const express = require('express');
const firebase = require('firebase-admin');
const { db } = require('../connection');
const router = express.Router();



router.post('/', async (req, res) => {
    try {
      const { name, price } = req.body;
  
      // Create a new product object
      const product = {
        name,
        price
      };
  
      // Save the product object to the Firebase Cloud Firestore
      const newProductRef = await db.collection('products').doc();
      await newProductRef.set(product);
  
      // Return a success response with the ID of the newly created product
      res.status(201).json({ id: newProductRef.id});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  });
  router.get('/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const userSnapshot = await db.collection('products').doc(id).get();
  
      if (!userSnapshot.exists) {
        res.status(404).json({ error: 'Product not found' });
        return;
      }
  
      res.json({ id: userSnapshot.id, ...userSnapshot.data() });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  });




  router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const { details,discount,name,price,quantity } = req.body;
  
    try {
      
      await db.collection('products').doc(id).update({ details,discount,name,price,quantity });
  
      res.json({details,discount,name,price,quantity });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  });





  module.exports = router;