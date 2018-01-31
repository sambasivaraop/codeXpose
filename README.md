# CodeXpose
[![Build Status](https://travis-ci.org/inovizz/codeXpose.svg?branch=master)](https://travis-ci.org/inovizz/codeXpose)</br>
An open source one-stop solution for conducting technical interviews.

# Tech stack
Django - The web framework<br>
Python - The back-end language<br>
ReactJS - Frontend

# Getting Started
Follow the below steps to get the development environment up and running.

### Install Ansible
`$ sudo apt-add-repository ppa:ansible/ansible`<br>
`$ sudo apt-get update`<br>
`$ sudo apt-get install ansible`<br>

### Clone the repo
`$ git clone https://github.com/inovizz/codeXpose.git`<br>
`$ cd codeXpose`<br>

### Execute the following playbook and shell script
`$ ansible-playbook deploy.yml -K`<br>
`$ . run_server.sh`<br>

Now, the server should be running at - <br>
`http://127.0.0.1:8000/`

Note the default user is **admin@xyz.com**<br>

# Contributing
Please see [contribution](CONTRIBUTING.md).
