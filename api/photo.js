// const express = require('express');
// const multer = require('multer');
// const path = require('path');
// const http = require('http');

// const firebase = require('firebase-admin');
// const {db} = require('../connection');

// const router = express.Router();

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'images');
//   },
//   filename: function (req, file, cb) {
//     const fileName = Date.now() + path.extname(file.originalname);
//     const url =
//       req.protocol + '://' + req.headers.host + req.url + 'images/' + fileName;
//     console.log(url);
//     req.fileName = url; // store the file name in the request object
//     cb(null, fileName);
//   },
// });

// const upload = multer({storage: storage});

// router.post('/', upload.single('photo'), (req, res) => {
//   const fileName = req.fileName;

//   // const docRef = db.collection('photos').doc(fileName);

//   const docRef = db.collection('photos').doc();
//   docRef
//     .set({name: fileName})
//     .then(() => {
//       res.send('Photo uploaded successfully');
//     })
//     .catch(error => {
//       console.error('Error writing document: ', error);
//       res.status(500).send('Internal server error');
//     });
// });

// module.exports = router;

const express = require('express');
const multer = require('multer');
const path = require('path');
const http = require('http');

const firebase = require('firebase-admin');
const {db} = require('../connection');

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images');
  },
  filename: function (req, file, cb) {
    const fileName = Date.now() + path.extname(file.originalname);
    const url = req.protocol + '://' + req.headers.host + '/images/' + fileName;
    console.log(url);
    req.fileName = url; // store the file name in the request object
    cb(null, fileName);
  },
});

const upload = multer({storage: storage});

router.post('/:collectionName', upload.single('photo'), async (req, res) => {
  const {collectionName} = req.params;
  const fileName = req.fileName;

  const docRef = db.collection(collectionName).doc();
  try {
    await docRef.set({name: fileName});
    res.send('Photo uploaded successfully');
  } catch (error) {
    console.error('Error writing document: ', error);
    res.status(500).send('Internal server error');
  }
});

module.exports = router;
