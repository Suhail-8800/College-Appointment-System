const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");


// Load env
dotenv.config();

// Connect DB
connectDB();

const app = express();
const authRoutes = require("./routes/auth.routes");
const authMiddleware = require("./middleware/auth.middleware");
const professorRoutes = require("./routes/professor.routes");
const studentRoutes = require("./routes/student.routes");

// Middleware
app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/api/professor", professorRoutes);
app.use("/api/student", studentRoutes);



// Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.get("/api/test", authMiddleware, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user,
  });
});
// IMPORTANT: KEEP SERVER RUNNING
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});