// Import Section
import express, { Router } from "express";
import localRouter from "./accounts.local.routes";
import socialRouter from "./accounts.social.routes";

// Configuration Section
const router: Router = express.Router();

// Middleware Section
router.use("/local", localRouter);
router.use("/social", socialRouter);

// Export Section
export default router;
