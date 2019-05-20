// const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const shoeData = require("../shoedata/shoedata.json");
const database = 'fike';

mongoose.connect(`mongodb+srv://image-gallery-root:${process.env.DB_PW}@image-gallery-db-d2iku.mongodb.net/${database}?retryWrites=true`, {
  useNewUrlParser: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("CONNECTED");
});

let shoeSchema = mongoose.Schema({
  productName: String,
  category: String,
  sku: String,
  brand: String,
  price: Number,
  description: String,
  colors: [String],
  sizes: [Number],
  images: [String],
  reviews: [{
    user: String,
    date: String,
    stars: Number,
    title: String,
    description: String
  }]
});

const Shoe = mongoose.model("Shoe", shoeSchema);

const dbSave = data => {
  Shoe.insertMany(data, (err, response) => {
    if (err) {
      console.log("insertion error: ", err);
    } else {
      Shoe.update(data, {
        upsert: true
      });
      console.log('SEEDED DB');
    }
  });
};


module.exports.Shoe = Shoe;