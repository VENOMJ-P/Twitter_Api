const Hashtag = require('../models/hashtags');

class HashtagRepository {

    async create(data) {
        try {
            const hashtag = await Hashtag.create(data);
            return hashtag;
        } catch (error) {
            console.log(error);
        }
    }

    async bulkCreate(data) {
        try {
            const hashtags = await Hashtag.insertMany(data);
            return hashtags;
        } catch (error) {
            console.log(error);
        }
    }

    async get(HashtagId) {
        try {
            const hashtag = await Hashtag.findById(HashtagId);
            return hashtag;
        } catch (error) {
            console.log(error);
        }
    }

    async destroy(HashtagId) {
        try {
            const hashtag = await Hashtag.findByIdAndDelete(HashtagId);
            return hashtag;
        } catch (error) {
            console.log(error);
        }
    }

    async findByName(titleList) {
        try {
            const hashtags = await Hashtag.find({
                title: titleList
            });
            return hashtags;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = HashtagRepository;