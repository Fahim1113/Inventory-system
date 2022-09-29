import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const app = express();

app.use(cors());

const DB = process.env.InventorySystem_MongoDB;
mongoose.connect(DB);

//schemas

const UserSchema = new mongoose.Schema({
  username: { required: true, type: String },
  password: { required: true, type: String },
});
const User = mongoose.model("users", UserSchema);

const ShopSchema = new mongoose.Schema({
  owner: { required: true, type: String },
  name: { required: true, type: String },
  description: { required: true, type: String },
});
const Shop = mongoose.model("shops", ShopSchema);

const ItemSchema = new mongoose.Schema({
  owner: { required: true, type: String },
  name: { required: true, type: String },
  price: { required: true, type: String },
  stock: { required: true, type: String },
  shopName: { required: true, type: String },
});
const Item = mongoose.model("items", ItemSchema);
//express routes

app.get("/login", (req, res) => {
  User.find({ username: req.query.username }).then((val) => {
    if (val.length === 0) {
      res.send({ success: false });
    } else {
      if (
        val[0].username === req.query.username &&
        val[0].password === req.query.password.toString()
      ) {
        res.send({ success: true });
      } else {
        res.send({ success: false });
      }
    }
  });
});

app.get("/register", (req, res) => {
  User.find({ username: req.query.username }).then((val) => {
    if (val.length === 0) {
      const user = new User({
        username: req.query.username,
        password: req.query.password,
      });
      user
        .save()
        .then((result) => {})
        .catch((err) => {
          console.log(err);
        });
      res.send({ success: true });
    } else {
      res.send({ success: false });
    }
  });
});

app.get("/add-shop", (req, res) => {
  Shop.find({ owner: req.query.owner, name: req.query.name }).then(
    (response) => {
      if (response.length === 0) {
        new Shop({
          owner: req.query.owner,
          name: req.query.name,
          description: req.query.description,
        }).save();

        res.send({ success: true });
      } else {
        res.send({
          success: false,
          reason: "The shop with the same name already exists",
        });
      }
    }
  );
});

app.get("/get-shop", (req, res) => {
  Shop.find({ owner: req.query.owner }).then((response) => {
    res.send(response);
  });
});

app.get("/add-item", (req, res) => {
  Item.find({
    owner: req.query.owner,
    name: req.query.name,
    shopName: req.query.shopName,
  }).then((response) => {
    if (response.length === 0) {
      new Item({
        owner: req.query.owner,
        name: req.query.name,
        stock: req.query.stock,
        price: req.query.price,
        shopName: req.query.shopName,
      }).save();

      res.send({ success: true });
    } else {
      res.send({
        success: false,
        reason: "The item with the same name already exists",
      });
    }
  });
});

app.get("/get-item", (req, res) => {
  Item.find({owner: req.query.owner, shopName: req.query.shopName})
  .then((response) => {
    res.send(response)
  })
});

app.listen(4000, () => {
  console.log(`Server started on port`);
});
