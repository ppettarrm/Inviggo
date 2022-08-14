const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  date: { type: String, required: true },
  tel: { type: Number, required: true, unique: true },
  products: [{ type: mongoose.Types.ObjectId, required: true, ref: "Product" }],
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
