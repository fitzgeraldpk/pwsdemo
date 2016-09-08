Simple application which saves a person's details [Name, Age and Address] and stores the information in a Redis database instance.

uses socket.io to update connected clients. All connections go to the same Redis database on the redis server.

Easy to deploy locally using Vagrant...Vagrant file which can be used to deploy a redis and 2 webservers to run this application locally. The 2 web servers allow you to see how the application gets updated using socket.io and redis
