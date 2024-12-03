const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
  res.json({ message: "same repo frontend backend setup trial" });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});

module.exports = app;
