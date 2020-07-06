const express = require('express');
const auth = require('../../middleware/auth');

const { register, logIn, logOut } = require('../../controllers');

const router = express.Router();

router.post('/register', register);
router.post('/login', logIn);
router.post('/logout', auth, logOut);

module.exports = router;
