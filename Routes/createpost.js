const express = require("express");
const cors = require("cors");
const { default: axios } = require("axios");
const router = express.Router();
const formidable = require("formidable");
const multer = require("multer");
const upload = multer();
const webpush = require("../WP/notifications");
const { default: FormData } = require("form-data");
router.post("/create-post", cors(), async (req, res, next) => {
  const { apptoken, usertoken, message } = req.body;

  if (Object.keys(req.body).length > 0) {
    try {
      const getAllSubs = await axios.post(
        `${process.env.ENDPOINT_URL}/getAllSubscriptions`,
        JSON.stringify({ apptoken: apptoken, usertoken: usertoken }),
        {
          headers: {
            "content-type": "application/json",
          },
        }
        );
        res.status(200).json(getAllSubs.data);

      if (getAllSubs.data.success !== false) {
        getAllSubs.data.forEach((item) => {
          webpush.sendNotification(
            item.data,
            JSON.stringify({
              title: "Spilleet: New Post!",
              body: message,
            })
          );
        });
      }
    } catch (error) {
      res.status(500).json({error: error.message });
    }
  }
});

module.exports = router;
