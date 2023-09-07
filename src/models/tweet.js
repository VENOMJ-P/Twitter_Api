import mongoose from 'mongoose';

const tweetSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        max: [250, "Tweet cannot be more than 250 characters"] // max: [range,error]
    },
    hashtag: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Hashtag'
        }
    ]
}, {
    timestamps: true //This helps to give createdAt and updatedAt
});

const Tweet = mongoose.model('Tweet', tweetSchema);
export default Tweet;