#!/usr/bin/env bash
# setup server


sudo apt-get -y update
sudo apt-get -y upgrade


# Variables
# Nginx Variables
NGINX_SITE_FILE=/etc/nginx/sites-available/default
NGINX_CONF_FILE=/etc/nginx/nginx.conf
ERROR_PAGE='\n\n\terror_page 404 /404.html;\n\tlocation = /404.html {\n\t\tinternal;\n\t}\n'
REDIRECT='\n\t\treturn 301 https://portfolio-e-commerce-seven.vercel.app;\n'
ADD_HEADER='\n\n\tadd_header X-Served-By \$hostname;\n'
API="\
	location /api/v1/ {
                proxy_pass http://127.0.0.1:5001/api/v1/;
                proxy_redirect off;
        }
"
CHECK_ERR_PAGE=$(cat "$NGINX_SITE_FILE" | grep 'error_page 404')
CHECK_REDIR=$(cat "$NGINX_SITE_FILE" | grep 'return 301 https://portfolio-e-commerce-seven.vercel.app')
CHECK_X_SERVER_BY=$(cat "$NGINX_CONF_FILE" | grep 'add_header X-Served-By')
CHECK_API=$(cat "$API" | grep 'location /api/v1/ {')

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


# Configures a new Ubuntu machine
sudo apt-get -y install nginx
echo "Hello World!" | sudo tee /var/www/html/index.nginx-debian.html
if [ -z "$CHECK_REDIR" ]; then
        sudo sed -i "s@^\tlocation / {@&$REDIRECT@" $NGINX_SITE_FILE
fi

if [ -z "$CHECK_ERR_PAGE" ]; then
        sudo sed -i "s@^\tserver_name _;@&$ERROR_PAGE@" $NGINX_SITE_FILE
fi

if [ -z "$CHECK_X_SERVER_BY" ]; then
        sudo sed -i "s@^http {@&$ADD_HEADER@" $NGINX_CONF_FILE
fi
if [ -z "$CHECK_API" ]; then
        sudo sed -i "s@^\tserver_name _;@&$API@" $NGINX_SITE_FILE
fi

sudo service nginx restart


# Setup MySQL
# cat Portfolio_E_Commerce/setup_mysql_dev.sql | sudo mysql -hlocalhost -uroot


# install the ufw firewall and setup a few rules
sudo apt-get -y install ufw
sudo ufw enable
sudo ufw default deny
sudo ufw allow 'Nginx HTTP'
sudo ufw allow ssh
sudo ufw allow http
sudo ufw allow https
sudo ufw allow mysql
sudo ufw reload

# Install Gunicorn
sudo apt-get -y install gunicorn
sudo touch $GUNICORN_PATH
sudo echo -e "$GUNICORN_SERVICE" > $GUNICORN_PATH


# Add aliases
ALIASES="\

alias gs='git status'
alias ga='git add .'
alias gc='git commit -am'
alias gp='git push'
alias vag='vagrant ssh'
alias vagup='vagrant up'
"
FIND=$(cat ~/.bashrc | grep "alias gs=")
if [ -z "$FIND" ]; then
	echo -e "$ALIASES" | sudo tee -a ~/.bashrc >/dev/null
	source ~/.bashrc
fi


sudo apt-get -y install mysql-client
sudo apt-get -y install mysql-server
sudo apt-get -y install python3-pip
