const express = require("express");
const categoryRouter = express.Router();
const Category = require("../models/category");

categoryRouter.get("/api/categories", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = categoryRouter;