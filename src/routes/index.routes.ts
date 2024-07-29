// Import Section
import express, { Router } from "express";
import apiRouter from "./api/index.routes";

// Configuration Section
const router: Router = express.Router();

// Middleware Routes
router.use("/api", apiRouter);

// Export Section
export default router;
