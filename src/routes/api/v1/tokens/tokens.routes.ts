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
router.route("/creates/tfa").get(generateTFAToken);
router.route("/validates/tfa").get(verifyTFAToken);
router.route("/creates/email").get(generateEmailVerificationToken);
router.route("/validates/email").get(verifyEmailVerificationToken);
router.route("/creates/password").get(generateForgetPasswordToken);
router.route("/validates/password").get(verifyForgetPasswordToken);

// Export Section
export default router;
