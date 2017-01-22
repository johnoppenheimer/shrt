import express from "express";
import httpStatus from "http-status";

import healthRoutes from "./health";
import linkRoutes from "./links";
import Link from "../models/link";
import APIError from "../helpers/api-error";

const router = express.Router();

router.get("/", (req, res) => {
    res.json({
        "message": req.__("Shrt API")
    });
});

router.get("/:linkId", (req, res, next) => {
    Link.get(req.params.linkId)
        .then(link => {
            if (link) {
                res.redirect(link.url);
            }
            else {
                next(new APIError(["This link does not exist"], httpStatus.NOT_FOUND));
            }
        })
        .catch(e => next(e));
});

router.use("/health-check", healthRoutes);
router.use("/links", linkRoutes);

export default router;
