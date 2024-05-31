const express = require("express");
const productRouter = express.Router();
const auth = require("../middlewares/auth");
const { Product } = require("../models/product");
const { Category } = require("../models/category");

productRouter.get("/api/products/", auth, async (req, res) => {
  try {
    let query = {};
    if (req.query.category) {
      query.categories = { $in: req.query.category.split(",") };
    }

    const products = await Product.find(query);
    res.json(products);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// create a get request to search products and get them
// /api/products/search/i
productRouter.get("/api/products/search/:name", auth, async (req, res) => {
  try {
    const products = await Product.find({
      name: { $regex: req.params.name, $options: "i" },
    });

    res.json(products);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// create a post request route to rate the product.
productRouter.post("/api/rate-product", auth, async (req, res) => {
  try {
    const { id, rating } = req.body;
    let product = await Product.findById(id);

    for (let i = 0; i < product.ratings.length; i++) {
      if (product.ratings[i].userId == req.user) {
        product.ratings.splice(i, 1);
        break;
      }
    }

    const ratingSchema = {
      userId: req.user,
      rating,
    };

    product.ratings.push(ratingSchema);
    product = await product.save();
    res.json(product);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

productRouter.get("/api/deal-of-day", auth, async (req, res) => {
  try {
    let products = await Product.find({});

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

productRouter.get("/api/best-sellers", auth, async (req, res) => {
  try {
    let products = await Product.find({});
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


productRouter.get("/api/product-categories/:productId", auth, async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const categoryIds = product.categories;
    const categories = await Category.find({ _id: { $in: categoryIds } });
    const categoryNames = categories.map(category => category.name);
    res.json(categoryNames);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});





module.exports = productRouter;