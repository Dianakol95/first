const express = require('express');
const bodyParser = require('body-parser');
const firebase = require('firebase-admin');
const config = require('./config');

// Initialize Firebase
const serviceAccount = require(config.firebase.serviceAccountKeyPath);

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: config.firebase.databaseURL
});

const db = firebase.firestore();

// Create Express app
const app = express();

app.use(bodyParser.json());

// Create user
app.post('/users', async (req, res) => {
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
app.get('/users/:id', async (req, res) => {
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
app.patch('/users/:id', async (req, res) => {
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
app.delete('/users/:id', async (req, res) => {
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

// Create Product
app.post('/products', async (req, res) => {
  try {
    const {name,price,discount,details,quantity} = req.body;

    // Create a new product object
    const product = {
      name,
      price,
      discount,
      details,
      quantity
     
    };

    // Save the product object to the Firebase Realtime Database
    // const newProductRef = firebase.database().ref('products').push();
    // await newProductRef.set(product);

    const newProductRef = db.collection('products').doc();
await newProductRef.set(product);

    // Return a success response with the ID of the newly created product
    res.status(201).json({id:newProductRef.key});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/products/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const userSnapshot = await db.collection('products').doc(id).get();

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

//otp sent 
var unirest = require("unirest");

var req = unirest("POST", "https://www.fast2sms.com/dev/bulkV2");

req.headers({
  "authorization": "JKZRDQ5fhosH2wPaNSM0G8xVWl4FubyernBU39YzEmgt7kcXApAw0aYZPqK29iOR7QlImGD48H6NLsoT"
});

req.form({
  "variables_values": "5599",
  "route": "otp",
  "numbers": "7003560239",
});

req.end(function (res) {
  if (res.error) throw new Error(res.error);

  console.log(res.body);
});



// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
