//loading module from nodejs
var express = require('express');
var http        = require('http');
var nodemailer  = require('nodemailer');                   // Gửi mail
var MemoryStore = require('connect').session.MemoryStore;  //Lưu session ở Memory
var dbPath      = 'mongodb://localhost/nodebackbone';   // MongoDB
var fs          = require('fs');           // Xử lý file
var events      = require('events');      // Dùng event emitter

var app         = express();
// Create an http server
app.server = http.createServer(app);
//Listening socket.io
var io = require('socket.io').listen(app.server);

//  Using EventEmitter
var eventDispatcher = new events.EventEmitter();
//Adds a listener to the end of the listeners array for the specified event
app.addEventListener = function (eventName, callback) {
    console.log('on: ' + eventName);
    eventDispatcher.on(eventName, callback);
};
//Remove a listener from the listener array for the specified event. Caution: changes array indices in the listener array behind the listener.
app.removeEventListener = function (eventName, callback) {
    console.log('remove:'+eventName);
    eventDispatcher.removeListener( eventName, callback );
};
//Execute each of the listeners in order with the supplied arguments.
app.triggerEvent = function (eventName, eventOptions) {
    console.log('emit:'+eventName);
    eventDispatcher.emit( eventName, eventOptions );
};

// Create a session store to share between methods
app.sessionStore = new MemoryStore();

// Import the data layer
var mongoose = require('mongoose');
var config = {
    mail: require('./config/config')
};

// Import the models
var models = {
    Account: require('./business/authentication/Account')(app, config, mongoose, nodemailer)
};

// Configuration Express app
app.configure(function(){
    app.sessionSecret = 'SecretKey';
    app.set('port', process.env.PORT || 8080);
    app.use('/public', express.static(__dirname + '/public'));
    app.use('/json', express.static(__dirname + '/json'));

    //app.set('view engine', 'jade');
    app.use(express.static(__dirname + '/public'));
    app.use(express.limit('1mb'));
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.session({
        secret: app.sessionSecret,
        key: 'express.sid',
        store: app.sessionStore
    }));

    // Connect MongoDB
    mongoose.connect(dbPath, function onMongooseError(err) {
        if (err) throw err;
    });
});


app.configure('development', function () {
    app.use(express.errorHandler({dumpExceptions:true, showStack:true }));
});
app.configure('production', function () {
    app.use(express.errorHandler());
});
app.set('view options', {
    layout:false
});


// Import the routes : process all routes here
fs.readdirSync('routes').forEach(function(file) {
    if ( file[0] == '.' ) return;
    var routeName = file.substr(0, file.indexOf('.'));
    require('./routes/' + routeName)(app, models ,__dirname);
});


//app.get('/', function (req, res) {
//    res.sendfile(__dirname + '/index.html');
//});

// Tìm 1 contacts --> nhận thông điệp post từ web browser
app.post('/contacts/find', function(req, res) {
    var searchStr = req.param('searchStr', null);
    if ( null == searchStr ) {
        res.send(400);
        return;
    }

    models.Account.findByString(searchStr, function onSearchDone(err,accounts) {
        if (err || accounts.length == 0) {
            res.send(404);
        } else {
            res.send(accounts);
        }
    });
});


app.server.listen(8080);
console.log('Listening on port 8080');
