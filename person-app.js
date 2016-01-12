var express = require('express'),
    http = require('http'),
    person = require('./person.js');
    var bodyParser = require('body-parser');
var app = express();
// parse request bodies (req.body)
app.use(bodyParser.json());
app.post('/person.save', person.newPerson);
app.get('/person/:id', person.getPerson);
app.delete('/person/:id', person.deletePerson);
app.get('/people/:start/:finish',person.getPeople,person.sendPeople);
app.use(handleErr);
function handleErr(err, req, res, next) {
	console.log(err);
    res.status(503).send({
        status: 'Error',
        error: err.message
    });
}
http.createServer(app).listen(process.env.PORT || 3000, function() {
  console.log('Listening on port ' + (process.env.PORT || 3000));
});