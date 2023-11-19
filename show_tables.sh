#!/usr/bin/env bash

echo "Show Tables:"
echo
echo "use ecommerce_db; show tables;" | sudo mysql
echo
echo
echo "DESCRIBE Users:"
echo
echo "use ecommerce_db; DESCRIBE users;" | sudo mysql
echo
echo
echo "Select * from users:"
echo
echo "use ecommerce_db; select * from users;" | sudo mysql
