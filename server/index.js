const dotenv = require("dotenv").config();
console.log("ENV VARIABLES ", process.env.PORT);
const express = require("express");
const app = express();
const {
  Shoe, dbRetrieve
} = require("../database/index.js");
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");

app.use(express.static(__dirname + "/../client/dist"));

app.get("/api/:info/:sku", (req, res) => {
  const sku = req.params.sku;
  const info = req.params.info;
  Shoe.findOne({
      sku
    })
    .exec((err, shoe) => {
      let responseData = {};
      if (info === "title") {
        responseData = {
          productName: shoe.productName,
          price: shoe.price,
          category: shoe.category
        };
      } else {
        responseData = shoe[info];
      }
      res.json(responseData);
    })
}); 

app.listen(port, () => {
  console.log("Ken's service listening on port, ", port);
});