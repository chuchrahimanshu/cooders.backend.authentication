// Import Section
import express, { Router } from "express";
import accountRouter from "./accounts/accounts.routes";
import tokenRouter from "./tokens/tokens.routes";

// Configuration Section
const router: Router = express.Router();

// Middleware Routes
router.use("/accounts", accountRouter);
router.use("/tokens", tokenRouter);

// Export Section
export default router;
