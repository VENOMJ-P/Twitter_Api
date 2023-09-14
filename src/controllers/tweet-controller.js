import TweetService from "../services/tweet-services.js";

import upload from "../config/file-upload-s3-config.js";

//this is for upload single file or image
const singleUploader = upload.single("image");

const tweetService = new TweetService();

export const createTweet = async (req, res) => {
  try {
    singleUploader(req, res, async function (err, data) {
      if (err) {
        return res.status(500).json({
          error: err,
        });
      }
      console.log("image url", req.file);
      const payload = { ...req.body };
      payload.image = req.file.location;
      const response = await tweetService.create(payload);
      return res.status(201).json({
        success: true,
        message: "Successfully created a new tweet",
        data: response,
        err: {},
      });
    });
  } catch (error) {
    return res.status(501).json({
      success: false,
      message: "Something went wrong",
      data: {},
      err: error,
    });
  }
};

export const getTweet = async (req, res) => {
  try {
    const response = await tweetService.get(req.params.id);
    return res.status(201).json({
      success: true,
      message: "Successfully fetch a tweet",
      data: response,
      err: {},
    });
  } catch (error) {
    return res.status(501).json({
      success: false,
      message: "Something went wrong",
      data: {},
      err: error,
    });
  }
};
