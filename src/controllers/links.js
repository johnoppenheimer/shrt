import Link from "../models/link";

/**
 * Load link and append to req
 */
function load(req, res, next, id) {
    Link.get(id)
        .then(link => {
            req.link = link;
            return next();
        })
        .catch(e => next(e));
}

/**
 * Get link
 * @returns {Link}
 */
function get(req, res) {
    return res.json(req.link);
}

/**
 * Create new link
 * @property {string} req.body.url
 */
function create(req, res, next) {
    //Let's check if this url is already in the DB
    Link.findOne({url: req.body.url})
        .then(link => {
            console.log(link);
            if (link) {
                return link;
            }

            return Link.create(generateID(), req.body.url);
        })
        .then(link => {
            console.log(link);
            res.json(link);
        })
        .catch(e => next(e));
}

/**
 * Delete link
 */
function remove(req, res, next) {
    const link = req.link;
    link.remove()
        .then(link => {
            return res.json(link);
        })
        .catch(e => next(e));
}

function generateID() {
    return ("0000" + (Math.random()*Math.pow(36,4) << 0).toString(36)).slice(-4)
}

export default {load, get, create, remove};