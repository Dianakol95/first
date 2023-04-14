const firebase = require('firebase-admin');

const serviceAccount = require('./lableiz-da897-firebase-adminsdk-70sno-c0e4769bce.json');

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: 'https://lableiz-da897.firebaseapp.com',
  storageBucket: "gs://lableiz-da897.appspot.com",
});

 const db = firebase.firestore();

 module.exports.db = db;

 