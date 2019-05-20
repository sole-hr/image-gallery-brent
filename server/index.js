const dotenv = require("dotenv").config();
console.log("ENV VARIABLES ", process.env.PORT);
const express = require("express");
const app = express();
const {
  Shoe
} = require("../database/index.js");
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");

app.use(express.static(__dirname + "/../client/dist"));

app.get("/api/:info/:sku", (req, res) => {
  const sku = req.params.sku;
  const info = req.params.info;
  if (info === "title") {
    Shoe.findOne({
        sku
      })
      .exec((err, shoe) => {
        const titleInfo = {
          productName: shoe.productName,
          price: shoe.price,
          category: shoe.category
        };
        res.json(titleInfo);
      })
  } else {
    Shoe.findOne({
        sku
      })
      .exec((err, shoe) => {
        if (err) {
          console.log("Error finding SHOE");
        } else {
          res.json(shoe[info]);


        }
      });
    console.log(req.params.sku);
  }
});

app.listen(port, () => {
  console.log("Ken's service listening on port, ", port);
});