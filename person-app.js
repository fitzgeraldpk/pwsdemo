var express = require('express'),
    http = require('http'),
    person = require('./person.js');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
//allow corss origin requests
app.use(cors());
// parse request bodies (req.body)
app.use(bodyParser.json());
app.post('/person', setSocket,person.newPerson);
app.get('/person/:id', person.getPerson);
app.delete('/person/:id', person.deletePerson);
app.get('/people/:start/:finish',person.getPeople,person.sendPeople);
app.use(handleErr);
// Add headers
app.use(function (req, res, next) {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');

    // Pass to next layer of middleware
    next();
});
function handleErr(err, req, res, next) {
	console.log(err);
    res.status(503).send({
        status: 'Error',
        error: err.message
    });
}
var server=http.createServer(app).listen(process.env.PORT || 3000, function() {
  console.log('Listening on port ' + (process.env.PORT || 3000));
});

var io = require('socket.io')(server);
    var redis = require('socket.io-redis');
    io.adapter(redis({ host: '192.168.56.103', port: 6379 }));

        io.sockets.on('connection', function(socket) {
        socket.on('message', function(data) {
            console.log('emit message');
        socket.broadcast.emit('message', data);
    });
    });

function setSocket(req,res,next){

    req.socket=socket;
    next();
}