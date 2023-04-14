const express = require('express');
const Multer = require('multer');
const { Storage } = require('@google-cloud/storage');
const firebase = require('firebase-admin');
const { db } = require('../connection');
const router = express.Router();

// Initialize Firebase Admin SDK and Storage client

const storage = new Storage();

// Initialize Multer middleware to handle file upload
const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024 // 10 MB
  }
});

// Define Express router to handle photo upload and URL retrieval


router.post('/', multer.single('photo'), async (req, res) => {
  try {
    // Get the uploaded file and its metadata
    const file = req.file;
    const metadata = {
      contentType: file.mimetype,
      metadata: {
        firebaseStorageDownloadTokens: Date.now().toString()
      }
    };

    // Upload the file to Firebase Storage and get its download URL
    const bucket = storage.bucket();
    const bucketFile = bucket.file(file.originalname);
    await bucketFile.save(file.buffer, { metadata });
    const downloadUrl = await bucketFile.getSignedUrl({
      action: 'read',
      expires: '03-17-2025' // example expiration date
    });

    // Store the photo download URL to Firestore
    const { uid } = req.user; // assuming user authentication middleware is used
    const userRef = db.collection('users').doc(uid);
    await userRef.update({ photoUrl: downloadUrl[0] });

    res.status(200).json({ downloadUrl: downloadUrl[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
