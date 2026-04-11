const connectDB = require("./src/config/database");
const { runBot } = require("./src/bot");
const express = require("express");
const cors = require("cors");
const userRoutes = require("./src/routes/userRoutes");
const adminRoutes = require("./src/routes/adminRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);

connectDB();
// runBot();

app.listen(8000, () => {
  console.log("Server running on http://localhost:8000");
});
