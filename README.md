# react-app-express
The react-js training application.
This is an online store layout with 2 columns: categories and products, as well as the ability to create a user.
Including the administrator who can create, edit and delete categories and products.
Created to study the interaction of the application backend and the application frontend.

To work, you need an enabled mongodb server.
You can create a service to automatically turn on the mongodb server when the computer starts.

    sudo su
    
    nano /lib/systemd/system/mongodb.service
    
File contents
    
    [Unit]
    Description=MongoDB Database Service
    Wants=network.target
    After=network.target
    [Service]
    ExecStart=/usr/bin/mongod --config /etc/mongod.conf
    ExecReload=/bin/kill -HUP $MAINPID
    Restart=always
    User=mongodb
    Group=mongodb
    StandardOutput=syslog
    StandardError=syslog
    [Install]
    WantedBy=multi-user.target
    
Now to run mongodb:

    sudo systemctl start mongodb

To stop using the mongodb service:

    sudo systemctl stop mongodb

To enable mongodb at startup:

    sudo systemctl enable mongodb.service
    
After downloading the repository, make sure that you have 'npm' and 'yarn' installed and all modules are downloaded.
The application is divided into the main folder with the backend, which is launched by the command:

    npm start
    
Then open a new console tab and go to the 'client' folder. The frontend is started with the command:

    yarn start
    
After a couple of seconds, the tab should open with the application.
In the application, you will surely find junk or non-aesthetic code, since this is my first programming experience.
With the accumulation of knowledge and experience I will clean and simplify it.

To create an admin user there is a route located in 'client / public / createAdminFunc'.
It is necessary to send an object with email, password and secretAdmin in the request body.
secretAdmin can be replaced with something more reliable, like the whole project in general.
In the future I will try to do it.
