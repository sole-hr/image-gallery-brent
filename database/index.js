const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/fike");
const shoeData = require('../../shoe-data-generator/shoeData.json');
const db = mongoose.connection;
const fs = require("fs");

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Successfully connected to Fike DB");
});

let shoeSchema = mongoose.Schema({
  productName: String,
  category: String,
  sku: String,
  brand: String,
  price: Number,
  images: [String],
  reviews: [
    {
      user: String,
      date: String,
      stars: Number,
      title: String,
      description: String
    }
  ]
});

let Shoe = mongoose.model("Shoe", shoeSchema);

let save = data => {
  Shoe.insertMany(data, err => {
    if (err) {
      console.log("insertion error: ", err);
    } else {
      Shoe.update(data, { upsert: true });
    }
  });
};

// save(shoeData);
