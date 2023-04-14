const express = require('express');
const firebase = require('firebase-admin');
const { db } = require('../connection');
const router = express.Router();
var unirest = require("unirest");

// otp sent 

router.post('/', async (req, res) => {
    const { phn } = req.body; // take for frontnend request 
    try{


        const otp = Math.floor(Math.random() * 8888) + 1111; //random 4 digit no gen code
// console.log(randomNum); for chacking

const bal = {
    phn:JSON.stringify(phn),
    otp
  };// array which store in fire base  "bal" is array name

  // Save the Otp and phn no object to the Firebase Cloud Firestore
  const newProductRef = await db.collection('users').doc();   //collection('users') -> 'users' is fire store database name
  await newProductRef.set(bal);// store data 'bal' array
//end 

  var req = unirest("POST", "https://www.fast2sms.com/dev/bulkV2");

req.headers({
  "authorization": "JKZRDQ5fhosH2wPaNSM0G8xVWl4FubyernBU39YzEmgt7kcXApAw0aYZPqK29iOR7QlImGD48H6NLsoT"
});

req.form({
  "variables_values":otp,
  "route": "otp",
  "numbers":phn,
});

req.end(function (res) {
  if (res.error) throw new Error(res.error);

  console.log(res.body);
});




res.status(201).json({otp });



    }
catch (error){
    console.error(error);
    res.status(500).json({ error: error.message });
}

});




module.exports = router;