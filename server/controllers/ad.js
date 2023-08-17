const Ad = require("../models/ad");
const { promisify } = require("util");
const { join } = require("path");
const fs = require("fs");

const getAds = async (req, res) => {
  try {
    const ads = await Ad.find();

    res.json(ads);
  } catch (error) {
    console.error("Error fetching Categorys:", error);

    res.status(500).json({ error: "Failed to fetch Categorys" });
  }
};

const getAd = async (req, res) => {
  const { slug } = req.params;
  try {
    const ad = await Ad.findOne({ slug }).populate("user").lean();
    if (!ad) {
      return res.status(404).send({ message: "Ad not found" });
    }
    delete ad.user.password;
    res.json(ad);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getUserAds = async (req, res) => {
  const { id } = req.params;
  try {
    const ad = await Ad.find({ user: id });
    if (!ad) {
      return res.status(404).send({ message: "Ad not found" });
    }
    res.json(ad);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const addListing = async (req, res) => {
  const { title, category, price, description, user } = req.body;
  const imgsSrc = req.files?.map((file) => file.filename);

  const ad = new Ad({
    title,
    category,
    price,
    description,
    imgsSrc,
    user,
  });
  try {
    await ad.save();
    res.status(201).json({ success: true, message: "Ad saved" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateSold = async (req, res) => {
  try {
    const { id } = req.params;
    const Category = await Category.findById(id);
    if (!Category) {
      return res.status(404).json({ message: "Category not found" });
    }
    Category.sold = !Category.sold;
    await Category.save();
    res.status(201).json({ success: true, message: "Sold status updated" });
  } catch (error) {
    res.status(500).json({ message: "Error saving update" });
  }
};

const deleteFile = promisify(fs.unlink);

const deleteAd = async (req, res) => {
  try {
    const { id } = req.params;
    const ad = await Ad.findById(id);
    if (!ad) {
      return res.status(404).json({ message: "Ad not found" });
    }
    for (const image of ad.imgsSrc) {
      const imagePath = join(
        __dirname,
        "../../frontend/public/assets/imgs",
        image
      );
      if (fs.existsSync(imagePath)) {
        await deleteFile(imagePath);
      }
    }
    await ad.deleteOne();
    res.json({ message: "Ad deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAds,
  getAd,
  getUserAds,
  addListing,
  updateSold,
  deleteAd,
};
