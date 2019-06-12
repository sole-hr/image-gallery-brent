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


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//gets one record from database
app.get("/api/:info/:sku", (req, res) => {
  let skuId = Number(req.params.sku);
  let infoId = req.params.info;
  db.findRecord({sku: skuId}, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    }
    if (infoId === 'title') {
     responseData = {
        productName: data.productName,
          price: data.price,
          category: data.category
      };
    } else {
      responseData = data[infoId];
    }
      res.json(responseData);
      res.end();
  });
});

//creates a record in the database
app.post('/api/:info', (req, res) => {
  console.log(req.body);
  db.findHighestSku({}, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    } else {
      
      let newSku = data.sku + 1;
      req.body['sku'] = newSku;
      db.insertRecord(req.body, (err, info) => {
        if (err) {
          console.log(err);
          res.end();
        }
        // console.log(info);
        res.send(info);
      })
    }
  })
});

//updates a record in the database
app.put('/api/:info/', (req, res) => {
  let skuId = req.params.sku;
  let infoId = req.params.info;
  console.log(req.body);
  db.updateRecord(skuId, req.body, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    }
    res.send(data);
  });
});

//deletes a record from the database
app.delete('/api/:info/:sku', (req, res) => {
  let skuId = req.params.sku;
  let infoId = req.params.info;
  db.deleteRecord(skuId, (err, data) => {
    if (err) {
      console.log(err);
    }
    res.send(data);
  });
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