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

const { tokengen } = require('../helper/token');
//Validation from fire base
router.post('/', async (req, res) => {
  const {phn, otp} = req.body;

  try {

const dot= await dualmatchfind('users', 'phn',phn ,'otp',otp);
if (dot == false){

  res.status(401).json({msg:"Invalid User"});
}
else {

  const chack1 = await singlematchfind('users', 'phn', phn);

  const ids = chack1[0].id;

const dot2 =await idfind('users',ids)

const tk=tokengen(phn);

  res.status(201).json({tk});

}
  }

  
   catch (error) {
    console.error(error);
    res.status(500).json({error: error.message});
  }
});

module.exports = router;
