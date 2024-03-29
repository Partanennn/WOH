$(() => {
    // Gets housing types from database
    $.get("http://localhost:3001/housing_types")
    .done((data, status, jqXHR) => {
        data.forEach(x => {
            $("#housing_select").append(
                "<option value="+x.id+">" +
                x.housing +
                "</option"
            );
        });
    });
    
    // Gets user information from database
    $.get("http://localhost:3001/users/"+sessionStorage['login_username'])
    .done((data, status, jqXHR) => {
        $("#name_reg").val(data[0].name);
        $("#username_reg").val(data[0].username);
        $("#visitingaddress_reg").val(data[0].visiting_address);
        $("#billingaddress_reg").val(data[0].billing_address);
        $("#phonenumber_reg").val(data[0].phonenumber);
        $("#email_reg").val(data[0].email);
        $("#house_squares").val(data[0].house_squares);
        $("#building_ground").val(data[0].building_ground);
        $("#housing_select").val(data[0].housing);

    });
    
    // Updates data for user
    $("#update_button").click(() => {
        var nameOK;

        if( $("#name_reg").val() == "" ) {
            nameOK = false;
            $('input[id=name_reg]').css("border", "2px solid red");
        } else {
            nameOK = true;
            $('input[id=name_reg]').css("border", "");
        }

        if(nameOK) {
            $.ajax(
            {
                url: "http://localhost:3001/users/" + sessionStorage['login_username'],
                method: 'put',
                data: $("#update_form").serialize()
            }
            ).done( (data, textStatus, jqXHR) => {
                window.location.href='asetukset.html';
            }
            ).fail( (jqXHR, textStatus, errorThrown) => {
                console.log("Ajax put-call did fail, reason: " + errorThrown);
            });
        } else if(warnings == 0) {
            alert("Nimi kenttä ei voi olla tyhjä!!");
            warnings = 1;
        } else {
            alert("Nimi kenttä ei vieläkään voi olla tyhjä, täytä se!!");
        }
    });

































    var warnings = 0;
});