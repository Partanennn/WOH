$(() => {
    $("#reg_button").click(() => {
        var name = $("#name_reg").val();
        var username = $("#username_reg").val();
        var pass = $("#password_reg").val();
        var pass2 = $("#password2_reg").val();
        var address = $("#address_reg").val();
        var role = $("#reg_select").val();
        // Variables to check if textbox is not empty
        var nameOK, usernameOK, passOK, pass2OK, addressOK;

        
        if(name == "") {
            $('input[id="name_reg"]').css("border", "2px solid red");
            nameOK = false;
        } else nameOK = true;
        if(username == "") {
            $('input[id="username_reg"]').css("border", "2px solid red");
            usernameOK = false;
        } else usernameOK = true;
        if(pass == "") {
            $('input[id="password_reg"]').css("border", "2px solid red");
            passOK = false;
        } else passOK = true;
        if(pass2 == "") {
            $('input[id="password2_reg"]').css("border", "2px solid red");
            pass2OK = false;
        } else pass2OK = true;
        if(address == "") {
            $('input[id="address_reg"]').css("border", "2px solid red");
            addressOK = false;
        } else addressOK = true;
        
        if(passOK && pass2OK && pass == pass2) {
            passOK = true;
        } else {
            passOK = false;
            alert("Salasanat eivät täsmää!");
        }


        var addons = $("#register_form").serialize();
        
        if(nameOK == true && usernameOK == true && passOK == true && addressOK == true) {
            $.post(
                "http://localhost:3001/create_user", 
                addons
            ).done ( function(data, status, jqxhr) {
                //$('input[id="name_reg"], input[id="username_reg"], input[id="password_reg"], input[id="password2_reg"], input[id="address_reg"]').css("border", "none");
                alert("Rekisteröinti onnistui!");
            }).fail( (jqxhr, status, error) => {
                console.log("status= "+status+", error: "+error);
            });
        } else if(passOK){
            alert("Ole hyvä ja täytä kaikki kentät!");
        }
    });
});