const mongoose = require("mongoose");
const app = require("./app");
const PORT = 5001;

mongoose
  .connect("mongodb://127.0.0.1:27017/SoulScout", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB SoulScout database");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });