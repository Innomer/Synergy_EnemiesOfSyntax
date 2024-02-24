const express = require('express');
const { signUpController, loginController, pwResetEmailController, pwLinkVerifier, pwResetController, emailLinkVerifier } = require('../controllers/loginRegController');
const router = express.Router();


router.post('/signup/:role',signUpController);
router.post('/login',loginController);
router.post('/password-reset',pwResetEmailController);
router.get('/password-change/:ident/:today-:hash',pwLinkVerifier);
router.post('/reset-password',pwResetController);
router.get('/email-verification/:ident/:hash',emailLinkVerifier);
// router.get('/email-verification/:ident/:today-:hash',emailVerificationController);

module.exports=router;