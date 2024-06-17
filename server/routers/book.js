const express = require("express");
const bookRouter = express.Router();
const auth = require("../middlewares/auth");
const { Book } = require("../models/book");
const Category = require('../models/Category');

// Endpoint lấy tất cả
bookRouter.get("/api/products", async (req, res) => {
  try {
    let query = {};
    if (req.query.category) {
      query.categories = { $in: req.query.category.split(",") };
    }

    const products = await Book.find(query);
    res.json(products);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
// Endpoint lấy sản phẩm theo ID
bookRouter.get("/api/products/:id", async (req, res) => {
  try {
    const product = await Book.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Endpoint tìm kiếm
bookRouter.get("/api/products/search/:name", auth, async (req, res) => {
  try {
    const products = await Book.find({
      name: { $regex: req.params.name, $options: "i" },
    });

    res.json(products);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//Khuyến mãi hôm nay 
bookRouter.get("/api/deal-of-day", auth, async (req, res) => {
  try {
    let products = await Book.find({});

    products = products.sort((a, b) => {
      let aSum = 0;
      let bSum = 0;

      for (let i = 0; i < a.ratings.length; i++) {
        aSum += a.ratings[i].rating;
      }

      for (let i = 0; i < b.ratings.length; i++) {
        bSum += b.ratings[i].rating;
      }
      return aSum < bSum ? 1 : -1;
    });

    res.json(products[0]);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//sách bán chạy
bookRouter.get("/api/best-sellers", auth, async (req, res) => {
  try {
    let products = await Book.find({});
    products = products.sort((a, b) => {
      let aSum = a.ratings.reduce((sum, rating) => sum + rating.rating, 0);
      let bSum = b.ratings.reduce((sum, rating) => sum + rating.rating, 0);
      return bSum - aSum;
    });
    const bestSellers = products.slice(0, 3);
    res.json(bestSellers);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

bookRouter.get("/api/product-categories/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Book.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const categoryIds = product.categories;
    const categories = await Category.find({ _id: { $in: categoryIds } });
    const categoryNames = categories.map(category => ({ _id: category._id, name: category.name }));

    res.json(categoryNames);
  } catch (error) {
    console.error("Error fetching categories:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports =bookRouter;
