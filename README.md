# Linux-Server-Control
Web interface for controlling linux servers

## Requirements
Must have node.js installed

## How-To
1. Clone repository
2. Configure radio buttons in public/index.html with your servers information
   1. Change value - it is written using a JSON format "server" is your servers IP, "MAC" is your servers mac address
   2. Set label to your servers address
   3. If adding more than 6 servers simply copy and paste an existing server and increment the ID of the circle div i.e server7
   4. If you do not want wake up on lan i.e remote booting set MAC to ""
3. Change port number on line 86 of server.js to specify the port of the Express server - leave unchanged if port 3000 is OK
4. run npm install to install dependencies
5. run npm start to start the server
6. In your browser go to localhost:3000 - replace 3000 with the port specified in step 3 if you changed it
7. Select your server from the list
8. Enter in username, password and sudo password to restart or shutdown your server
9. Simply select a server and hit boot to boot a server - note this uses wake up on lan and thus the linux servers must be running on the same network and the webserver - the web server must also be configured for wake up on lan

## About
This app uses an express server as its rest API.

The server takes post requests for rebooting, shutting down, starting and pinging a linux server.

For the frontend this app uses an HTML page with bootstrap for styling and JQUERY for logic.

JQUERY is used to make API calls to the backend.

## Rebooting and Shutting Down
These actions are performed using an SSH connection.

Once an SSH connection is established the command echo *sudo password* | sudo -S reboot/shutdown now - sudo -S reads the password from stdin which is the echo in our case

Booting is performed using a wake from lan library that takes the mac adress, ip address and port number to send a wake from lan packet.

Booting comes with the restriction that the server needs to be configured for wake from lan and on the same lan as the web server.

## Status
Under each server is a green or red circle displaying the current status of the server. This symbol is updated when the page is loaded and when any button is pressed.
