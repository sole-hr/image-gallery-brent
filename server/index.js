const express = require("express");
const app = express();
const { Shoe } = require("../database/index.js");
const bodyParser = require("body-parser");
const port = 3001;

app.use(express.static(__dirname + "/../client/dist"));

app.get("/api/:info/:sku", (req, res) => {
  const sku = req.params.sku;
  const info = req.params.info;
  console.log(description);
  Shoe.findOne({ sku })
    .exec((err, shoe) => {
      res.json(shoe[info]);
    })
    .catch(err => {
      console.log("there was an error finding the item");
    });
  console.log(req.params.sku);
});

app.listen(port, () => {
  console.log("Ken's service listening on port, ", port);
});
