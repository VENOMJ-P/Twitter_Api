import express from "express";
import bodyParser from "body-parser";
const app = express();

import { connect } from "./config/database.js";
import apiRoutes from "./routes/index.js";

import { UserRepository, TweetRepository } from "./repository/index.js";
import LikeService from "./services/like-service.js";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use("/api", apiRoutes);

app.listen(3000, async () => {
  console.log("Server started");
  connect();
  console.log("Successfully connected to mongodb");

  const userRepo = new UserRepository();
  const tweetRepository = new TweetRepository();
  const tweet = await tweetRepository.find('6500666d5e4aebb9cb6e3e9d')
  const user = await userRepo.get('650059a154ec80e1c6712cab')
  const likeService = new LikeService();
  await likeService.toggleLike(tweet.id,'Tweet',user.id);
});
