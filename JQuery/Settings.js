$(() => {
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
    
});