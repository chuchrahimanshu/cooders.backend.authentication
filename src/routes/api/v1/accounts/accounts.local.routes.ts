// Import Section
import express, { Router } from "express";
import {
  changePassword,
  signIn,
  signOut,
  signUp,
} from "src/controllers/api/v1/accounts/accounts.local.controller";

// Configuration Section
const router: Router = express.Router();

// Unauthenticated Routes
router.route("/signup").post(signUp);
router.route("/signin").post(signIn);
router.route("/update/password").post(changePassword);

// Authenticated Routes
router.route("/signout").get(signOut);

// Export Section
export default router;
