var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var app = express();

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};



function myDummyLogger( options ){
    options = options ? options : {};

    return function myInnerDummyLogger(req, res, next)
    {
        console.log("LOGGING:"+req.method +":"+ req.url+":"+req.body.name);
        next();
    }
}

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/html'));


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(myDummyLogger());
app.use(express.static(path.join(__dirname, 'public')));
app.use(allowCrossDomain);


app.get("/", function(req, res){
    res.sendFile("/html/index.html",  {root: __dirname + '/public/'});
});

app.use('/notes', require('./routes/note.js'));


// error handler
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send('No token / Invalid token provided');
    }
    else
    {
        next(err);
    }
});


const hostname = '127.0.0.1';
const port = 3003;
app.listen(port, hostname, () => {  console.log(`Server running at http://${hostname}:${port}/`); });
