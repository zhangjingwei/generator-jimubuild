var path = require('path')
var express = require('express')
var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var config = require('./webpack.config.dev')
var compiler = webpack(config)
var cors = require('cors');

var app = new (require('express'))();
var port = 3000;

// var http = require('http');
// var os = require('os');
//
// function getLocalIps(flagIpv6) {
//     var ifaces = os.networkInterfaces();
//     var ips = [];
//     var func = function(details) {
//         if (!flagIpv6 && details.family === 'IPv6') {
//             return;
//         }
//         ips.push(details.address);
//     };
//     for (var dev in ifaces) {
//         ifaces[dev].forEach(func);
//     }
//     return ips;
// };

app.use(cors());
//console.log('本机ip地址(不包括Ipv6):', getLocalIps());

app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

app.get('*', function(req, res) {
  res.sendFile(__dirname + '/src/index.html');
});

//原来那种方法不能以Ip地址访问，现在改为这种
// http.createServer(app).listen(3000,function(){
// 	console.log('Listening at http://'+getLocalIps()[1]+':3000');
// });

app.listen(3000, function(err) {
  if (err) {
    console.log(err);
    return;
  }
  console.info("🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
});
