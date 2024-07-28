// Import Section
import express from "express";
import "dotenv/config";
import "src/config/database.config";
import morgan from "morgan";

// Configuration Section
const app = express();

// Middleware Section
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

// Export Section
export default app;
