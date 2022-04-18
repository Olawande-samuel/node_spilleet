const express = require("express");
const cors = require("cors");
const { default: axios } = require("axios");
const router = express.Router();
const webpush = require("../WP/notifications");
router.post("/comment", cors(), async (req, res) => {
  const { comment, usertoken, cmt_id, cnt_id, apptoken, creator } = req.body;

  const data = {
    apptoken: apptoken,
    usertoken: usertoken,
    cnt_id: cnt_id,
    comment: comment,
    cmt_id_cmt: cmt_id ? cmt_id : "",
  };
  try {
    const response = await axios.post(
      `https://backend.spilleet.com/add-comment-new`,
      JSON.stringify(data),
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );

   

      const subobjdetails = {
          apptoken,
          usertoken: creator
      }
    if (response.data.success === true) {
      res.status(200).json(response.data);
      const userObject = await axios.post(
        `https://backend.spilleet.com/getUserSubscription`,
        JSON.stringify(subobjdetails),
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );
       

      if (userObject.data.success !==false) {
        userObject.data.forEach((item)=>{
          webpush.sendNotification(
            item.data,
            JSON.stringify({
              title: "Spilleet Notification",
              body: response.data.note,
            })
          );

        })
      }
    } else { 
      res.status(200).json(response.data);
    }
  } catch (error) {
    res.status(500).json({success: false, message: "Something went wrong"})
  }
});

module.exports = router;
