const express = require("express");
const authorRouter = express.Router();
const Author = require("../models/author");

authorRouter.get("/author/:id", async (req, res) => {
    try {
      const authorId = req.params.id;
      const author = await Author.findById(authorId);
      if (!author) {
        return res.status(404).json({ error: "Không tìm thấy tác giả" });
      }
      res.json({ name: author.name });
    } catch (error) {
      res.status(500).json({ error: "Có lỗi xảy ra" });
    }
  });

module.exports = authorRouter;