const express = require('express');
const app = express();

const connect = require('./config/database');

const { TweetRepository } = require('./repository/index');
const TweetService = require('./services/tweet-services')
app.listen(3000, async () => {
    console.log("Server started");
    connect();
    console.log("Successfully connected to mongodb")
    this.tweetService = new TweetService();
    const tweet = await this.tweetService.create({
        content: 'My #tweet is working'
    })
    console.log(tweet);
})