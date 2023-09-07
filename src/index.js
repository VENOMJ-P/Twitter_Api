const express = require('express');
const app = express();

const connect = require('./config/database');
const TweetRepository = require('./repository/tweet-repository')
const Comment = require('./models/comment');

app.listen(3000, async ()=>{
    console.log("Server started");
    connect();
    console.log("Successfully connected to mongodb")

    // create a tweet with comment where UserEmail is not mandatory
    const tweetRepository = new TweetRepository();
    // const tweet = await tweetRepository.create({
    //     content: "This is First tweet",
    //     userEmail: "user1@google.com"
    // });
    // const comment = await Comment.create({
    //     content: "This is Second comment of First tweet",
    //     email:"user3@google.com"
    // })
    // tweet.comments.push(comment);
    // await tweet.save();
    const tweet = await tweetRepository.getWithComments("64f981217f2c40e48c3476fa")
    
    console.log(tweet);
})