const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const budgetItemsModel = require("./models/budget_items_schema");
const budget = require("./budget.json");

const app = express();
const port = 3000;
const mongoUrl = "mongodb://localhost:27017/budget";

app.use(cors());

app.get("/hello", (req, res) => {
  res.send("Hello World!");
});

app.get("/budget", (req, res) => {
  // Old code to read from local JSON file
  // res.json(budget);

  // Connect to the mongo database
  mongoose
    .connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      // Find all data on the budget_items collection
      budgetItemsModel
        .find({})
        .then((data) => {
          res.json(data);
          mongoose.connection.close();
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(port, () => {
  console.log(`API served at http://localhost:${port}`);
});
