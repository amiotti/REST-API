const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv/config");
const cors = require("cors");

//IMPORT ROUTES
const postRoute = require("./routes/posts");

//MIDDLEWARES
app.use(express.json());
app.use(cors()); // to avoid CORS problems and fetch

//ROUTES
app.use("/posts", postRoute);

//CONNECT TO DB

mongoose.connect(process.env.DB_CONNECTION, () => {
  console.log("Connected to DB");
});

//SERVER LISTENING
app.listen(3000);
