import { TweetRepository, HashtagRepository } from "../repository/index.js";

class TweetService {
  constructor() {
    this.tweetRepository = new TweetRepository();
    this.hashtagRepository = new HashtagRepository();
  }

  async create(data) {
    try {
      // Extract hashtags from the tweet content using regex pattern to find all words starting with '#'
      const content = data.content;

      // Extract hashtags from the tweet content using regex pattern to find words starting with '#'
      // Convert each hashtag to lowercase for consistency and remove the '#' symbol
      let tags = content.match(/#[a-zA-Z0-9_]+/g) || []; // Handle null when no hashtags are found
      tags = tags.map((tag) => tag.substring(1).toLowerCase());

      // Create the tweet in the database using the provided data
      const tweet = await this.tweetRepository.create(data);

      // Fetch hashtags that already exist in the database matching the extracted tags
      let existingTags = await this.hashtagRepository.findByName(tags);

      // Extract the 'title' field of the existing hashtags (since the title is the hashtag name)
      let titleOfExistingTags = existingTags.map((tag) => tag.title);

      // Filter out tags that are not already present in the database
      let newTags = tags.filter((tag) => !titleOfExistingTags.includes(tag));

      // Prepare new hashtag objects, associating the current tweet's ID with each new tag
      newTags = newTags.map((tag) => {
        return { title: tag, tweets: [tweet.id] };
      });

      // Bulk insert the new hashtags into the database if there are any new tags to be inserted
      if (newTags.length > 0) {
        await this.hashtagRepository.bulkCreate(newTags);
      }

      // For existing hashtags, add the current tweet's ID to their associated 'tweets' array
      existingTags.forEach((tag) => {
        tag.tweets.push(tweet.id); // Push the tweet ID to the existing hashtag's 'tweets' array
        tag.save(); // Save the updated hashtag back to the database
      });

      // Return the created tweet object
      return tweet;
    } catch (error) {
      // Catch any errors during the process and log the error message
      console.error("Error in TweetService:", error);
      throw { error }; // Re-throw the error so it can be handled by higher layers
    }
  }

  async get(tweetId) {
    try {
      const tweet = this.tweetRepository.getWithComments(tweetId);
      return tweet;
    } catch (error) {
      console.log(error);
    }
  }
}

export default TweetService;
