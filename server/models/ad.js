const mongoose = require("mongoose");

const adSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imgsSrc: {
      type: [String],
      validate: (v) => Array.isArray(v) && v.length > 0,
    },
    slug: {
      type: String,
      unique: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

adSchema.pre("save", function (next) {
  this.slug = generateSlug(this.title, this.category, this._id);
  next();
});

function generateSlug(title, category, _id) {
  const slug = `${_id} ${category} ${title}`.toLowerCase().replace(/\s+/g, "-");
  return slug;
}

const Ad = mongoose.model("Ad", adSchema);

module.exports = Ad;
