import express from "express";
import connectDB from "./config/db.js";
import todoRoutes from "./routes/todoRoutes.js";
import config from "./config/index.js";
// import userRoutes from "./routes/userRoutes.js";

const app = express();
const { PORT } = config;

app.use(express.json());

// app.use("/api/users", userRoutes);
app.use("/api/todos", todoRoutes);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("DB Error:", error);
    process.exit(1);
  });
