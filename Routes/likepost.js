const express = require("express");
const cors = require("cors");
const { default: axios } = require("axios");
const router = express.Router();
const headers = require("../headers/headers");
const webpush = require("../WP/notifications");


router.post("/like-post", cors(), async (req, res) => {
  const { usertoken, apptoken, cnt_id, creator } = req.body;
console.log('liking')
console.log(req.body)
  if (Object.keys(req.body).length > 0) {
    const body = {
      usertoken: usertoken,
      cnt_id: cnt_id,
      apptoken: apptoken,
    };
    try {
      const response = await axios.post(
        `https://backend.spilleet.com/likes-new`,
        JSON.stringify(body),
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );

      // creator subsription payload
      const subobjdetails = {
        apptoken: apptoken,
        usertoken: creator,
      };
      // get creator subscription
      const creatorSubObj = await axios.post(
        `https://backend.spilleet.com/getUserSubscription`,
        JSON.stringify(subobjdetails),
        {
          headers: {
            "content-type": "application/json",
          },
        }
      ); 
      
      if (response.data.success === false) {
        res.status(200).json(response.data);
      } else {
        res.status(200).json(response.data);

        // check if creator sub object exist; if it does send push else do nothing
        if (creatorSubObj.data.success !==false) {
          creatorSubObj.data.forEach((item) => {
            webpush.sendNotification(
              item.data,
              JSON.stringify({
                title: "Spilleet Notification",
                body: response.data.pushMessage,
              })
            );
          });
        }
      } 
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: "Something went wrong" });
    }
  } else {
    res.status(200).json({success: false, message: "Empty fields"})
  }
});

module.exports = router; 