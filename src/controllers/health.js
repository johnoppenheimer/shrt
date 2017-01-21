import httpStatus from "http-status";

import APIError from "../helpers/api-error";

import { connected as mongoConnected } from "../server/mongo";

function healthCheck(req, res, next) {
    if (!mongoConnected) {
        next(new APIError(["API is not ready"], httpStatus.SERVICE_UNAVAILABLE));
    }
    else {
        res.json({ "status": req.__("Healthy") });
    }
}

export default { healthCheck };