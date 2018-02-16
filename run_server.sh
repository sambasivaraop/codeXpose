# make log directories
mkdir /var/log/django
chmod -R 777 /var/log/django
mkdir /var/log/django/codexpose

#Activate virtual environment & start the server
source ./virtual/bin/activate
./virtual/bin/python backend/codexpose/manage.py runserver &
cd backend/codexpose
