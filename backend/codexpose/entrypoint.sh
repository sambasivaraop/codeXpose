#!/bin/sh

sleep 120
python manage.py makemigrations interview
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver 0.0.0.0:8000
