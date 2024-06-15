const express = require("express");
const favouriteRouter = express.Router();
const Favorite = require("../models/favourite");

// GET all favorites of a user
favouriteRouter.get("/favorite/:userId", async (req, res) => {
    try {
      const userId = req.params.userId;
      const favorites = await Favorite.find({ userId }).populate("bookId");
      res.json(favorites);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // POST add a favorite for a user
  favouriteRouter.post("/add-favorite", async (req, res) => {
    const { userId, bookId } = req.body;
    console.log(userId, bookId);
    try {
      const existingFavorite = await Favorite.findOne({ userId, bookId });
      if (existingFavorite) {
        return res.status(400).json({ message: "Favorite already exists" });
      }
      const newFavorite = new Favorite({ userId, bookId });
      await newFavorite.save();
      res.status(201).json(newFavorite);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // DELETE remove a favorite for a user
  favouriteRouter.delete("/remove-favorite", async (req, res) => {
    const { userId, bookId } = req.body;
    try {
      const deletedFavorite = await Favorite.findOneAndDelete({ userId, bookId });
      if (!deletedFavorite) {
        return res.status(404).json({ message: "Favorite not found" });
      }
      res.json({ message: "Favorite deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })

module.exports = favouriteRouter;