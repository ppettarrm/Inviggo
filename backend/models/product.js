const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  username: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  city: { type: String, required: true },
  date: { type: String, required: true },
});

module.exports = mongoose.model("Product", productSchema);
