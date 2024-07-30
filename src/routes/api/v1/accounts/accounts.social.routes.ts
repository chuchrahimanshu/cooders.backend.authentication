// Import Section
import express, { Router } from "express";
import {
  githubOAuth,
  googleOAuth,
  linkedinOAuth,
} from "src/controllers/api/v1/accounts/accounts.social.controller";

// Configuration Section
const router: Router = express.Router();

// Routes Section
router.route("/google").get(googleOAuth);
router.route("/github").get(githubOAuth);
router.route("/linkedin").get(linkedinOAuth);

// Export Section
export default router;
