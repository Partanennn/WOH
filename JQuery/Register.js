$(() => {
    // Checks if user is logged in then he will be redirected to etusivu.html
    if(sessionStorage['logged'] == "true") {
        window.location.href="etusivu.html";
    }

    $("#reg_button").click(() => {
        var name = $("#name_reg").val();
        var username = $("#username_reg").val();
        var pass = $("#password_reg").val();
        var pass2 = $("#password2_reg").val();
        var address = $("#visitingaddress_reg").val();
        var role = $("#reg_select").val();
        // Variables to check if textbox is not empty
        var nameOK, usernameOK, passOK, pass2OK;

        // These if elses are handling textboxes and their borders
        if(name == "") {
            $('input[id="name_reg"]').css("border", "2px solid red");
            nameOK = false;
        } else {
            nameOK = true;
            $('input[id="name_reg"]').css("border", "none");
        }

        if(username == "") {
            $('input[id="username_reg"]').css("border", "2px solid red");
            usernameOK = false;
        } else {
            usernameOK = true
            $('input[id="username_reg"]').css("border", "none");
        } 
        
        if(pass == "") {
            $('input[id="password_reg"]').css("border", "2px solid red");
            passOK = false;
        } else {
            passOK = true;
            $('input[id="password_reg"]').css("border", "none");
        }

        if(pass2 == "") {
            $('input[id="password2_reg"]').css("border", "2px solid red");
            pass2OK = false;
        } else {
            pass2OK = true;
            $('input[id="password2_reg"]').css("border", "none");
        }

        // This checks if first password and second password textboxes have same value and if not, then it doesnt let register new user
        if(passOK && pass2OK && pass == pass2) {
            passOK = true;
        } else {
            passOK = false;
            alert("Salasanat eivät täsmää!");
        }


        if(nameOK == true && usernameOK == true && passOK == true) {
            $('input[id="visitingaddress_reg"], input[id="password2_reg"], input[id="password_reg"], input[id="username_reg"], input[id="name_reg"]').css("border", "none");
            
            // This $.get tries to find username what user did put in textbox, 
            //if response is undefined(=username doesn't exists) then create new user
            $.get("http://localhost:3001/users/"+username
            ).done((data, status, jq) => {
                // Checks if response is empty, if yes then creates new user
                if(data[0] == undefined) {
                    createUser();
                    alert("Rekisteröinti onnistui!");
                } else {
                    alert("Tunnus on jo varattu, kokeile uudestaan");
                }
            });

        } else if(passOK){
            alert("Ole hyvä ja täytä kaikki kentät!");
        }
    });

    function createUser() {
        var addons = $("#register_form").serialize();

        $.post(
            "http://localhost:3001/create_user", 
            addons
        ).done ( (data, status, jqxhr) => {

        }).fail( (jqxhr, status, error) => {
            console.log("status= "+status+", error: "+error);
        });
    }
});