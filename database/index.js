const { Client } = require('pg')
const dotenv = require('dotenv').config();


const client = new Client({
  user: 'brent',
  password: process.env.DB_PW,
  //host: 'localhost',
  database: 'sdc',
  port: 5432
})


client.connect((err) => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
    console.log('connected')
  }
})

//INNER JOIN payment ON payment.customer_id = customer.customer_id;



const getOneShoe = (sku, callback) => {
  client.query(`SELECT * FROM shoes NATURAL JOIN colors NATURAL JOIN sizes where sku = ${sku}`, (err, data) => {
    if (err) {
      console.log(err);
      callback(err, null);
    } else {
      callback(null, data);
    }
  })
};

module.exports = {
  getOneShoe
}
// client.query('SELECT $1::text as message', ['Hello world!'], (err, res) => {
//   console.log(err ? err.stack : res.rows[0].message) // Hello World!
//   client.end()
// })
