/**
 * Created with JetBrains WebStorm.
 * User: CuongNv
 * Date: 1/30/13
 * Time: 12:41 AM
 * To change this template use File | Settings | File Templates.
 */
var express = require('express');
    fs = require('fs');
var app = express();

var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

app.configure(function () {
    app.use('/public', express.static(__dirname + '/public'));
    app.use('/json', express.static(__dirname + '/json'));
});

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});



app.listen(3000);
console.log('Listening on port 3000');