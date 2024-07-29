// Import Section
import express, { Router } from "express";
import v1Router from "./v1/index.routes";

// Configuration Section
const router: Router = express.Router();

// Middleware Routes
router.use("/v1", v1Router);

// Export Section
export default router;
