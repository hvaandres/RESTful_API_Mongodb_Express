const express = require("express");
const mongoose = require("mongoose");
const { MONGO_URI } = require("./config");

// routes/API

const postRoutes = require("./routes_api/posts");

const app = express();

// BodyParser

app.use(express.json());

// Connect to MongoDB

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Database Successfully Connected"))
  .catch((err) => console.log(err));

// User routes

app.use("/api/posts", postRoutes);

const PORT = process.env.POST || 3000;

app.listen(PORT, () =>
  console.log(`Connection Successful. We are using port ${PORT}`)
);
