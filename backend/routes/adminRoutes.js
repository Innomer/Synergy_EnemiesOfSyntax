const express = require('express');
const { getAllAdminsController, addNewAdminController, getUserCount } = require('../controllers/adminController');
const router = express.Router();

router.get('/get-all-admins',getAllAdminsController);
router.post('/add-new-admin',addNewAdminController);
router.get('/get-all-users',getUserCount);

module.exports=router;