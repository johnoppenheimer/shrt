import express from "express";

import healthRoutes from "./health";
import linkRoutes from "./links";

const router = express.Router();

router.get("/", (req, res) => {
    res.json({
        "message": req.__("Shrt API")
    });
});

router.use("/health-check", healthRoutes);
router.use("/links", linkRoutes);

export default router;
