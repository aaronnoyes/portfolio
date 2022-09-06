const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('dist'))

app.use((req, res, next) => {
  console.log(req.url);
  next();
})

app.use((req, res) => {
  res.redirect('/');
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})
