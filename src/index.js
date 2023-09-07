const express = require('express');
const app = express();

const connect = require('./config/database');
const TweetRepository = require('./repository/tweet-repository')
const Comment = require('./models/comment');

app.listen(3000, async ()=>{
    console.log("Server started");
    connect();
    console.log("Successfully connected to mongodb")
})