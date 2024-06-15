const express = require("express");
const favouriteRouter = express.Router();
const Favourite = require("../models/favourite");

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
  
  // Thêm vào yêu thích
  favouriteRouter.post("/add-favorite", async (req, res) => {
    const { userId, bookId } = req.body;
    try {
        let favourite = await Favourite.findOne({ userId });

        if (!favourite) {
            favourite = new Favourite({
                userId,
                bookIds: [bookId]  
            });
            await favourite.save();
            return res.status(201).json(favourite);
        }

        if (favourite.bookIds.includes(bookId)) {
            return res.status(200).json(favourite);
        }

        favourite.bookIds.push(bookId);
        await favourite.save();
        res.status(201).json(favourite);
    } catch (error) {
        console.error("Error adding favorite:", error);
        res.status(500).json({ message: "Failed to add favorite" });
    }
});


  // XÓa khỏi ds têu thích
  favouriteRouter.delete("/remove-favorite", async (req, res) => {
    const { userId, bookId } = req.body; 
    console.log("UserID:", userId, "BookID:", bookId); // Debugging log

    try {
        // Find the user's favorite list
        let favourite = await Favourite.findOne({ userId });
        
        // Check if the favourite list exists and if the bookId is in the list
        if (!favourite || !favourite.bookIds.includes(bookId)) {
            return res.status(404).json({ message: "Favorite not found" });
        }

        // Remove the bookId from the user's favorite list
        favourite.bookIds = favourite.bookIds.filter(id => id.toString() !== bookId);
        
        // Save the updated document
        await favourite.save();

        // If the favorite list is empty after removal, delete the document
        if (favourite.bookIds.length === 0) {
            await Favourite.findOneAndDelete({ userId });
            return res.json({ message: "Favorite list deleted successfully" });
        }

        res.json({ message: "Favorite removed successfully", favourite });
    } catch (error) {
        console.error("Error removing favorite:", error);
        res.status(500).json({ message: error.message });
    }
});



module.exports = favouriteRouter;