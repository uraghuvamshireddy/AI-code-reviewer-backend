const express = require('express')
const verifyToken = require('../middleware/authMiddleware');
const codecon = require('../controller/Codecon');
const router = express.Router();

router.post('/save-code',verifyToken,codecon.saveCode);
router.get('/files',verifyToken,codecon.history)
router.get('/file/:id',verifyToken,codecon.filebyId);

module.exports = router;