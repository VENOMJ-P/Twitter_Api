import express from 'express';
const app = express();

import {connect} from './config/database.js';

import TweetService from './services/tweet-services.js';

app.listen(3000, async () => {
    console.log("Server started");
    connect();
    console.log("Successfully connected to mongodb")
   const tweetService = new TweetService();
    const tweet = await tweetService.create({
        content: 'This tweet came from es6 module Done #refactor'
    })
    console.log(tweet);
})