const mongoose = require("mongoose");

let Author;

try {
    Author = mongoose.model("Author");
} catch (error) {
  const authorsSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  });

  Author = mongoose.model("Author", authorsSchema);
}

module.exports = Author;
