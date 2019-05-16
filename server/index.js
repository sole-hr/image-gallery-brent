const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3001;

app.use(express.static(__dirname + "/../client/dist"));

app.listen(port, () => {
  console.log("Ken's service listening on port, ", port);
}); 