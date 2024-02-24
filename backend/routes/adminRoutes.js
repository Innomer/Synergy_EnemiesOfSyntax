const express = require('express');
const { getAllAdminsController, addNewAdminController, getUserCount } = require('../controllers/adminController');
const router = express.Router();
const FCM = require('fcm-node');

router.get('/get-all-admins', getAllAdminsController);
router.post('/add-new-admin', addNewAdminController);
router.get('/get-all-users', getUserCount);
module.exports = router;