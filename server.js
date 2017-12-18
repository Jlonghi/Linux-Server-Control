//Express server used as the rest endpoint for Linux Server Control
//Recieves post requests for:
//booting a server
//rebooting a server
//starting a server
//pinging a server 
//by: Joshua Longhi

const express = require('express');
const app = express();
var bodyParser = require("body-parser");
var path = require('path');
//ssh library
var exec = require('ssh-exec');
//ping library
var ping = require('ping');
//wake up on lan library
var wol = require('node-wol');

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(express.static(path.join(__dirname +'/public')));

//reboot api call - uses login credentials and the sudo password to run the reboot command over ssh
app.post('/reboot', (req, res) => {
    exec('echo ' + req.body.sudo +' | sudo -S reboot',{
        user: req.body.username,
        host: req.body.server,
        password: req.body.password
    },(err, stdout, stderr)=>{
        if(err){
            res.send({success: false, error:{message: 'server may be offline or credentials invalid'}});
        }
        else{
            res.send({success: true, message: 'server is rebooting'});
        }
    })
})

//shutdown api call - uses login credentials and the sudo password to run the shutdown command over ssh
app.post('/shutdown', (req, res) => {
    exec('echo ' + req.body.sudo +' | sudo -S shutdown now',{
        user: req.body.username,
        host: req.body.server,
        password: req.body.password
    },(err, stdout, stderr)=>{
        if(err){
            res.send({success: false, error:{message: 'server may be offline or credentials invalid'}});
        }
        else{
            res.send({success: true, message: 'server is turning off'});
        }
    })
})

//boot api call - uses the mac address and port that wake up on lan is configured for
app.post('/boot', (req, res) => {
    var mac = req.body.mac;
    var port = req.body.port; 
    var server = req.body.server
    wol.wake(mac, {port: port, address: server}, function(error){
        if(error){
            res.send({success: false, error:{message: 'wake up on lan packet could not be sent, check MAC adress, ip and port'}});            
        }
        else{
            res.send({success: true, message: 'server is booting up'});            
        }
    })
})

//status api call - pings the server using the ip address to see if it is online or offline
app.post('/status', (req, res) =>{
    var host = req.body.server;
    ping.promise.probe(host).then(function (status){
        if(status.alive){
            res.send({success: true, message: 'server is live'});                
        }
        else{
            res.send({success: false, error:{message: 'server is offline'}});
        }
    })
})

//change port from 3000 if desired
app.listen(3000, () => console.log('Linux Server Control listening on port 3000!'))