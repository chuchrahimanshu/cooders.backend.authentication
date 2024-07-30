// Import Section
import express, { Router } from "express";
import {
  generateEmailVerificationToken,
  generateForgetPasswordToken,
  generateTFAToken,
  verifyEmailVerificationToken,
  verifyForgetPasswordToken,
  verifyTFAToken,
} from "src/controllers/api/v1/tokens/tokens.controller";

// Configuration Section
const router: Router = express.Router();

// Unauthenticated Routes
router.route("/creates/tfa").post(generateTFAToken);
router.route("/validates/tfa").post(verifyTFAToken);
router.route("/creates/email").post(generateEmailVerificationToken);
router.route("/validates/email").post(verifyEmailVerificationToken);
router.route("/creates/password").post(generateForgetPasswordToken);
router.route("/validates/password").post(verifyForgetPasswordToken);

// Authenticated Routes

// Export Section
export default router;
