require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { init: initSF } = require("./config/salesforce");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.static("public")); // serve the pages ✨

app.use(cors());
app.use(express.json());

app.use("/login", require("./routes/auth"));
app.use("/schedules", require("./routes/schedules"));
app.use("/sessions", require("./routes/sessions"));

app.get("/", (_, res) => res.redirect("/login.html"));

// res.send("Guide Attendance API running 🚀")
// Boot sequence
(async () => {
  await initSF(); // 1️⃣ connect to Salesforce
  app.listen(PORT, () => console.log(`🌐  http://localhost:${PORT}`));
})();
