import mongoostatic from "mongoosastic";
import httpStatus from "http-status";

import elastic from "../server/elastic";
import APIError from "../helpers/api-error";
import mongoose from "../server/mongo";

export const LinkSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
        unique: true
    },
    url: {
        type: String,
        required: true,
        es_indexed: true,
        match: [/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/, "The value of path {PATH} ({VALUE}) is not a valid URL."]
    },
    requests: {
        type: Number,
        default: 0
    }
}, {
    timestamps: {}
});

LinkSchema.statics = {
    /**
     * Check if link exist
     * @param {String} id - this _id of Link
     * @returns {Promise<Boolean>}
     */
    exist(id) {
        return this.findById(id)
            .exec()
            .then(link => {
                return link !== null;
            });
    },

    /**
     * Get link
     * @param {string} id - This _id of Link
     * @returns {Promise<User, Error>}
     */
    get(id) {
        return this.findById(id)
            .exec()
            .then(link => {
                if (link) {
                    return link;
                }
                const err = new APIError(["No such link exists"], httpStatus.NOT_FOUND);
                return Promise.reject(err);
            })
            .catch(err => {
                return Promise.reject(err);
            });
    },

    /**
     * List links in descending order of 'createdAt' timestamps
     * @param {number} skip - Number of links to be skipped
     * @param {number} limit - Limit number of links to be returned
     * @returns {Promise<Link[]}
     */
    list({skip = 0, limit = 0} = {}) {
        return this.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .exec();
    },

    /**
     * Create a new link
     * @param {string} url
     * @returns {Promise<Link>}
     */
    create(id, url) {
        let link = new this();
        link._id = id;
        link.url = url;
        return link.save()
            .then(l => {
                return l;
            })
            .catch(e => {
                return Promise.reject(e);
            });
    }
};

LinkSchema.plugin(mongoostatic, {
    esClient: elastic
});

/**
 * @typedef Link
 */
export default mongoose.model("Link", LinkSchema);