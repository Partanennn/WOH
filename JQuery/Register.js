$(() => {
    $("#reg_button").click(() => {
        var name = $("#name_reg").val();
        var username = $("#username_reg").val();
        var pass = $("#password_reg").val();
        var pass2 = $("#password2_reg").val();
        var address = $("#address_reg").val();
        var city = $("#city_reg").val();
        var role = $("#reg_select").val();  // 0=Yksityinen, 1=yritys
        var inputOK = 0;

        var addons = $("#register_form").serialize();
        
        if(name == "") {
            $('input[id="name_reg"]').css("border", "2px solid red");
            inputOK = false;
        } else inputOK = true;
        if(username == "") {
            $('input[id="name_reg"]').css("border", "2px solid red");
            inputOK = false;
        } else inputOK = true;
        if(name == "") {
            $('input[id="name_reg"]').css("border", "2px solid red");
            inputOK = false;
        } else inputOK = true;
        if(name == "") {
            $('input[id="name_reg"]').css("border", "2px solid red");
            inputOK = false;
        } else inputOK = true;
        if(name == "") {
            $('input[id="name_reg"]').css("border", "2px solid red");
            inputOK = false;
        } else inputOK = true;
        if(name == "") {
            $('input[id="name_reg"]').css("border", "2px solid red");
            inputOK = false;
        } else inputOK++;


        if(inputOK) {
            $.post(
                "http://localhost:3001/create_user", addons
            ).done ((data, status, jqxhr) => {
                console.log("Data: "+data+"\n status: "+status+"\n jqxhr: "+jqxhr);
                alert("Rekisteröinti onnistui!");
            }).fail((jqxhr, status, error) => {
                console.log("status= "+status+", error: "+error);
            });
        }
    });
});