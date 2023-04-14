const express = require('express');
const firebase = require('firebase-admin');
const { db } = require('../connection');
const router = express.Router();

//Validation from fire base
router.post('/', async (req, res) => {
    const {phn,otp} = req.body;

    try {
    const usersRef = db.collection('users');
        const querySnapshot = await usersRef.where('phn', '==', phn).where('otp', '==', otp).get();
if (querySnapshot.empty) {
  throw new Error('User not found');
}

else{
    res.status(200).json({ msg: 'Login successful' });

// username,bankacno,ifsccode,address,accounttype,membership:0,email,businessname,expairy:0,photourl,signatureurl

}


    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});





module.exports = router;