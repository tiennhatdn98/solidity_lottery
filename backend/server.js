const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const route = require("./src/routes");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

mongoose.connect(
  `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_DATABASE}.ym2yo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  () => {
    console.log("Connect DB successfully!");
  }
);

route(app);

app.listen(PORT, () => {
  console.log(`Sever is now listening at port ${PORT}`);
});
