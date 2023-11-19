#!/usr/bin/env bash

echo "use ecommerce_db; show tables;" | sudo mysql
echo "use ecommerce_db; DESCRIBE users;" | sudo mysql
echo "use ecommerce_db; select * from users;" | sudo mysql
