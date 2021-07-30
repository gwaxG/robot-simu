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
### Usage

This application contains two navigable windows `Server` and `Data` whose switch buttons are located at the top panel.  

#### Server

The `Server` window contains three sub-windows listed at the left side which are  `Configurations`, `Queue` and `Pool`.  
`Configurations` lists available configuration files which can be used to start an experiment through pressing the `Create` button which is located at the end of every configuration.  
To check possible configurations we address the user to [the description of the configuration file](https://github.com/gwaxG/robot_ws/tree/main/backend) and [example files](https://github.com/gwaxG/robot_ws/tree/main/examples).  
`Queue` lists active experiments which can be only deleted (`Delete` button).  
`Pool` lists waiting experiments which can be modified (`Update` button) or deleted (`Delete` button).

#### Data
The window `Data` helps to visualize experiment results.   
The first sub-window `Visualization` which can be selected on the left side shows a list of databases. Then, clicking the later, the user can fill a necessary to visualize metric like `reward`, `deviation` and `angular_m` in the text box and click on the desired experiment name. It will show scatters on the right side.  
On the left side the user can press `Config history` and select a database to visualize fields of every collection. Hence, it is useless and going to be deleted.  
