import Tweet from '../models/tweet.js';

class TweetRepository {
    constructor(){
        super(Tweet)
    }
    async getWithComments(tweetId) {
        try {
            const tweet = await Tweet.findById(tweetId).populate({ path: 'comments' }).lean();
            return tweet;
        } catch (error) {
            console.log(error);
        }
    }
}

export default TweetRepository;