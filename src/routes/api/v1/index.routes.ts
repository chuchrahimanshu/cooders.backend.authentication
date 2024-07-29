// Import Section
import express, { Router } from "express";
import accountRouter from "./accounts.routes";
import tokenRouter from "./tokens.routes";
import verificationRouter from "./verifications.routes";

// Configuration Section
const router: Router = express.Router();

// Middleware Routes
router.use("/accounts", accountRouter);
router.use("/tokens", tokenRouter);
router.use("/verifications", verificationRouter);

// Export Section
export default router;
