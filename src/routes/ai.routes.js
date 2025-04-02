const express = require('express')
const router = express.Router()

const aicon = require("../controller/ai.con")

router.post("/get-review",aicon.getReview)

module.exports = router