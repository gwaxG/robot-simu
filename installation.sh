#!/usr/bin/bash

cd ~
curl -sL https://deb.nodesource.com/setup_10.x -o nodesource_setup.sh
sudo bash nodesource_setup.sh
sudo apt-get install nodejs -y

sudo npm install -g robot-simu

sudo npm install axios bootstrap  mathjs chart.js lodash react-bootstrap react-chartjs-2



