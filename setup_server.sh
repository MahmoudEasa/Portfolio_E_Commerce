#!/usr/bin/env bash
# setup server

apt-get -y update
apt-get -y upgrade

# Gunicorn Variables
GUNICORN_PATH=/etc/systemd/system/gunicorn.service
GUNICORN_LOCATION=$(which gunicorn)
GUNICORN_SERVICE="\
[Unit]
Description=Gunicorn instance to serve gunicorn
After=network.target

[Service]
User=ubuntu
Group=ubuntu
WorkingDirectory=/home/ubuntu/Portfolio_E_Commerce
ExecStart=$GUNICORN_LOCATION --bind 0.0.0.0:5001 \
--workers 3 \
--error-logfile /tmp/ecommerce-error.log \
--access-logfile /tmp/ecommerce-access.log \
api.v1.app:app
Restart=always

[Install]
WantedBy=multi-user.target
"

# Setup MySQL
# cat Portfolio_E_Commerce/setup_mysql_dev.sql | mysql -hlocalhost -uroot

# Install Gunicorn
apt-get -y install gunicorn
touch $GUNICORN_PATH
echo -e "$GUNICORN_SERVICE" > $GUNICORN_PATH

apt-get -y install mysql-client
apt-get -y install mysql-server
apt-get -y install python3-pip
