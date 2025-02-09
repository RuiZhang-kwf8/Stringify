require("dotenv").config();
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/SpotifyBackend.js"); 

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes); 

app.listen(5001, () => {
  console.log("Backend running on http://localhost:5001");
});
