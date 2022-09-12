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
  shopsOwned: { required: true, type: [Array] },
});
const User = mongoose.model("users", UserSchema);

//express routes

app.get("/login", (req, res) => {
  User.find({ username: req.query.username }).then((val) => {
    if (val === []) {
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
    if (val.length===0) {
      const user = new User({
        username: req.query.username,
        password: req.query.password,
        cart: [],
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

app.listen(4000, () => {
  console.log("Server started on port 4000");
});
