const express = require('express');
const cors = require('cors');
const { body, validationResult, check} = require('express-validator')
const router = express.Router();
const axios = require('axios');

router.post("/get-all-subscription", cors(), async (req, res)=>{

    console.log(req)


    if(Object.keys(req.body).length > 0){ 
        try { 
            const  response =  await axios.post(`${process.env.ENDPOINT_URL}/likes-new`, req.body, )
            // if(response.data.success === false){
            //     res.status(400).json(response.data)
            // }

            // res.status(200).json(response.data)
        } catch (error) {
            res.status(500).json({status: "Internal server error"})
        }
    }
})


module.exports = router