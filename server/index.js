const express = require("express");
const mongoose = require("mongoose");

const adminRouter = require("./routers/admin");
const authRouter = require("./routers/auth");
const bookRouter = require("./routers/book");
const userRouter = require("./routers/user");
const categoryRouter = require("./routers/category");
const authorRouter = require("./routers/author");
const promotionRouter = require("./routers/promotion");
const favouriteRouter = require("./routers/favourite");

const PORT = process.env.PORT || 5000;
const app = express();
const DB = "mongodb://127.0.0.1:27017/lvtn";

const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,       
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(authRouter);
app.use(adminRouter);
app.use(bookRouter);
app.use(userRouter);
app.use(categoryRouter);
app.use(authorRouter);
app.use(promotionRouter);
app.use(favouriteRouter);



mongoose
  .connect(DB)
  .then(() => {
    console.log("Kết nối thành công !");
  })
  .catch((e) => {
    console.log(e);
  });
app.listen(PORT,"0.0.0.0", () => {
  console.log(`Kết nối tại port ${PORT}`);
});
