// const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const shoeData = require("../shoedata/shoedata.json");
const database = 'fike';

// mongoose.connect(`mongodb+srv://image-gallery-root:${process.env.DB_PW}@image-gallery-db-d2iku.mongodb.net/${database}?retryWrites=true`, {
//   useNewUrlParser: true
// });

mongoose.connect(`mongodb://localhost:27017/sdc`, {useNewUrlParser: true}); //, {useNewUrlParser: true}

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("CONNECTED");
});

let shoeSchema = mongoose.Schema({
  productName: String,
  category: String,
  sku: Number,
  brand: String,
  price: Number,
  description: String,
  colors: [String],
  sizes: [Number],
  images: [String],
  // tags: { sku: [Number], index: false } 
  // reviews: [{
  //   user: String,
  //   date: String,
  //   stars: Number,
  //   title: String,
  //   description: String
  // }]
});

const Shoe = mongoose.model("Shoe", shoeSchema, 'shoes');




const findRecord = (object, callback) => {
  Shoe.findOne(object, (err, data) => {
    if (err) {
      console.log(err);
    }
    callback(null, data);
  }); 
};

const findHighestSku = (object, callback) => {
  Shoe.find(object, (err, data) => {
    if (err) {
      console.log(err);
    }
    callback(null, data);
  }).sort({sku : -1}).limit(1);
};



const insertRecord = (object, callback) => {
  Shoe.create(object, (err, data) => {
    if (err) {
      console.log(err);
    }
    callback(null, data);
  });
};

const updateRecord = (filter, doc, callback) => {
  Shoe.updateOne(filter, doc, (err, data) => {
    if (err) {
      console.log(err);
    }
    callback(null, data);
  });
};

const deleteRecord = (object, callback) => {
  Shoe.deleteOne(object, (err, res) => {
    if (err) {
      console.log(err);
    }
    callback(null, res);
  });
};

module.exports ={
  findRecord,
  insertRecord,
  updateRecord,
  deleteRecord,
  findHighestSku
}



