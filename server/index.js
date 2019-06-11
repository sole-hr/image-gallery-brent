const dotenv = require("dotenv").config();
console.log("ENV VARIABLES ", process.env.PORT);
const express = require("express");
const cors = require('cors');
const app = express();
const db = require("../database/index.js");
const port = process.env.PORT || 3001;
const bodyParser = require("body-parser");

app.use(cors());
app.use(express.static(__dirname + "/../client/dist"));


//gets one record from database
app.get("/api/:info/:sku", (req, res) => {
  let skuId = Number(req.params.sku);
  let infoId = req.params.info;
  console.log(infoId)
  db.getOneShoe(skuId, (error, response) => {
    if (error) {
      console.log('error getting shoes from db', error);
      res.end();
    } else {
      res.json(response.rows);
    }
  });
});

//creates a record in the database
app.post('/api/:info/:sku', (req, res) => {
  let skuId = req.params.sku;
  let infoId = req.params.info;
 
});

//updates a record in the database
app.put('/api/:info/:sku', (req, res) => {
  let skuId = req.params.sku;
  let infoId = req.params.info;

});

//deletes a record from the database
app.delete('/api/:info/:sku', (req, res) => {
  let skuId = req.params.sku;
  let infoId = req.params.info;
 
});

app.listen(port, () => {
  console.log("Brent's service listening on port, ", port);
});







//KENS GET REQUEST//
// app.get("/api/:info/:sku", (req, res) => {
//   const sku = req.params.sku;
//   const info = req.params.info;
//   Shoe.findOne({
//       sku
//     })
//     .exec((err, shoe) => {
//       let responseData = {};
//       if (info === "title") {
//         responseData = {
//           productName: shoe.productName,
//           price: shoe.price,
//           category: shoe.category
//         };
//       } else {
//         responseData = shoe[info];
//       }
//       res.json(responseData);
//     })
// });    