var express = require('express'),
    http = require('http'),
    person = require('./person.js');
    var bodyParser = require('body-parser');

var app = express();


// parse request bodies (req.body)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/person.save', function(req, res, next) {	
 	person.newPerson(req,res,next);
 	res.send('new person added');
  });

app.get('/person', function(req,res,next){
	console.log(req.query);
	person.getPerson(req,res,next);
});



http.createServer(app).listen(process.env.PORT || 3000, function() {
  console.log('Listening on port ' + (process.env.PORT || 3000));
});