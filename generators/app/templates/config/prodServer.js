var path = require('path');
var express = require('express');
var cors = require('cors');
var http = require('http');
var app = express();

app.use(cors());

app.use('/dist', express.static(path.join(__dirname,'/dist')));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

http.createServer(app).listen(3000,function(){
	console.log('server success');
});
