const Category = require("../models/category");
const { promisify } = require("util");
const { join } = require("path");
const fs = require("fs");

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    res.json(categories);
  } catch (error) {
    console.error("Error fetching Categorys:", error);

    res.status(500).json({ error: "Failed to fetch Categorys" });
  }
};

const getCategory = async (req, res) => {
  const { slug } = req.params;
  try {
    const Category = await Category.findOne({ slug });
    if (!Category) {
      return res.status(404).send({ message: "Category not found" });
    }
    res.json(Category);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const addCategory = async (req, res) => {
  const { title } = req.body;
  const imgSrc = req.file?.filename;

  const category = new Category({
    title,
    imgSrc,
  });
  try {
    await category.save();
    res.status(201).json({ success: true, message: "Category saved" });
  } catch (err) {
    fs.existsSync(req.file?.path) && fs.unlinkSync(req.file.path);
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

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const Category = await Category.findById(id);
    if (!Category) {
      return res.status(404).json({ message: "Category not found" });
    }
    for (const image of Category.imagesPath) {
      const imagePath = join(
        __dirname,
        "../../client/public/assets/imgs",
        image
      );
      if (fs.existsSync(imagePath)) {
        await deleteFile(imagePath);
      }
    }
    await Category.deleteOne();
    res.json({ message: "Category deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getCategories,
  getCategory,
  addCategory,
  updateSold,
  deleteCategory,
};
