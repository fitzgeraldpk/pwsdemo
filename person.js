//require redis and start redis redis
//var vcap_services = process.env.VCAP_SERVICES;
//var rediscloud_service = JSON.parse(vcap_services)["rediscloud"][0]
//var credentials = rediscloud_service.credentials;

var _redis = require('redis');
var redis = _redis.createClient(6379,"192.168.56.103", {no_ready_check: true});
//redis.auth(credentials.password);

function addUpdate (req,res,personID){

      redis.hmset('person:'+personID,{'firstname':req.body.person.firstname,
                                            'lastname':req.body.person.lastname,
                                            'age':req.body.person.age,
                                            'addressline1':req.body.person.address.line1,
                                            'addressline2':req.body.person.address.line2,
                                            'addresstown':req.body.person.address.town,
                                            'addresscounty':req.body.person.address.county,
                                            'addressCountry':req.body.person.address.country},
                                            function(err,response){
                                                if(err) return next(err);
                                                if (response==='OK'){
                                                    res.send('New Person Added');
                                                }else{
                                                    res.status(503).send({
                                                        status: 'Error',
                                                        error: response
                                                    });    
                                                }
                                            }
                                                                                                );

} 
exports.newPerson= function(req,res,next){
    if(typeof req.body.person.id!='undefined'){
        console.log('update personID: ' +req.body.person.id)
        addUpdate(req,res,req.body.person.id);
    }else{
         redis.incr('personID', function(err, personID) {
            if(err) return next(err);
            if (typeof req.body.person!='undefined'){
                console.log('new personID: ' +personID)
                    addUpdate(req,res,personID);
              
            }else{
                console.log('no person object supplied');
                 res.status(503).send({
                                        status: 'Error',
                                        error: 'No person object'
                                      });    
            }  
      });
 }
}

exports.getPerson= function(req,res,next){
    redis.hgetall('person:'+req.params.id, function(err,obj){
            if(err) return next(err);
            res.send(obj);            
    });

}

exports.sendPeople=function(req,res,next){
    res.send(res.locals.people);
}

exports.getPeople= function(req,res,next){
    var id=req.params.start-1;
    var numberOfPeople=(req.params.finish-req.params.start)+1;
    var people={};
    people.data=[];
    for(var x=0;x<numberOfPeople;x++){
        id=id+1;
        (function(people,x,id){  
            redis.hgetall('person:'+id, function(err,obj){
                if(err){ return next(err);}
                 people.data[x]=obj; 
                    if (people.data[x]!=null){
                        people.data[x].id=id; 
                    }
                 if (x==numberOfPeople-1){   
                 res.locals.people=people;
                    next();
                }                  
            }); 
                    
        })(people,x,id)               
    } 
}

exports.deletePerson=function(req,res,next){
    var id=req.params.id;
    redis.del('person:'+id,function(err,reply){
            if(err){ 
                res.status(503).send({status: 'Error',
                                      error: 'Error deleting person'}); ;
            }
            if (reply===1){
                res.send('Person deleted');
            }else{
                res.status(404).send('Person does not exist');
            }
    })
}

redis.on('error', function (err) {
    console.log('error event - ' + redis.host + ':' + redis.port + ' - ' + err);
});

redis.on('connect', function() {
    console.log('connected to redis host: '+redis.host + ' port: '+redis.port);
});
