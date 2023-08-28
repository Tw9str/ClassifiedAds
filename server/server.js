const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
const helmet = require("helmet");
const { addCategory, getCategories } = require("./controllers/category");
const { login, register } = require("./controllers/user");
const {
  addListing,
  getAds,
  getUserAds,
  deleteAd,
  getAd,
  getCategoryAds,
} = require("./controllers/ad");
const verifyToken = require("./middleware/auth");
const verifyAdOwner = require("./middleware/verifyAdOwner");
require("dotenv").config();

// Middleware
const app = express();
app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../client/public/images");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname.replace(/\s/g, "-")}`);
  },
});

const upload = multer({ storage });

app.post("/api/category/add", upload.single("img"), addCategory);
app.get("/api/categories", getCategories);
app.get("/api/categories/:title", getCategoryAds);
app.post("/api/auth/login", login);
app.post("/api/auth/register", register);
app.post("/api/listing/add", verifyToken, upload.array("imgs"), addListing);
app.delete("/api/listing/delete/:id", verifyToken, verifyAdOwner, deleteAd);
app.get("/api/:username/ads", getUserAds);
app.get("/api/ads", getAds);
app.get("/api/ad/:slug", getAd);

/* Server */
const DB_URI = process.env.DB_URI;

const PORT = process.env.PORT || 5000;

mongoose
  .connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    })
  )
  .catch((err) => console.log(err));
