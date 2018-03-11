# Dockerfile
FROM python:3.6

ENV PYTHONUNBUFFERED 1

# create work dir
RUN mkdir /src
WORKDIR /src
COPY . /src

# install python dependencies
RUN pip install -r backend/codexpose/requirements.txt

# create directory and required file for django logging
RUN mkdir -p /var/log/django/codexpose/
RUN touch /var/log/django/codexpose/codexpose.log
