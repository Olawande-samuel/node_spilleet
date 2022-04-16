const express = require('express');
const cors = require('cors');
const { body, validationResult, check} = require('express-validator')
const router = express.Router();


router.post("/get-subscription", cors(), (req, res)=>{
    res.status(400).json({status: true})
})


module.exports = router