//require redis and start redis redis
//var _redis = require('redis');
//var redis = _redis.createClient();
//get the person key
//var key=req.body.person_id;
// parsing rediscloud credentials
var vcap_services = process.env.VCAP_SERVICES;
var rediscloud_service = JSON.parse(vcap_services)["rediscloud"][0]
var credentials = rediscloud_service.credentials;

var _redis = require('redis');
var redis = _redis.createClient(credentials.port, credentials.hostname, {no_ready_check: true});
client.auth(credentials.password);


module.exports.newPerson= function(req,res,next){
    console.log(req.body);
     redis.incr('personID', function(err, personID) {
    if(err) return next(err);
    var firstName=req.body.firstName;
    var lastName=req.body.lastName;
    var age=req.body.age;
    var addressLine1=req.body.address.line1;
    var addressLine2=req.body.address.line2;
    var addressTown=req.body.address.town;
    var addressCounty=req.body.address.county;
    var addressCountry=req.body.address.country;
    redis.hset('person:'+personID,'firstname',firstName);
    redis.hset('person:'+personID,'lastname',lastName); 
    redis.hset('person:'+personID,'age',age); 
    redis.hset('person:'+personID,'addressline1',addressLine1); 
    redis.hset('person:'+personID,'addressline2',addressLine2); 
    redis.hset('person:'+personID,'addresstown',addressTown); 
    redis.hset('person:'+personID,'addresscounty',addressCounty); 
    redis.hset('person:'+personID,'addressCountry',addressCountry); 
    next();
  });
    
     

}

module.exports.getPerson= function(req,res,next){

    var personID=req.query.id;
   // console.log('personID'+personID)
    redis.hgetall('person:'+personID, function(err,obj){
            if(err) return next(err);
           // console.log(obj)
           // res.locals.data=obj;
           obj.address=JSON.stringify(obj.address);
            res.send(obj);
            
    });

}

redis.on('error', function (err) {
    console.log('error event - ' + redis.host + ':' + redis.port + ' - ' + err);
});

redis.on('connect', function() {
    console.log('connected to redis host: '+redis.host + ' port: '+redis.port);
});


