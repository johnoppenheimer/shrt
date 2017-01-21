import express from "express";

import healthRoutes from "./health";

const router = express.Router();

router.get("/", (req, res) => {
    res.json({
        "message": req.__("Shrt API")
    });
});

router.use("/health-check", healthRoutes);

export default router;
