# -*- mode: ruby -*-
# vi: set ft=ruby :

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.

Vagrant.configure("2") do |config|

config.vm.define "redis", autostart: true do |redis|
    redis.vm.box = "ubuntu/trusty64"
    redis.vm.hostname = 'redis'
	redis.vm.provision "shell", path: "./bootstrap/redis.sh"

    redis.vm.network :private_network, ip: "192.168.56.103"
    redis.vm.network :forwarded_port, guest: 22, host: 10124, id: "ssh"


    redis.vm.provider :virtualbox do |v|
      v.customize ["modifyvm", :id, "--natdnshostresolver1", "on"]
      v.customize ["modifyvm", :id, "--memory", 512]
      v.customize ["modifyvm", :id, "--name", "redis"]
    end
  end
  
   config.vm.define "web01", primary: true do |web01|
    web01.vm.box = "ubuntu/trusty64"
    web01.vm.hostname = 'web01'
	web01.vm.provision "shell", path: "bootstrap.sh"

    web01.vm.network :private_network, ip: "192.168.56.101"
    web01.vm.network :forwarded_port, guest: 22, host: 10125, id: "ssh"
	

    web01.vm.provider :virtualbox do |v|
      v.customize ["modifyvm", :id, "--natdnshostresolver1", "on"]
      v.customize ["modifyvm", :id, "--memory", 512]
      v.customize ["modifyvm", :id, "--name", "web01"]
    end
	

  end
  
  config.vm.define "web02", autostart: true do |web02|
    web02.vm.box = "ubuntu/trusty64"
    web02.vm.hostname = 'web02'
	web02.vm.provision "shell", path: "bootstrap.sh"

    web02.vm.network :private_network, ip: "192.168.56.102"
    web02.vm.network :forwarded_port, guest: 22, host: 10123, id: "ssh"


    web02.vm.provider :virtualbox do |v|
      v.customize ["modifyvm", :id, "--natdnshostresolver1", "on"]
      v.customize ["modifyvm", :id, "--memory", 512]
      v.customize ["modifyvm", :id, "--name", "web02"]
    end

  end
  
   
  
  
  config.proxy.http ="<proxy>"
  config.proxy.https =="<proxy>"

  
end
