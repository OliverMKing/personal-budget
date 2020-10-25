const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const budgetItemsModel = require("./models/budget_items_schema");
const budget = require("./budget.json");

const app = express();
const port = 3000;
const mongoUrl = "mongodb://localhost:27017/budget";

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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
          res.status(400).send();
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/budget", (req, res) => {
  // Connect to the mongo database
  mongoose
    .connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      // Add to the database based on req
      let newBudgetItem = new budgetItemsModel({
        title: req.body.title,
        value: req.body.value,
        color: req.body.color,
      });

      budgetItemsModel
        .insertMany(newBudgetItem)
        .then((data) => {
          res.json(data);
          mongoose.connection.close();
        })
        .catch((err) => {
          console.log(err);
          res.status(400).send();
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(port, () => {
  console.log(`API served at http://localhost:${port}`);
});
