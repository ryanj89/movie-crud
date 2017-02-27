const express = require('express');
const app = express();
const routes = require('./routes');
const bodyParser = require('body-parser');

const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', routes);
app.use(express.static('public'));

app.listen(PORT, function() {
  console.log(`Listening on port ${PORT}`);
});
