// Import Section
import app from "src/app";
import { PORT } from "./utils/env.util";

// Routes and Server
app.listen(PORT, () => {
  try {
    console.log(`Success - Server connected at http://localhost:${PORT}`);
  } catch (error) {
    console.log(`Error - Connecting server at http://localhost:${PORT}`);
    return;
  }
});
