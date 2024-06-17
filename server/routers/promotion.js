const express = require("express");
const promotionRouter = express.Router();
const Gift = require("../models/gift");

promotionRouter.get("/check-gift", async (req, res) => {
  try {
    const finalPrice = req.query.finalPrice;
    console.log(finalPrice);

    if (isNaN(finalPrice) || finalPrice <= 0) {
      return res.status(400).json({ message: "Giá trị không hợp lệ" });
    }

    const gift = await Gift.findOne({ gift_price: { $lte: finalPrice } })
                           .sort({ gift_price: -1 });
    console.log(gift);
    if (!gift) {
      return res.status(200).json({ message: "Không có quà tặng phù hợp" });
    }

    res.status(200).json({ gift });
  } catch (error) {
    console.error("Error checking gifts:", error);
    res.status(500).json({ message: "Đã xảy ra lỗi khi kiểm tra quà tặng" });
  }
});

module.exports = promotionRouter;
