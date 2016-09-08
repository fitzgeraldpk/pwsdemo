apt-get update

cd;
echo "y" | sudo apt-get install git
mkdir github;
cd github
git clone https://github.com/fitzgeraldpk/pwsdemo.git

cd;
apt-get install -y apache2
#if ! [ -L /var/www ]; then
#  rm -rf /var/www
#  ln -fs /vagrant /var/www
#fi


sudo service apache2 start

# install python
cd;
apt-get install python-dev python-pip -q -y

cd;
curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo apt-get install -y build-essential


sudo su -
cp -R ~/github/pwsdemo/static /var/www/html/personapp

#set npm proxy if needed
#npm config set proxy http://<proxy>
#npm config set https-proxy http://<proxy>
cd ~/github/pwsdemo
npm install
npm start
