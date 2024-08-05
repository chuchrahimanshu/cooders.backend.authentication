// Import Section
import app from "src/app";
import { PORT } from "./utils/env.util";
import router from "./routes/index.routes";

// Routes and Server
app.use("/", router);
app.listen(PORT, () => {
  try {
    console.log(`Success - Server connected at http://localhost:${PORT}`);
  } catch (error) {
    console.log(`Error - Connecting server at http://localhost:${PORT}`);
    return;
  }
});
