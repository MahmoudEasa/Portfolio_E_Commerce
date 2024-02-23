#!/usr/bin/env bash
# setup server

# apt-get -y update
# apt-get -y upgrade

# Gunicorn Variables
GUNICORN_PATH=/etc/systemd/system/gunicorn.service
GUNICORN_LOCATION=$(which gunicorn)
GUNICORN_SERVICE="\
[Unit]
Description=Gunicorn instance to serve gunicorn
After=network.target

[Service]
User=mahmoud_easa
Group=mahmoud_easa
WorkingDirectory=/home/mahmoud_easa/alx/Foundations/Portfolio_E_Commerce
ExecStart=$GUNICORN_LOCATION --bind 0.0.0.0:5001 \
--workers 3 \
--error-logfile /tmp/ecommerce-error.log \
--access-logfile /tmp/ecommerce-access.log \
api.v1.app:app
Restart=always

[Install]
WantedBy=multi-user.target
"

# Nohup Variables serve Next.js application
NOHUP_PATH=/etc/systemd/system/nohup.service
NOHUP_LOCATION=$(which nohup)
NOHUP_SERVICE="\
[Unit]
Description=Nohup instance to serve nohup
After=network.target

[Service]
User=mahmoud_easa
Group=mahmoud_easa
WorkingDirectory=/home/mahmoud_easa/alx/Foundations/Portfolio_E_Commerce/front-end
ExecStart=$NOHUP_LOCATION npm start
Restart=always

[Install]
WantedBy=multi-user.target
"

# Setup MySQL
# cat Portfolio_E_Commerce/setup_mysql_dev.sql | mysql -hlocalhost -uroot

# Install Gunicorn
# apt-get -y install gunicorn
touch $GUNICORN_PATH
echo -e "$GUNICORN_SERVICE" > $GUNICORN_PATH

sudo systemctl start gunicorn.service
sudo systemctl enable gunicorn.service

# Install Nohup
# apt-get -y install nohup
touch $NOHUP_PATH
echo -e "$NOHUP_SERVICE" > $NOHUP_PATH

sudo systemctl start nohup.service
sudo systemctl enable nohup.service


sudo systemctl daemon-reload
sudo systemctl restart gunicorn.service
sudo systemctl restart nohup.service

# apt-get -y install mysql-client
# apt-get -y install mysql-server
# apt-get -y install python3-pip
