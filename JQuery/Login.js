$(document).ready(() => {
    $("#login_button").click(() => {
        $("#login_err_msg").show();

        var user = $("#username_login").val();
        var pass = $("#password_login").val();
        
        // Sets red border around textbox if it is empty
        if(user == '' && pass == '') {
            $('input[id="username_login"], input[id="password_login"]').css("border", "2px solid red");
            alert("Ole hyvä ja täytä kaikki kentät..!!");
        } else if(user == '') {
            $('input[id="username_login"]').css("border", "2px solid red");
            alert("Ole hyvä ja syötä tunnus..!!");
        } else if(pass == '') {
            $('input[id="password_login"]').css("border", "2px solid red");
            alert("Ole hyvä ja syötä salasana..!!");
        }
        
        // Checks if username and password match
        $.get("http://localhost:3001/users/"+user+"/"+pass, function(data, status, jqxhr) {
            if() {

            } else 
                $("#login_err_msg").show();
            
        });
    });
});