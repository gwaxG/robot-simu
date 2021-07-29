# Robot-simu

GUI of the robot_ws project. Before you start using this application, it is necessary to launch `robot_ws/backend/bin/master_app` from [robot_ws](github.com/gwaxG/robot_ws).

### Installation
Step-by-step guide:
```
cd ~
curl -sL https://deb.nodesource.com/setup_10.x -o nodesource_setup.sh
sudo bash nodesource_setup.sh
sudo apt-get install nodejs -y
git clone https://github.com/gwaxG/robot-simu.git
cd robot-simu
sudo npm install -g robot-simu
sudo npm install axios bootstrap mathjs chart.js lodash react-bootstrap react-chartjs-2
```

### Launching
```
cd ~/robot-simu
npm start
```
