cd;
wget http://download.redis.io/releases/redis-3.2.3.tar.gz
tar xzf redis-3.2.3.tar.gz
cd redis-3.2.3
make
cd ~/redis-3.2.3/src
#run in unprotected mode and accept connections - development only
./redis-server --protected-mode no --bind 0.0.0.0 &
