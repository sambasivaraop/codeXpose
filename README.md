# codeXpose
[![Build Status](https://travis-ci.org/inovizz/codeXpose.svg?branch=master)](https://travis-ci.org/inovizz/codeXpose)</br>
An open source one-stop solution for conducting technical interviews.

# Getting Started
These instructions will get you a copy of the project up and running on your local machine
for development and testing purposes.

# Built With
Django - The web framework<br />
Python - The back-end language<br />
Git - Version control system

# Installation
Follow the below steps to get a developement environment running.

First, Install git and ansible.

`sudo apt-add-repository ppa:ansible/ansible`

`sudo apt-get update`

`sudo apt-get install ansible`

`sudo apt-get install git`

Clone this repository & change into code directory.<br />

`git clone https://github.com/inovizz/codeXpose.git`

`cd codeXpose`

Execute the ansible playbook.

`ansible-playbook deploy.yml -K`

Execute the following script.

`. run_server.sh`

After following the above steps, your server is running & default user is **admin@xyz.com**

`http://127.0.0.1:8000/`

# Contributing
Please see [contribution](CONTRIBUTING.md).
