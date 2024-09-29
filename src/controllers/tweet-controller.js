import upload from "../config/file-upload-s3-config.js"; // Make sure this path is correct
import TweetService from "../services/tweet-services.js";

//for multiple image
// const multiUploader = upload.array("image", 10);

const tweetService = new TweetService();
export const createTweet = async (req, res) => {
  try {
    upload.array("image", 10)(req, res, async function (err, data) {
      if (err) {
        return res.status(500).json({
          error: err,
        });
      }
      const payload = { ...req.body };
      let location = [];
      for (let index = 0; index < req.files.length; index++) {
        const element = req.files[index];
        location.push(element.path);
      }

      payload.image = location;
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
