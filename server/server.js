const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, '../public');
var app = express();

//express static middleware
//app.listen 3000 console log
app.use(express.static(publicPath));

app.listen(3000, () => {
  console.log('Server is up on PORT 3000');
});
