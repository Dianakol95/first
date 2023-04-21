const express = require('express');
const firebase = require('firebase-admin');
const {db} = require('../connection');
const router = express.Router();
var unirest = require('unirest');
const {sendOTP} = require('../provider/otpprovider');
const {
  create,
  dualmatchfind,
  singlematchfind,
  idfind,
  updatex,
  deletedata,
} = require('../model/database');

router.post('/', async (req, res) => {
  const {phn} = req.body;

  try {
    const otp = Math.floor(Math.random() * 888888) + 111111;

    const chack = await singlematchfind('users', 'phn', phn);
    if (chack === false) {
      const bal = {
        phn,
        otp,
        email:"",
        bankac:"",
        address:"",
        accountholdername:"",
        ifsccode:"",
        website:"",
        gstno:"",
        branchname:"",
        businessname:"",
        membership:0,
        expirydate:0
      };

      const reg = await create('users', bal);

      await sendOTP(phn, otp);

      res.status(201).json({otp});
    } else {
      
const chack1 = await singlematchfind('users', 'phn', phn);
      // console.log(chack1); 
      // console.log(chack1[0].id); -> only id
      const ids = chack1[0].id;

      const bal = {
        otp,
      };
      const otpupdata = await updatex('users', ids, bal);
      await sendOTP(phn, otp);
      res.status(201).json({otp1: otp});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({error: error.message});
  }
});

module.exports = router;
