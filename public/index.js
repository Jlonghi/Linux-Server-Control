//JQUERY functions 
//used for making api calls to the express server
//by: Joshua Longhi
$(document).ready(function(){
    function validate(){
        var username = $("#username").val();
        var password = $("#password").val();
        var sudo = $("#sudo").val();
        if(username.length == ''){
            $("#message").html("Username cannot be empty");
            $("#message").css("color", "red");
            return false;
        }
        else if(password.length == ''){
            $("#message").html("Password cannot be empty");
            $("#message").css("color", "red");
            return false;
        }
        else if(sudo.length == ''){
            $("#message").html("Sudo Password cannot be empty");
            $("#message").css("color", "red");
            return false;
        }
        return true;
    }    
    //function for reboot api call
    $("#reboot").click(function(){
        if(validate()){
            var radio = JSON.parse($("input[name='server']:checked").val());
            var server = radio.server;
            var username = $("#username").val();
            var password = $("#password").val();
            var sudo = $("#sudo").val();

            $.post("http://localhost:3000/reboot", {server: server, username: username, password: password, sudo: sudo}, function(res){
                console.log(res);
                if(res.success){
                    $("#message").html(res.message);
                    $("#message").css("color", "green");
                }
                else{
                    $("#message").html(res.error.message);
                    $("#message").css("color", "red");
                }
                status();
            })
        }
    })
    //function for shutdown api call
    $("#shutdown").click(function(){
        if(validate()){
            var radio = JSON.parse($("input[name='server']:checked").val());
            var server = radio.server;
            var username = $("#username").val();
            var password = $("#password").val();
            var sudo = $("#sudo").val();

    
            $.post("http://localhost:3000/shutdown", {server: server, username: username, password: password, sudo: sudo}, function(res){
                console.log(res);
                if(res.success){
                    $("#message").html(res.message);
                    $("#message").css("color", "green");
                }
                else{
                    $("#message").html(res.error.message);
                    $("#message").css("color", "red");
                }
                status();
            })
        }
    })
    $("#boot").click(function(){
        var radio = JSON.parse($("input[name='server']:checked").val());
        var server = radio.server;
        var mac = radio.mac
  
        $.post("http://localhost:3000/boot", {server: server, mac: mac}, function(res){
            console.log(res);
            if(res.success){
                $("#message").html(res.message);
                $("#message").css("color", "green");
            }
            else{
                $("#message").html(res.error.message);
                $("#message").css("color", "red");
            }
            status();
        })
    })
    //checks status of server, sets status circle to green or red depending on result
    function status(){
        var radio = JSON.parse($("input[name='server']:checked").val());
        var server = radio.server;
        var id = $("input[name='server']:checked").parent().children()[1].id;
        $.post("http://localhost:3000/status", {server: server}, function(res){
            if(res.success){
                $("#"+id).css("background-color", "green");
            }
            else{
                $("#"+id).css("background-color", "red");                
            }
        })
    }

    //sets the status of server circles when the page is loaded
    $("input[type=radio]").each(function(){
        var radio = JSON.parse($(this).attr('value'));
        var server = radio.server;
        var id = $(this).parent().children()[1].id;
        $.post("http://localhost:3000/status", {server: server}, function(res){
            if(res.success){
                $("#"+id).css("background-color", "green");
            }
            else{
                $("#"+id).css("background-color", "red");                
            }
        })
    })
})
    