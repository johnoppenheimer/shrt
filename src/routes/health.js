import express from "express";

import healthCtrl from "../controllers/health";

const router = express.Router();

router.get("/", healthCtrl.healthCheck);

export default router;