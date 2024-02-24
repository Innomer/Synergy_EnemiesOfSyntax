const express=require('express');
const { roomRedirect } = require('../controllers/chatController');
const router=express.Router();

router.post('/room',roomRedirect);

module.exports=router;