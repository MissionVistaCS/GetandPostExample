/**
 * Libraries
 **/
var http = require('http');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');

/**
 * Initializes libraries for use
 **/
var app = express();
var server = http.createServer(app);

//Middlewares for parsing HTTP body (used in POST requests)
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//All requests to files in '/public' are handled by this middleware
app.use(express.static(path.resolve(__dirname, 'public')));

//function (req, res) {}
app.post('/loginPOST', (req, res) => {
  //req.body is created in the body parser middleware. it contains HTTP body
  var username = req.body.username;
  var password = req.body.password;

  console.log('User attempted login POST: ' + username + ' => ' + password);
  
  if (username == 'admin' && password == 'passwd')
    res.send('Successful');
  else
    res.send('Failure');
});

app.get('/loginGET', (req, res) => {
  var username = req.query.username; //req.query contains GET parameters in the URL
  var password = req.query.password;

  console.log('User attempted login GET: ' + username + ' => ' + password);
  
  if (username == 'admin' && password == 'passwd')
    res.send('Successful');
  else
    res.send('Failure');
});

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", () => {
  var addr = server.address();
  console.log("Tutorial server listening at", addr.address + ":" + addr.port);
});