const newrelic = require('newrelic');
const express = require('express');
const app = express();
const path = require('path');
const createProxyMiddleware  = require('http-proxy-middleware');
const axios = require('axios');
const morgan = require('morgan');

//Config
const port = 3000;
const HOST = 'localhost';
const api = `http://${HOST}:3004`



app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('tiny'));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  next();
});

app.get('*/dp/:productId', (req, res) => {
  res.sendFile(path.join(__dirname, '/./public/index.html'));
});

app.get('/:productId', (req, res) => {
  res.sendFile(path.join(__dirname, '/./public/index.html'))
});

//Proxy Middleware
app.use('/reviews', createProxyMiddleware({
  target: api,
  changeOrigin:true
}));


app.listen(port, () => {
  console.log(`Server now listening at http://${HOST}:${port}`);
});
