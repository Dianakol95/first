const express = require('express');
const firebase = require('firebase-admin');
const {db} = require('../connection');
const jwt = require('jsonwebtoken');
const router = express.Router();
const {
  create,
  dualmatchfind,
  singlematchfind,
  idfind,
  updatex,
  deletedata,
} = require('../model/database');

const { tokeveryfi } = require('../helper/tokenverify');

router.post('/', async (req, res) => {
    const {phn, otp} = req.body;
  
    try {

    }

    catch{

    }

});