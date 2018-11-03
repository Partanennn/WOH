$(() => {
    $("#reg_button").click(() => {
        var name = $("#name_reg").val();
        var username = $("#username_reg").val();
        var pass = $("#password_reg").val();
        var pass2 = $("#password2_reg").val();
        var address = $("#address_reg").val();
        var city = $("#city_reg").val();
        var role = $("#reg_select").val();
        // Variables to check if textbox is not empty
        var nameOK, usernameOK, passOK, pass2OK, addressOK, cityOK;

        
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
        if(city == "") {
            $('input[id="city_reg"]').css("border", "2px solid red");
            cityOK = false;
        } else {
            $('input[id="city_reg"]').css("border", "none");            
            cityOK = true;
        }
        

        var addons = $("#register_form").serialize();
        
        if(nameOK == true && usernameOK == true && passOK == true && pass2OK == true && addressOK == true && cityOK == true) {
            $.post(
                "http://localhost:3001/create_user", addons
            ).done ((data, status, jqxhr) => {
                console.log("Data: "+data+"\n status: "+status+"\n jqxhr: "+jqxhr);
                $('input[id="name_reg"], ').css("border", "none");
                alert("Rekisteröinti onnistui!");
            }).fail((jqxhr, status, error) => {
                console.log("status= "+status+", error: "+error);
            });
        } else {
            alert("Ole hyvä ja täytä kaikki kentät!");
        }
    });
});