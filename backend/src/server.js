const mongoose = require("mongoose");
const app = require("./app");
const PORT = 3000;

mongoose
  .connect("mongodb://127.0.0.1:27017/SoulScouts", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
